---
title: Un evento publicado después del commit es un evento que puedes perder
date: 2026-10-21
summary: Escribir el evento en la misma transacción que el cambio que reporta, y dejar que un relevo lo publique después, cambia una pérdida silenciosa por un duplicado que los consumidores pueden ignorar.
tags: arquitectura, proceso
---

Haz commit de una fila, llama después a `producer.send`, y habrás hecho dos escrituras sin nada alrededor. Si el proceso muere entre las dos, la fila existe y el evento nunca existirá. No queda log, porque el proceso que lo habría escrito ya no está.

En Mi Carpeta Segura, nuestro operador de Carpeta Ciudadana ([post de arquitectura](/blog/carpeta-ciudadana-architecture)), ese evento es el aviso de que un diploma llegó a la carpeta de un ciudadano.

## Escribe el evento, envíalo después

El arreglo es sacar el envío de la petición. El evento va a una tabla outbox en la misma transacción que el hecho, así que existen las dos filas o ninguna, y un relevo envía a Kafka las pendientes.

Afiliación lo hace en una sola sentencia SQL cuyo insert en la outbox selecciona del `RETURNING` del update: no hay BEGIN que olvidar, y una segunda llamada sin fila no agrega evento.

El relevo no guarda nada. Pendiente es `publicado_en` nulo, leído de 50 en 50 y una vez por segundo si no hay nada, así que una caída a mitad del lote deja las mismas filas al siguiente proceso.

<figure>
<svg viewBox="0 0 640 154" role="img" aria-label="Las filas del hecho y de la outbox comparten una transacción; un relevo sin estado alimenta Kafka; los consumidores deduplican. Una ruta punteada muestra commit y luego envío.">
  <defs>
    <marker id="tx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="0" width="212" height="84" rx="10" class="dg-plate"/>
  <text x="12" y="14" class="dg-m">una transacción</text>
  <rect x="8" y="24" width="92" height="48" rx="6" class="dg-node"/>
  <text x="54" y="52" text-anchor="middle" class="dg-t">Hecho</text>
  <rect x="112" y="24" width="92" height="48" rx="6" class="dg-node-accent"/>
  <text x="158" y="52" text-anchor="middle" class="dg-t">Fila outbox</text>
  <path d="M206 48 H248" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="252" y="24" width="120" height="48" rx="8" class="dg-node"/>
  <text x="312" y="52" text-anchor="middle" class="dg-t">Relevo sin estado</text>
  <path d="M374 48 H408" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="412" y="24" width="76" height="48" rx="8" class="dg-node"/>
  <text x="450" y="52" text-anchor="middle" class="dg-t">Kafka</text>
  <path d="M490 48 H528" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="532" y="24" width="108" height="48" rx="8" class="dg-node"/>
  <text x="586" y="44" text-anchor="middle" class="dg-t">Consumidores</text>
  <text x="586" y="59" text-anchor="middle" class="dg-s">deduplican por id</text>
  <path d="M106 86 V126 H140" class="dg-flow-dashed" marker-end="url(#tx-head)"/>
  <rect x="144" y="102" width="204" height="48" rx="8" class="dg-node-warn"/>
  <text x="246" y="122" text-anchor="middle" class="dg-t">Commit y luego envío</text>
  <text x="246" y="137" text-anchor="middle" class="dg-s">una caída en medio pierde el evento</text>
  <path d="M350 126 H450 V76" class="dg-flow-dashed" marker-end="url(#tx-head)"/>
</svg>
<figcaption>El relevo es un ciclo dentro del servicio productor, sin cola en memoria. La ruta punteada es la que reemplaza la tabla.</figcaption>
</figure>

## La entrega es al menos una vez, así que los consumidores deduplican

Un lote se marca solo cuando todos los envíos salieron; si uno falla, el lote entero repite y las filas ya enviadas salen dos veces. Cada evento se codifica contra su esquema registrado antes de enviarse, y una prueba con un registro que rechaza afirma que no sale nada.

El id del evento se crea al insertar, así que cada reintento lleva el mismo `ce_id`, y cada consumidor se protege de la repetición: notificaciones busca antes el id (una prueba, mismo evento dos veces, un correo), auditoría tiene un índice único sobre él y el índice de carpeta sobrescribe por id de documento.

## Un hecho en otro servicio no entra en tu transacción

Cuando una entidad confirma un certificado, custodia, con su propia base, lo registra como vigente, así que interoperabilidad no tiene transacción que cubra las dos escrituras y solo puede hacer la suya segura de repetir.

Encola `documento.recibido` en cada confirmación, con una clave de deduplicación única hecha con el id del documento. Si un intento murió después de que custodia confirmó y antes de encolar, el reintento de la entidad cierra el hueco, y una prueba unitaria fija esa mitad. Es más débil: la reparación ocurre solo si alguien vuelve a llamar, y nada barre los certificados vigentes sin evento.

## Lo que comparó el registro de decisión

El ADR-0018 puntúa tres opciones en tolerancia a fallos, interoperabilidad y costo. Publicar tras el commit falla la primera, JSON sin esquema registrado la segunda. La outbox no falla ninguna y paga con una tabla y un relevo por productor. Que Kafka caído no pierde eventos lo afirma el diseño: ninguna prueba detiene el broker.

## La objeción: el polling es viejo y la ventana pequeña

Change data capture lee el log de la base sin ciclo, Kafka tiene transacciones y un hueco de milisegundos casi nunca se abre. Justo, dentro de un alcance: un prototipo con un nodo de Kafka, con Kafka gestionado como objetivo documentado (ADR-0015). El registro nunca pesó CDC ni las transacciones de Kafka, así que estas razones son mías: una transacción de Kafka no puede incluir una fila de Postgres, y CDC cambia el ciclo por un conector que operar.

El ciclo tiene un precio: los servicios con relevo o consumidor quedan encendidos con CPU siempre asignada, la partida mayor de la estimación en las notas de despliegue, unos 1,6 USD al día por siete más Keycloak, a precios de lista, sin medir.

No sé cada cuánto se abre la ventana y no voy a inventar un número. La forma de la pérdida decide: sin error, sin fila, un aviso que nunca llega. Una fila atascada en la outbox está a una consulta.

## La lista de verificación

Revisa todo servicio que publique:

- Inserta el evento en una tabla outbox, en la misma transacción que el cambio que reporta.
- Crea el id del evento en ese insert, nunca al enviar.
- Si el cambio ocurre en otro lado, encola en cada reintento con clave de deduplicación del objeto que cambió.
- No guardes nada en la memoria del relevo: pendiente es una fila sin marca de publicación.
- Valida cada payload contra un esquema registrado antes de que salga.
- Haz que cada consumidor sea seguro de ejecutar dos veces.

Un duplicado deja un id que ignorar. Un evento perdido no deja nada que buscar.

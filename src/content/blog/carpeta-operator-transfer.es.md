---
title: Cuando un ciudadano cambia de operador, borra al final
date: 2026-09-26
summary: Trasladar a un ciudadano y sus documentos entre dos operadores que no comparten base de datos se reduce al orden de cuatro pasos idempotentes, y el borrado es el único que no tiene vuelta atrás.
tags: arquitectura, proceso
---

Un ciudadano de la federación de Carpeta Ciudadana puede irse de su operador y llevarse todos sus documentos a otro. Nuestro operador, Mi Carpeta Segura, tenía que hacer los dos lados: recibir a un ciudadano que llega del operador de otro equipo y entregar a uno que se va. Los dos operadores no comparten base de datos, ni transacción, ni bus de mensajes. Lo único que tienen es el centralizador, GovCarpeta, que registra quién pertenece a quién, y un contrato que los equipos del curso acordaron entre ellos.

Sin transacción disponible, el orden de los pasos tiene que hacer el trabajo que haría una transacción. La regla que nos quedó es corta: lo que se puede deshacer va primero, y el borrado va de último.

## Cuatro pasos, todos repetibles

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Traslado de salida: congelar la carpeta, dar de baja en GovCarpeta, enviar transferCitizen con URL prefirmadas, esperar la confirmación y luego borrar tras una confirmación verificada o reafiliar ante un rechazo">
  <defs>
    <marker id="tr-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tr-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="72" y="33" text-anchor="middle" class="dg-t">1. Congelar</text>
  <text x="72" y="50" text-anchor="middle" class="dg-s">custodia: solo lectura</text>
  <path d="M147 37 H161" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="165" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="237" y="33" text-anchor="middle" class="dg-t">2. Dar de baja</text>
  <text x="237" y="50" text-anchor="middle" class="dg-s">escritura en GovCarpeta</text>
  <path d="M312 37 H326" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="330" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="402" y="33" text-anchor="middle" class="dg-t">3. transferCitizen</text>
  <text x="402" y="50" text-anchor="middle" class="dg-s">URL prefirmadas, 24 h</text>
  <path d="M477 37 H491" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="495" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="567" y="33" text-anchor="middle" class="dg-t">4. Esperar</text>
  <text x="567" y="50" text-anchor="middle" class="dg-s">transferCitizenConfirm</text>
  <path d="M567 66 V112" class="dg-flow" marker-end="url(#tr-head)"/>
  <path d="M567 88 H155 V112" class="dg-flow-accent" marker-end="url(#tr-head-a)"/>
  <rect x="0" y="118" width="310" height="86" rx="8" class="dg-node-accent"/>
  <text x="16" y="140" class="dg-t">req_status 1, verificado</text>
  <text x="16" y="158" class="dg-s">El enlace con HMAC coincide y GovCarpeta muestra</text>
  <text x="16" y="172" class="dg-s">al ciudadano en el operador nuevo.</text>
  <text x="16" y="190" class="dg-m">borrar documentos, luego cuenta</text>
  <rect x="330" y="118" width="310" height="86" rx="8" class="dg-node-warn"/>
  <text x="346" y="140" class="dg-t">req_status 0</text>
  <text x="346" y="158" class="dg-s">Afiliación vuelve a registrar al ciudadano</text>
  <text x="346" y="172" class="dg-s">y la custodia reabre la carpeta.</text>
  <text x="346" y="190" class="dg-m">no se borra nada</text>
</svg>
<figcaption>Todo lo que está arriba se puede repetir o revertir. La caja de la izquierda es la única que no, por eso queda al final y exige dos pruebas independientes.</figcaption>
</figure>

El estado de cada traslado vive en la tabla del servicio de interoperabilidad, no en memoria, así que un reinicio retoma justo donde quedó el proceso. Cada paso es idempotente: congelar una carpeta congelada no hace nada, y las URL prefirmadas se piden nuevas en cada intento y nunca se guardan. Duran 24 horas, frente a los 60 segundos de una descarga normal, porque el operador destino puede tardar en bajar cien archivos.

Congelar va antes de que salga cualquier cosa. Un ciudadano que sube un documento a mitad del traslado llegaría al operador nuevo sin él, y nadie se daría cuenta hasta que lo buscara.

## Una confirmación no basta

La versión obvia borra en cuanto el destino responde `req_status: 1`. No nos fiamos de eso solo, por una razón sencilla: el endpoint de confirmación es una URL pública y cualquiera le puede hacer POST.

Así que una confirmación tiene que pasar dos chequeos antes de que borremos un byte. Tiene que llegar por el enlace que le dimos a ese destino, que lleva el id del traslado y un HMAC que solo nosotros podemos generar. Y GovCarpeta ya tiene que mostrar al ciudadano en otro operador. Sin las dos, la respuesta es un 409 y la carpeta queda como está. El primer chequeo prueba quién habla. El segundo prueba que lo que dice pasó de verdad, en el único lugar en el que toda la federación está de acuerdo.

## Un rechazo debe dejar al ciudadano en algún lado

Nuestro propio documento de diseño decía que con `req_status: 0` conservábamos la carpeta y escalábamos a una persona. Leído al pie de la letra, eso deja al ciudadano sin operador, porque el paso 2 ya lo dio de baja. La única regla dura de la federación es un operador por ciudadano en todo momento, y un huérfano la rompe por el otro lado.

Lo cambiamos. Un rechazo vuelve a afiliar al ciudadano con nosotros y reabre la carpeta. Si eso falla cinco veces seguidas, el traslado pasa al estado `atencion` para que lo revise una persona, y la carpeta sigue en solo lectura. El escalamiento sobrevivió, pero como último recurso.

## Confía en GovCarpeta, no en una firma

El lado de entrada empezó estricto. La primera versión exigía una firma JWS del operador de origen, el SHA-256 y el tamaño de cada documento, y la dirección y el celular del ciudadano. Era seguro y nadie lo podía usar, porque ningún otro equipo mandaba nada de eso. Interoperar en una federación es aceptar el formato que la federación de verdad habla.

Así que aceptamos el formato del curso, `{ id, citizenName, citizenEmail, urlDocuments, confirmAPI }`, y sacamos la confianza del centralizador en lugar de una llave. Un traslado se acepta solo si GovCarpeta muestra al ciudadano sin operador, y eso solo puede ser cierto si el origen ya lo soltó. Nuestra custodia descarga cada archivo y calcula ella misma el tipo, el tamaño y el hash, en vez de creer lo que le dijeron.

La objeción justa es que cualquiera puede iniciar un traslado de cualquier ciudadano libre. Es cierto, y por eso el ciudadano no queda afiliado con nosotros hasta que abre un enlace de activación que llega a su correo institucional y elige su clave. Un atacante puede crear un traslado pendiente. No puede terminarlo.

## Lo que sigue abierto

Un destino que nunca confirma deja la carpeta en solo lectura para siempre. Por ahora es a propósito, y en el código está marcado como lo primero a lo que hay que ponerle un plazo. Es una falla molesta, pero no se pierde nada. El error contrario, borrar primero y confirmar después, perdería los diplomas de alguien, y ninguna política de reintentos los recupera.

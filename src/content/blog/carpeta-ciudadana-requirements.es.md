---
title: El centro de una federación documental debe ser una guía telefónica, no un bus
date: 2026-09-13
summary: Especificamos un operador de la Carpeta Ciudadana en 65 requerimientos funcionales, y una sola asimetría los sostiene todos: al ministerio van identificadores, a los otros operadores van documentos.
tags: arquitectura, proceso
---

La Carpeta Ciudadana le da a cada colombiano una carpeta digital. Te afilias a un operador, una empresa que guarda las carpetas en su propia infraestructura, y entidades como el Ministerio de Educación, las notarías o las embajadas te mandan ahí documentos firmados. MinTIC opera el centralizador, GovCarpeta, que sabe qué operador tiene a qué ciudadano. Así es como un diploma emitido desde un operador llega a un ciudadano que vive en otro.

Entre tres escribimos [la especificación de requerimientos](https://sjunka.github.io/carpeta-ciudadana/) de un operador, con la estructura IEEE 830 que usa el curso de arquitectura: 65 requerimientos funcionales en nueve dominios, 30 no funcionales, 55 páginas. Casi todo se apoya en una sola frase.

## El centralizador responde una sola pregunta

La pregunta siempre es la misma: ¿ante qué operador está afiliada esta cédula? La respuesta trae la dirección de transferencia de ese operador, la guardamos en caché y el documento viaja directo de nuestros servidores a los suyos. El centralizador nunca lo ve.

Al ministerio van identificadores y a los otros operadores van documentos. Esa asimetría es la arquitectura, y el resto de la especificación la defiende.

<figure>
<video src="/blog/carpeta-transfer.es.mp4" poster="/blog/carpeta-transfer.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>Los mensajes azules son el documento y su acuse, y van de par a par. El papel del centralizador termina en el paso 2, y con la respuesta en caché la siguiente transferencia al mismo ciudadano se ahorra hasta esa consulta.</figcaption>
</figure>

La alternativa es un bus en el medio que carga cada diploma del país. Sería el cuello de botella de toda la federación, y una sola brecha ahí expondría los documentos de todos a la vez. Una guía telefónica se consulta una vez y se guarda. Lo dejamos escrito como dos límites medibles: como mucho cuatro llamadas al centralizador en toda la vida de una afiliación, y cero bytes de contenido documental, nunca.

La caché también cubre al propio centralizador, que no tiene ningún compromiso de disponibilidad y se cayó el mismo día en que [verificamos su contrato](/blog/call-the-api-first). Con el directorio en caché, una caída retrasa las consultas nuevas en lugar de parar al operador.

## Los adjetivos no son requerimientos

El caso de estudio describe la calidad con adjetivos: disponibilidad "prácticamente total", latencia "lo más baja posible", usabilidad como máxima prioridad. Ninguno puede fallar una prueba, así que ninguno puede pasarla.

Cambiamos cada uno por un número y marcamos de dónde salió cada número, del caso o de nosotros. Disponibilidad de lectura de 99,95% al mes, 2 segundos en el percentil 95 para navegar una carpeta, 50 millones de carpetas: todos nuestros, todos marcados como asunción. La marca convierte cada cifra en una pregunta que el cliente resuelve en una línea, confirmándola o dándonos la real. Una cifra que nadie marcó suele llegar a producción como si alguien la hubiera decidido.

## Toda táctica tiene un precio

La tabla que defendería primero cruza cada atributo de calidad con su métrica, su umbral, la táctica que lo sostiene y una columna más: lo que cuesta esa táctica.

Un segundo factor obligatorio para compartir un documento protege la carpeta. También es el mayor obstáculo de usabilidad para los ciudadanos con poca experiencia digital, que son justo los que el caso pone primero, y la tabla lo dice al lado de la táctica en vez de esperar a que lo descubra una prueba de usabilidad. La misma columna deja escrito que reintentar entregas de forma asíncrona hace más difícil explicarle al ciudadano qué le pasó a su diploma, y que partir los datos por cédula frena la analítica que pidió el Estado.

Si no sabíamos decir cuánto cuesta una táctica, todavía no la habíamos elegido. Solo la habíamos listado.

## Algunos requerimientos son cosas que el sistema nunca debe hacer

La especificación tiene una sección de ocho requerimientos inversos. Los que más moldearon el diseño: nada de contenido documental por el centralizador, ningún ciudadano afiliado a dos operadores ni por un momento durante un traslado, y ningún documento entregado a nadie sin la autorización del titular para esa petición concreta. Un límite escrito frena al ingeniero que lo cruzaría creyendo que mejora el producto.

El ciclo de vida del documento sigue la misma lógica: la forma en que llega decide lo que cualquiera puede hacer con él después.

<figure>
<video src="/blog/carpeta-states.es.mp4" poster="/blog/carpeta-states.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>La retención perpetua y el derecho de supresión tiran en sentidos opuestos. La especificación asume que para los certificados gana la retención, y lo marca como una decisión jurídica, no técnica.</figcaption>
</figure>

Un certificado firmado por una entidad se guarda para siempre, no se puede editar y no consume cuota. Solo la política de retención lo retira, nunca el titular. Un documento que sube el ciudadano es suyo: cuenta contra una cuota de 20 archivos y 200 MB, y lo puede borrar cuando quiera.

## Cincuenta y cinco páginas para un sistema que no existe

Es la objeción justa, y lo que compraron esas páginas es un siguiente paso que arrancó de veredictos y no de opiniones. Pasamos los nueve dominios por los cinco drivers de granularidad de la clase: alcance, volatilidad del código, escalabilidad, tolerancia a fallos y extensibilidad. Cada dominio salió con un veredicto, partir en dos, aislar o mantener unido, y [la arquitectura](/blog/carpeta-ciudadana-architecture) sacó su número de servicios directo de esa tabla.

La especificación tiene 55 páginas. La arquitectura cabe en la frase que todas defienden: al ministerio, identificadores; a los operadores, documentos.

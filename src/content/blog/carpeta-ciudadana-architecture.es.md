---
title: No elegimos once microservicios, los eligieron los requerimientos
date: 2026-09-18
summary: La arquitectura de nuestro operador de Carpeta Ciudadana sacó cada frontera de servicio de la especificación de requerimientos, y cuatro operaciones corriendo contra el API real del Estado muestran dónde se hace cumplir cada una.
tags: arquitectura, proceso
---

La segunda parte del proyecto de Carpeta Ciudadana pedía la arquitectura de nuestro operador y la prueba de que funciona: registrar un ciudadano, ingresar, subir un documento y pedirle al centralizador del ministerio que lo autentique, las cuatro de punta a punta contra el GovCarpeta real. Nuestro operador se llama Mi Carpeta Segura, y está registrado en GovCarpeta desde el 14 de septiembre.

Casi todo el diseño ya estaba en [la especificación de requerimientos](/blog/carpeta-ciudadana-requirements).

## La especificación ya sabía cuántos servicios

La especificación pasó sus nueve dominios por cinco drivers de granularidad y dejó un veredicto en cada uno. A la arquitectura solo le tocó leerlos. Partir en dos se volvió dos servicios: el almacenamiento de documentos aparte del índice de la carpeta, porque el índice se lee miles de veces por cada escritura, e identidad aparte de auditoría, porque una está en cada petición y la otra solo escribe. Aislar se volvió un servicio. Mantener unido también dio uno: correo y SMS son dos formas de decir lo mismo, así que notificaciones es un solo servicio. El centralizador quedó fuera del alcance, así que no tiene servicio nuestro, solo una pasarela.

Eso suma once, y ninguna frontera salió de una discusión frente al tablero.

## Un solo servicio le habla al Estado

GovCarpeta responde en prosa y no promete disponibilidad. Solo la pasarela tiene que saberlo. Convierte la prosa en un estado, se rinde a los 8 segundos, reintenta lecturas y nada más, y abre el circuito tras cinco fallos seguidos.

También hace cumplir la regla sobre la que se apoya toda la especificación, que ningún contenido documental llegue al centralizador:

```js
// RI-01: the gateway carries URLs, never documents.
app.use(express.json({ limit: '2kb' }))
```

Es una línea de Express, y significa que un PDF que llegue ahí por error recibe un 413 en vez de quedar copiado en un servidor del Estado. Además, toda URL que la pasarela reenvía tiene que ser https.

## El usuario nace deshabilitado

El registro exige consistencia fuerte, porque nadie puede quedar afiliado a dos operadores. GovCarpeta no tiene transacciones ni idempotencia, así que no hay contra qué hacer un commit en dos fases. Lo que hicimos fue ordenar los pasos.

<figure>
<video src="/blog/carpeta-register.es.mp4" poster="/blog/carpeta-register.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>Si el centralizador está caído en el paso 2, el registro queda pendiente. El operador nunca da a un ciudadano por libre solo porque no pudo preguntar.</figcaption>
</figure>

La cuenta existe antes que la afiliación, pero deshabilitada, así que una falla a mitad de camino no deja nada con qué iniciar sesión. Si GovCarpeta rechaza, el servicio de afiliación borra la cuenta.

## El servicio firma, el navegador carga

La carga deja a los servicios fuera del camino de los bytes. Custodia valida el archivo y la cuota de 20 documentos del ciudadano, y firma una URL de subida que caduca en cinco minutos, sin llamar siquiera al almacén. El navegador manda el archivo directo al bucket.

<figure>
<video src="/blog/carpeta-upload.es.mp4" poster="/blog/carpeta-upload.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>Custodia vuelve a leer el objeto una sola vez, como stream, para registrar su SHA-256. Es la única vez que los bytes pasan por un servicio.</figcaption>
</figure>

Un servicio que nunca carga los archivos en memoria escala por peticiones, no por megas. La autenticación hace el truco al revés: el centralizador recibe una URL de lectura válida por 15 minutos, nunca el archivo. Después el portal marca el documento como "autenticado por el centralizador" y nunca como "certificado", porque en la federación todavía nadie emite certificados. Acertar con esa palabra importó tanto como la URL: "certificado" prometería una garantía que el sistema no puede dar.

## Las decisiones se comparan, no se puntúan

Doce decisiones siguen la plantilla de decisión arquitectónica de UAM. Los criterios salen solo de los atributos de calidad de la especificación, el costo y la regulación, y cada opción queda en cumple, parcial o no cumple, con su motivo. Dejamos fuera los puntajes ponderados a propósito, porque un 7,4 contra un 6,9 esconde la discusión dentro de una suma.

La región es el ejemplo más claro. São Paulo queda más cerca de los ciudadanos colombianos, pero GovCarpeta corre en Heroku en Estados Unidos, así que desde São Paulo cada registro y cada autenticación viajarían al norte y de vuelta. Elegimos us-east1 y dejamos escrito el disenso al lado de la decisión.

## Once servicios para cuatro operaciones

Once microservicios para cuatro operaciones funcionando serían sobreingeniería si los once estuvieran corriendo. Corren cuatro: tres servicios pequeños en Node y Keycloak para la identidad. Los otros siete están diseñados y sin desplegar. El índice de la carpeta vive dentro de custodia hasta que las lecturas pasen de 100 por escritura o el p95 de la carpeta supere 2 segundos, un umbral escrito junto al servicio en vez de una corazonada.

Lo que corre está probado: 17 pruebas unitarias y 7 escenarios de punta a punta contra el GovCarpeta real, todo en verde, con cero violaciones de axe. Hoy corre en Docker Compose. Lo siguiente es Cloud Run, con las mismas imágenes.

La especificación decía que el centralizador nunca debe ver un documento. En el código esa frase quedó como un límite de 2 KB, y es el requerimiento en el que más confío, porque nadie tiene que acordarse de él.

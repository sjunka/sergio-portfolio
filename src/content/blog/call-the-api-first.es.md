---
title: Llama al API antes de dibujar la arquitectura
date: 2026-09-08
summary: Un API estatal contra la que todos los equipos estaban diseñando resultó ser un directorio de 70 operadores donde 54 no tienen dirección, y bastó una tarde de curl para verlo.
tags: arquitectura, proceso
---

El enunciado que recibió un curso entero describía un sistema nacional de documentos ciudadanos. Cada ciudadano tiene una carpeta digital. Las entidades le meten documentos. Un servicio central del ministerio sabe qué ciudadano está en qué operador, así los operadores se encuentran entre ellos y mueven un diploma de uno a otro sin que el ciudadano cargue papeles.

El enunciado traía el enlace a la documentación del API central. Todo el mundo leyó la documentación. Nadie llamó al API.

Me gasté una tarde con curl en vez de dibujar cajas. La arquitectura cambió.

## Qué contiene el directorio de verdad

`GET /apis/getOperators` devuelve 70 operadores registrados. Cada uno trae id, nombre, lista de participantes y `transferAPIURL`, que es la dirección a la que le mandas la carpeta de un ciudadano cuando se cambia de proveedor.

Dieciséis de los setenta tienen ese campo. Los otros 54 son inalcanzables. Existen en el directorio y no hay forma de entregarles nada. El campo es opcional y nadie lo verifica, así que el 77% de la federación es un nombre sin puerta.

Eso no es un bug que yo pueda esquivar. Es la forma del mundo donde vive mi sistema. Todo diseño que asumía "busco el operador y lo llamo" necesita una rama para el operador al que no se puede llamar, y esa rama es la mayoría del tráfico.

## El endpoint que no autentica nada

`PUT /apis/authenticateDocument` es la pieza sobre la que se para todo el modelo de confianza. Un diploma firmado vale algo porque el ciudadano no lo puede falsificar, y quien firma es el servicio central.

Recibe una URL prefirmada de S3. No el documento. Nunca descarga los bytes que dice autenticar, así que como mucho le pone un sello a una referencia que puede cambiar después del sello. El no repudio que promete el enunciado no tiene nada debajo.

El directorio tampoco publica llaves públicas. Nombre, id, participantes, y ya. Para verificar la firma de otro operador necesito su material criptográfico, y no hay de dónde sacarlo. La confianza federada no es algo que se me olvidó construir. Es que no se puede construir contra este contrato.

## Detalles chiquitos que deciden tu código

`validateCitizen` responde en prosa: `El ciudadano con id: 1234567890 se encuentra registrado en el operador: Operador Ciudadano ` con espacio al final. Para saber qué operador tiene a un ciudadano hay que parsear una frase, y el nombre que sacas de ahí es tu única llave de cruce contra un directorio que no garantiza nombres únicos.

`getOperators` responde 200 sin ninguna credencial. El Swagger no declara definiciones de seguridad, y `DELETE /apis/unregisterCitizen` está igual de abierto, así que cualquiera en internet puede desafiliar a cualquiera. El CORS es una allowlist que se cae: sin `Origin` devuelve 200, un origen desconocido devuelve 500, porque el middleware lanza y nadie lo atrapa.

Nada de esto está en la documentación. Todo está en las respuestas.

## Lo que importa

El documento de requerimientos describe el sistema que alguien quiere que exista. El servicio corriendo es el que existe. Cuando se contradicen, gana el que corre, y te enteras en una tarde de curl o en la semana seis de implementación.

Probarlo primero también cambia lo que escribes. La mitad de mis preguntas abiertas al profesor ahora son concretas: qué hacemos con los 54 operadores sin endpoint, y quién emite los certificados. Esas se pueden responder. "¿Cómo funciona la federación?" no.

Lee la documentación para saber a qué llamar. Llama para saber qué estás construyendo.

---
title: Una especificación que un agente puede construir es la que fija lo que si no adivinaría
date: 2026-08-25
summary: Las líneas de una especificación que se ganan su largo describen la forma de lo que el código no puede ver, porque un mock escrito desde el código que lo llama coincide con él perfectamente y se equivoca igual.
tags: proceso, arquitectura
---

Una especificación con suficiente detalle para una persona competente no tiene suficiente detalle para un agente, y la diferencia no está en los requisitos. Los requisitos son la parte fácil. Tanto una persona como una máquina pueden leer "el usuario le saca una foto a algo y recibe un video corto" y construir más o menos lo correcto.

La diferencia está en las formas. En cada lugar donde el código se encuentra con algo que no escribió, una API de terceros, el comportamiento de caché de un driver, un archivo del framework que cambió de nombre entre versiones, hay un hecho que no se puede derivar del repositorio. Una persona nota la incertidumbre y va a averiguar. Un agente la llena con el valor más plausible y sigue, y lo plausible casi siempre alcanza para compilar.

## El mock que le da la razón al bug

El proveedor de generación devuelve un documento de estado. Lo obvio de adivinar para el campo de la imagen es un arreglo de URLs. Lo que manda de verdad es un arreglo de objetos:

```js
// Lo que el proveedor manda.
const status = { images: [{ url: 'https://...' }], video: { url: 'https://...' } }

const guess = status.images[0] // un objeto, no una URL
const url = status.images[0].url // lo que tenía que ser
```

Ese es un arreglo de un caracter y no es la parte interesante. La parte interesante es que esto pasó por una suite entera en verde, dos veces, con dos agentes distintos, porque quien escribe el código que consume también escribe el doble. El mock devolvía `images: ["https://..."]` y el código leía `images[0]`, y coincidían el uno con el otro perfectamente. La suite estaba probando que el código era consistente con un proveedor que no existe.

La razón por la que esto sobrevive a una revisión es que nada de eso se ve mal. No hay un test rojo para investigar ni una advertencia en el log. La suite está verde, la cobertura es alta, y el único rastro del error es una cantidad de aserciones que pasan sobre una ficción. El chequeo de tipos tampoco lo habría atrapado, porque la ficción era consistente consigo misma.

Un doble es una afirmación sobre un sistema que no controlás. Debería escribirse desde una respuesta grabada, no desde la función que la consume, y la aserción va en la especificación para que ninguna mitad del par pueda derivar hacia la otra. La nuestra ahora lo dice en una línea: el proveedor envuelve sus assets, leé `status.images?.[0]?.url` y `status.video?.url`, nunca el elemento pelado.

## El loop que se queda sin intentos y no dice nada

El segundo es más una clase de bug que una forma, y es peor porque nunca falla donde ocurre.

<figure>
<svg viewBox="0 0 640 176" role="img" aria-label="El pipeline de generación desde la foto hasta el asset guardado, con el poll al proveedor marcado como el paso riesgoso">
  <defs>
    <marker id="pp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="10" y="12" class="dg-m">DOS CORRIDAS REALES: 59S Y 115S</text>
  <rect x="10" y="24" width="140" height="52" rx="6" class="dg-node"/>
  <text x="80" y="46" text-anchor="middle" class="dg-t">Foto</text>
  <text x="80" y="63" text-anchor="middle" class="dg-s">un data: URL del celular</text>
  <path d="M150 50 H166" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="170" y="24" width="140" height="52" rx="6" class="dg-node"/>
  <text x="240" y="46" text-anchor="middle" class="dg-t">Blob storage</text>
  <text x="240" y="63" text-anchor="middle" class="dg-s">un URL público, no bytes</text>
  <path d="M310 50 H326" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="330" y="24" width="140" height="52" rx="6" class="dg-node-warn"/>
  <text x="400" y="46" text-anchor="middle" class="dg-t">Poll al proveedor</text>
  <text x="400" y="63" text-anchor="middle" class="dg-s">cada 2s, 60 intentos</text>
  <path d="M470 50 H486" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="490" y="24" width="140" height="52" rx="6" class="dg-node-accent"/>
  <text x="560" y="46" text-anchor="middle" class="dg-t">Guardado</text>
  <text x="560" y="63" text-anchor="middle" class="dg-s">una fila por cada asset</text>
  <path d="M400 76 V104" class="dg-flow-dashed" marker-end="url(#pp-head)"/>
  <rect x="290" y="110" width="220" height="60" rx="6" class="dg-node-warn"/>
  <text x="400" y="128" text-anchor="middle" class="dg-s">intentos agotados, lanza error</text>
  <text x="400" y="142" text-anchor="middle" class="dg-s">"Image provider timed out"</text>
  <text x="400" y="156" text-anchor="middle" class="dg-s">respuesta lista sin URL, también lanza</text>
</svg>
<figcaption>El techo son 120 segundos contra una cola que se ha visto quieta 45 antes de arrancar. El margen acá se mide en segundos, y saber eso es lo que lo convierte en una decisión y no en un accidente.</figcaption>
</figure>

El poll está escrito como un loop acotado, y eso está bien. Lo que el loop hace cuando se queda sin intentos es toda la pregunta:

```js
// Sale del loop, lee un estado que nunca quedó listo,
// y muere adentro de fetch(undefined) tres saltos más allá.
for (let i = 0; i < 60; i++) { ... }
return fetch(status.images[0].url)

// Falla donde falló, con la causa en el mensaje.
throw new Error("Image provider timed out")
```

Caerse por abajo convierte un timeout en un acceso a nulo, y el stack trace después apunta al helper de fetch, que es inocente. Una hora de debugging se va al archivo equivocado. La regla entra en una línea de especificación: una espera acotada lanza error cuando llega a su cota, y un valor leído después de una espera se revisa antes de usarse.

## Escribí el número que mediste, no el que querés

La tentación en un plan es enunciar un objetivo como si fuera una garantía. Primera imagen en pantalla en noventa segundos suena a afirmación. No lo es, porque la cola del proveedor es compartida y nadie de mi lado la controla.

Lo que fue al plan en cambio fue la medición: la cola se queda quieta hasta 45 segundos antes de arrancar, dos corridas reales terminaron en 59 y 115 segundos, el cliente le da 120, así que el margen se mide en segundos y no en minutos. Eso queda escrito como un techo conocido con el camino de mejora al lado. Un agente que lee un objetivo va a construir para el objetivo y se va a sorprender. Un agente que lee un rango medido y un techo con nombre va a escribir la rama del timeout, porque el documento le acaba de decir que esa rama es alcanzable.

## La forma de una especificación que aguanta el contacto

Tres cuartos de lo que hace que una especificación sea construible sin una persona en el medio no tiene nada de novedoso. Pantallas, rutas, modelo de datos, todo eso es trabajo corriente que cualquiera escribiría. El cuarto que decide si funciona es el que describe el mundo afuera del repositorio: el cuerpo exacto de la respuesta, el comportamiento en el borde de una espera acotada, los números que alguien de verdad observó, y las trampas que ya costaron una hora cada una.

Esas líneas parecen trivia en una revisión de documento. Son las únicas que un agente no podría haber escrito solo.

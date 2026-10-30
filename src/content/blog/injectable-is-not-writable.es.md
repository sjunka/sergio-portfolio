---
title: Inyectable no significa que se pueda escribir
date: 2026-10-24
summary: Una inyección SQL que puede leer una base de datos puede no poder escribir en ella, y el bug que dejó en cero un pedido del carrito fue una cantidad negativa que el servidor nunca revisó.
tags: seguridad, proceso
---

Lo que una inyección puede hacer depende de la sentencia en la que cae y del driver que la ejecuta, y la etiqueta inyección SQL no dice nada sobre ninguno de los dos. En mi curso de seguridad nos pusieron una tarea directa: lograr que un pedido del carrito de compras se confirme con el total en cero, contra una instancia compartida de Juice Shop, versión 20.3.0, sobre SQLite. La pista de mi profesor fue inyección SQL más un UPDATE, es decir, algo como un UPDATE encadenado sobre el precio de un producto. Es una pista razonable. La probé antes de construir nada encima de ella.

## Los dos endpoints inyectables solo leen

Hay dos lugares de la instancia que son inyectables. El buscador de productos, `/rest/products/search?q=`, es uno: una comilla suelta en el término de búsqueda, `q=test'`, devuelve `SQLITE_ERROR`. El formulario de login es el otro, y el clásico `' OR 1=1--` devuelve un token de admin. Los dos hallazgos son reales, y los dos corren como sentencias SELECT. Ninguno escribe nada. Un UNION puede ampliar lo que lees por cualquiera de los dos puntos. No puede cambiar lo que está guardado.

## El UPDATE encadenado no cambió nada

El siguiente paso obvio es encadenar una segunda sentencia después de la primera: cerrar el string, agregar `;UPDATE Products SET price=1.23 WHERE id=1;--` y dejar que la base de datos corra las dos. No corrió. Ese payload devolvió `SQLITE_ERROR: near ";": syntax error`, y lo mismo pasó con cualquier punto y coma suelto. Una segunda variante, pensada para dejar todos los precios en cero, no tuvo efecto. El producto 1 costaba 1.99 antes y después de los dos intentos. Mi mejor apuesta, porque ninguna de las dos respuestas lo prueba: el driver prepara una sola sentencia por llamada, así que lo que venga después del primer punto y coma se rechaza o se ignora.

## El bug real fue un campo de cantidad sin mínimo

El bug que funcionó no era una inyección. Juice Shop calcula el total de un pedido en el servidor como la suma de precio por cantidad, y `PUT /api/BasketItems/:id` acepta una cantidad negativa sin límite inferior.

Dos productos de 1.99 cada uno, Apple Juice y Banana Juice, arrancan un carrito con un total normal de 3.98. Un PUT directo de -1 sobre el segundo ítem convierte esa línea en -1.99, y el servidor suma 1.99 y -1.99 y obtiene 0.

```js
await fetch('/api/BasketItems/21', {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ quantity: -1 }) // the UI stops at 1, the API does not
})
// 200 OK, and the basket now totals 0.00
```

El checkout con Standard Delivery, que no cuesta nada, acepta el pedido de 0.00 y devuelve un número de confirmación. Juice Shop clasifica este reto, Payback Time, en Improper Input Validation. Mi informe lo etiqueta como diseño inseguro, OWASP A04, y no como inyección, A03, que es hacia donde apuntaba la pista.

<figure>
<svg viewBox="0 0 640 74" role="img" aria-label="Tres intentos y resultados: la inyección en el buscador y el login solo lee, un UPDATE encadenado no cambia nada, una cantidad negativa confirma un pedido en 0.00">
  <rect x="5" y="10" width="200" height="54" rx="8" class="dg-node"/>
  <text x="105" y="33" text-anchor="middle" class="dg-t">Buscador + login</text>
  <text x="105" y="50" text-anchor="middle" class="dg-s">funciona, solo SELECT</text>
  <rect x="220" y="10" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="33" text-anchor="middle" class="dg-t">UPDATE encadenado</text>
  <text x="320" y="50" text-anchor="middle" class="dg-s">error o no-op, precio 1.99</text>
  <rect x="435" y="10" width="200" height="54" rx="8" class="dg-node-accent"/>
  <text x="535" y="33" text-anchor="middle" class="dg-t">Cantidad negativa</text>
  <text x="535" y="50" text-anchor="middle" class="dg-s">pedido confirmado en 0.00</text>
</svg>
<figcaption>Dos intentos necesitaron una comilla. El que funcionó necesitó un signo menos.</figcaption>
</figure>

## La pista era razonable y aun así falló aquí

La objeción justa es que las stacked queries son una técnica real, no un mito. Varias bases de datos y drivers sí corren un lote separado por punto y coma, y en esas encadenar un UPDATE después de un SELECT vulnerable es una forma conocida de convertir una lectura en una escritura. Yo no desmentí las stacked queries. Desmentí una afirmación sobre un driver en una instancia, y no podía saber para qué lado iría hasta que la corrí. Un camino de ataque que te entregan es una hipótesis sobre una base de datos y un driver concretos, y la manera de zanjarla es correrla contra los que tienes enfrente.

## Lo que cierra la inyección no cierra el bug del carrito

Las consultas parametrizadas eliminan toda la clase, lecturas y escrituras por igual, porque las dos vienen de una sola causa raíz: entrada que llega al motor SQL como código en vez de como dato. Una cuenta de base de datos que no pueda hacer UPDATE sobre Products es la segunda línea de defensa, y en un driver donde las stacked queries sí funcionan es el control que habría frenado la ruta de la pista. Ninguna de las dos toca el bug del carrito. Ese necesitaba que el servidor exigiera una cantidad entre 1 y el stock disponible: el total ya se calculaba en el servidor, a partir de un número que el cliente podía fijar.

## La lista de verificación

Antes de construir algo sobre una inyección, ya sea que la encontraste tú o que alguien te entregó el camino, pásala por estas pruebas contra el objetivo real:

- Comprueba que la entrada cambia lo que devuelve la app, antes de llamarlo lectura.
- Comprueba que la misma entrada cambia un valor guardado, antes de llamarlo escritura.
- Manda un lote y comprueba que corre más que la primera sentencia, antes de contar con stacked queries.
- Rastrea qué hace la aplicación con el valor cambiado, antes de declarar completo el camino.

---
title: Tu FlatList no es lenta, tu renderItem sí
date: 2026-04-18
summary: Casi todo el jank de listas en React Native sale de tres hábitos en renderItem, y ninguno se arregla ajustando windowSize.
tags: react-native, rendimiento
---

Cada tantos meses alguien me pasa una pantalla que scrollea a 40fps en un Android de gama media y me pregunta qué prop de `FlatList` lo arregla. La respuesta casi siempre es ninguna. `windowSize`, `initialNumToRender` y `maxToRenderPerBatch` cambian *cuántas* filas renderizas. No hacen nada sobre lo caro que es cada fila, y una fila cara es lo que casi siempre tienes.

Este es el orden en que reviso las cosas.

## 1. ¿`renderItem` está creando un tipo de componente nuevo?

Este es el que más duele y el que más inocente se ve:

```tsx
<FlatList
  data={orders}
  renderItem={({ item }) => {
    const Row = () => <OrderCard order={item} />   // tipo nuevo, en cada render
    return <Row />
  }}
/>
```

Un *tipo* de componente declarado dentro de una función de render es un tipo distinto en cada pasada, así que React desmonta y vuelve a montar todo el subárbol en vez de actualizarlo. Pierdes el estado local, pierdes la memoización, y pagas el costo completo de montaje por fila por frame de scroll. El arreglo es no hacerlo: declara el componente a nivel de módulo y llámalo.

La versión más sutil del mismo bug es pasar un objeto o una arrow function inline como prop a una fila memoizada:

```tsx
renderItem={({ item }) => (
  <OrderCard order={item} style={{ padding: 12 }} onPress={() => open(item.id)} />
)}
```

Puedes envolver `OrderCard` en `React.memo` todo lo que quieras. `style` y `onPress` son referencias nuevas cada vez, la comparación de props falla, y se re-renderiza igual. Sube el estilo a un `StyleSheet` y haz que el handler del press tome el id desde la fila misma.

## 2. ¿La fila sabe cuánto mide?

Sin `getItemLayout`, la lista mide cada fila del lado nativo antes de poder posicionarla. Para filas de altura fija estás tirando información gratis:

```tsx
const ROW_HEIGHT = 72

getItemLayout={(_, index) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * index,
  index,
})}
```

Esto también arregla el bug de "el scroll a un índice cae en el lugar equivocado", que es la misma medición faltante apareciendo en otro lado.

Si tus filas de verdad varían de altura, no lo falsees con un promedio. Dale a la fila una altura mínima estable para que el layout no se reacomode cuando carga la imagen, y acepta la pasada de medición.

## 3. ¿Qué está pasando en el hilo de JS mientras scrolleas?

Abre el profiler y mira el hilo de JS durante un fling. Si ves trabajo ahí, el scroll nunca fue el problema, solo es cuando el problema se vuelve visible. Los sospechosos de siempre son un context provider re-renderizando la lista con cada tecla que se escribe en otra parte del árbol, un handler de `onViewableItemsChanged` haciendo analítica de forma síncrona, y el formateo de fechas. `new Intl.DateTimeFormat()` dentro de una fila es genuinamente lento en Hermes. Construye el formateador una vez, fuera del componente.

## Dónde ayuda de verdad la New Architecture

En la New Architecture, `FlatList` se vuelve más rápida sobre todo porque el layout es síncrono y el bridge no está serializando las props de tus filas a JSON. No hace barato un componente caro. Si tu fila hace layout thrash o asigna memoria por frame, Fabric renderiza esa fila cara de forma más predecible, no menos costosa.

La virtualización de listas en React Native está bien. Lleva años estando bien. Mira la fila.

---
title: Your FlatList isn't slow, your renderItem is
date: 2026-04-18
summary: Most React Native list jank comes from three habits in renderItem, and none of them are fixed by tuning windowSize.
tags: react-native, performance
---

Every few months someone hands me a screen that scrolls at 40fps on a mid-range Android and asks which `FlatList` prop will fix it. The answer is usually none of them. `windowSize`, `initialNumToRender` and `maxToRenderPerBatch` change *how many* rows you render. They do nothing about how expensive each row is, and an expensive row is what you almost always have.

Here is the order I check things in.

## 1. Is `renderItem` allocating a new component type?

This is the one that hurts most and looks most innocent:

```tsx
<FlatList
  data={orders}
  renderItem={({ item }) => {
    const Row = () => <OrderCard order={item} />   // new type, every render
    return <Row />
  }}
/>
```

A component *type* declared inside a render function is a different type on every pass, so React unmounts and remounts the whole subtree instead of updating it. You lose all local state, all memoisation, and you pay full mount cost per row per scroll frame. The fix is to not do it: declare the component at module scope and call it.

The subtler version of the same bug is passing an inline object or arrow as a prop to a memoised row:

```tsx
renderItem={({ item }) => (
  <OrderCard order={item} style={{ padding: 12 }} onPress={() => open(item.id)} />
)}
```

`OrderCard` can be wrapped in `React.memo` all you like. `style` and `onPress` are new references each time, the props comparison fails, and it re-renders anyway. Hoist the style into a `StyleSheet` and make the press handler take the id from the row itself.

## 2. Does the row know its own height?

Without `getItemLayout`, the list measures every row on the native side before it can position it. For fixed-height rows you are throwing away free information:

```tsx
const ROW_HEIGHT = 72

getItemLayout={(_, index) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * index,
  index,
})}
```

This also fixes the "scroll to index lands in the wrong place" bug, which is the same missing measurement showing up somewhere else.

If your rows genuinely vary in height, don't fake it with an average. Give the row a stable minimum height so layout doesn't reflow when the image loads, and accept the measurement pass.

## 3. What is happening on the JS thread while you scroll?

Open the profiler and watch the JS thread during a fling. If you see work there, scrolling was never the problem, it's just when the problem becomes visible. The usual suspects are a context provider re-rendering the list on every keystroke somewhere else in the tree, an `onViewableItemsChanged` handler doing analytics work synchronously, and date formatting. `new Intl.DateTimeFormat()` inside a row is genuinely slow on Hermes. Build the formatter once, outside the component.

## Where the New Architecture actually helps

On the New Architecture, `FlatList` gets faster mostly because layout is synchronous and the bridge isn't serialising your row props through JSON. It does not make an expensive component cheap. If your row does layout thrash or allocates per frame, Fabric renders that expensive row more predictably, not less expensively.

The list virtualisation in React Native is fine. It's been fine for years. Look at the row.

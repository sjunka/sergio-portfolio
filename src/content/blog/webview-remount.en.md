---
title: Your WebView reloads because the source prop is a new object
date: 2026-08-08
summary: Embedding a web micro-app in React Native means two runtimes, a handshake, and a bug that only shows up on the second deposit.
tags: react-native, webview
---

I built a savings app where the goal detail screen is not a React Native screen. It's a `WebView` running a small HTML page that renders the goal, draws the progress bar, and takes the deposit amount. The native side owns the data and the notifications, the web side owns that one screen. The interesting part was never the layout. It was the seam.

## The reload nobody asks for

First version, and this is the shape everybody writes:

```tsx
<WebView source={{ html: webAppHtml }} onMessage={handleMessage} />
```

That object literal is a new reference on every render of the parent. `WebView` compares `source` and reloads the page when it changes, so every re-render of the screen threw away the web app's DOM, its scroll position, and every variable it was holding, then rebuilt it from scratch. On a fast phone it reads as a flicker. On a mid-range Android it reads as broken.

The fix is boring and belongs at module scope:

```ts
// Module-level constant (not an inline literal) so the reference is stable
// across renders and the WebView never reloads because `source` changed.
export const webAppSource: { html: string } = { html: '<!DOCTYPE html>...' }
```

Same class of bug as passing an inline object to a memoised component, with a much worse failure mode. A wasted re-render costs you a frame. A wasted reload costs you the entire state of a second application.

## Nobody is listening yet

Once the page stops reloading, the next problem is the opening move. Native has the goal data and wants to send it. The page has to be listening before it arrives, and there is no event that tells native "the JavaScript in your WebView has finished attaching its listeners." `onLoadEnd` fires when the document loads, which is close, and close is how you get a bug that reproduces on one phone out of five.

So the page speaks first:

```js
document.addEventListener('message', handleNativeMessage)
window.addEventListener('message', handleNativeMessage)

// Announce readiness only after both listeners above are attached. The
// native side replies only once it hears WEB_APP_READY, so the reply can
// never arrive before this page is listening for it.
postToNative({ type: 'WEB_APP_READY' })
```

Native replies with `SESSION_INITIALIZED` carrying the goal. The race is closed by construction rather than by timing, which is the only way I trust it.

The two `addEventListener` calls are not defensive coding, they're a real platform split. `react-native-webview` dispatches the native-to-web message on `document` on Android and on `window` on iOS. Registering both is correct on either platform, and since the handler is idempotent, a duplicate delivery would be harmless anyway.

## Then the second deposit was wrong

With the handshake working, a deposit went native-side: confirm dialog, update the store, and tell the web the new total so it could repaint the bar without a reload. A new message type, `ACCUMULATED_AMOUNT_UPDATED`, carrying one number.

It worked. Then QA made two deposits in a row and the web showed 1.502.000 while the store held 1.503.000.

Here is what the screen was doing:

```tsx
const result = confirmDeposit(depositGoalId, amount)
const updatedGoal = { ...goal, accumulatedAmount: goal.accumulatedAmount + amount }
webViewRef.current?.postMessage(JSON.stringify({
  type: 'ACCUMULATED_AMOUNT_UPDATED',
  payload: { accumulatedAmount: updatedGoal.accumulatedAmount },
}))
```

`goal` comes from a snapshot hook that freezes at mount. First deposit of the session: snapshot plus amount is correct, because the snapshot is still fresh. Second deposit: snapshot plus amount is the snapshot plus only the second amount, and the first one has vanished.

The tempting fix is to make the snapshot live. That would have worked and it would have been the wrong fix, because the actual mistake was arithmetic living in the presentation layer at all. `confirmDeposit` already computes the new total, correctly, from the current state. The screen was recomputing a domain operation on stale input for no reason.

```tsx
const result = confirmDeposit(depositGoalId, amount)
if (result) {
  // The figure comes from the use case, never recomputed from `goal`: that
  // snapshot is frozen at mount, so adding to it would be right on the first
  // deposit of a session and wrong on every one after.
  postAccumulated(result.accumulatedAmount)
}
```

The use case returns the number, the screen forwards it, the duplicated arithmetic is deleted. The regression test makes two consecutive deposits, which is the smallest test that fails on the old code and the one I should have written when I added the message.

## What the seam actually taught me

A WebView is not a component, it's a second application with a message queue between you and it. Every habit that makes sense across a network boundary applies: version the messages, let the client announce readiness instead of guessing, keep the payload minimal, and never send derived data when you can send the source of truth.

The one I keep relearning is the last one. Both bugs in this post are the same bug wearing different clothes: a value that was correct once, cached somewhere it should not have been, and read later as if it were still true.

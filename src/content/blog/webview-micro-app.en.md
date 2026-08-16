---
title: A web screen inside a native app is a trust boundary, not a component
date: 2026-08-08
summary: Embedding a micro-app in a WebView gives you a second runtime, an unvalidated input channel into your global state, and a startup race. Here is the contract that closes all three.
tags: react-native, architecture
---

Sooner or later a mobile product gets a screen that has to be web. A different team owns it, or it ships on a weekly cadence the app stores cannot match, or the business wants to change it without a release. The usual answer is a `WebView`, and the usual result is a screen that works on the demo and behaves strangely in the field.

I built one of these recently: a savings app where the goal list is native and the goal detail, including the deposit form, is a static web micro-app inside a `WebView`. The interesting engineering was not either side. It was the seam.

<figure class="shots">
<img src="/blog/bolsillo-detail-ios.png" alt="The goal detail screen rendered by the web micro-app on iOS" />
<img src="/blog/bolsillo-detail-android.png" alt="The same web micro-app rendered on Android" />
</figure>

Same HTML on both platforms, which is the entire reason anyone takes this trade. What follows is what it costs.

## Three problems, and they are not the ones people expect

The problems are not styling or scroll behaviour. They are these.

The `WebView` reloads when you did not ask it to, throwing away a live application. The page and the native side race at startup, and whoever loses is silent about it. And every message arriving from the page is external input with a direct route into your global state.

Each has a specific fix, and together they form a contract worth writing down before any feature work.

## The reload nobody asks for

This is the first line everyone writes:

```tsx
<WebView source={{ html }} onMessage={handleMessage} />
```

That object literal is a fresh reference on every render of the parent. `WebView` compares `source`, sees a change, and reloads the page. Every re-render of the screen destroys the DOM, the scroll position and every variable the micro-app was holding, then rebuilds from zero.

Hoisting the source to a module-level constant fixes it permanently. It is the same class of mistake as passing an inline object to a memoised child, with a far worse blast radius: a wasted re-render costs a frame, a wasted reload costs the entire state of a second application.

## The handshake, and why native must not speak first

Native holds the data and wants to send it. The page has to be listening when it arrives. There is no event that means "the JavaScript inside your WebView has finished attaching its listeners." `onLoadEnd` fires when the document loads, which is close enough to work on a fast device and fail on a slow one.

So the page speaks first. It attaches its listeners, then announces itself, and native replies only to that announcement.

<figure>
<svg viewBox="0 0 640 336" role="img" aria-label="Message sequence between the native shell and the web micro-app">
  <defs>
    <marker id="wv-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="wv-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="16" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="110" y="21" text-anchor="middle" class="dg-t">Native shell</text>
  <rect x="436" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="530" y="21" text-anchor="middle" class="dg-t">Web micro-app</text>
  <path d="M110 34 V330" class="dg-flow-dashed"/>
  <path d="M530 34 V330" class="dg-flow-dashed"/>
  <text x="520" y="60" text-anchor="end" class="dg-s">listeners attached on window and document</text>
  <text x="320" y="84" text-anchor="middle" class="dg-m">WEB_APP_READY</text>
  <path d="M524 92 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="320" y="118" text-anchor="middle" class="dg-m">SESSION_INITIALIZED &#123; goal &#125;</text>
  <path d="M116 126 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="144" class="dg-s">first paint</text>
  <text x="520" y="182" text-anchor="end" class="dg-s">user submits an amount</text>
  <text x="320" y="206" text-anchor="middle" class="dg-m">DEPOSIT_CONFIRMED &#123; goalId, amount &#125;</text>
  <path d="M524 214 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <rect x="20" y="228" width="180" height="52" rx="6" class="dg-node-warn"/>
  <text x="110" y="248" text-anchor="middle" class="dg-t">parse, validate, reject</text>
  <text x="110" y="263" text-anchor="middle" class="dg-s">then the use case,</text>
  <text x="110" y="275" text-anchor="middle" class="dg-s">then the store</text>
  <text x="320" y="304" text-anchor="middle" class="dg-m">ACCUMULATED_AMOUNT_UPDATED &#123; accumulatedAmount &#125;</text>
  <path d="M116 312 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="330" class="dg-s">repaints in place</text>
</svg>
<figcaption>The page announces readiness before native sends anything, so the opening race is closed by construction rather than by timing. Every inbound message passes the validation box before it can reach the store.</figcaption>
</figure>

The race is not made unlikely. It is made impossible, which is the only version I trust, because timing bugs at a runtime boundary reproduce on one device out of five and never on the one on your desk.

One platform detail worth knowing: `react-native-webview` delivers the native-to-web message on `document` on Android and on `window` on iOS. Registering both is correct everywhere, and since the handler is idempotent a duplicate delivery is harmless.

## Treat the page as a client you did not write

The message channel is the whole attack surface, and it is easy to forget that because you wrote the page too. You wrote *this version* of the page. A `WebView` renders whatever HTML it is given, and on a compromised device or a mis-scoped release that is not necessarily your HTML.

So there is exactly one module that knows the wire format, and it never throws. An unparseable or malformed message resolves to null and gets dropped. Everything downstream receives a typed value or nothing, which means no caller ever needs a try/catch and no malformed payload ever reaches Redux.

That single decision is what lets the rest of the app treat these messages as ordinary typed events. The trust boundary is enforced in one file instead of being everyone's responsibility, which is the difference between a rule and a hope.

## Updating without remounting

The naive way to reflect a new balance in the page is to re-render the screen with new data, which reloads the `WebView`, which loses everything. The right way is to treat the page as a live client and send it a message.

That means adding a second native-to-web message type rather than a second source of truth, and it means the payload has to carry the number the domain just computed. Not the number the screen can derive.

That last point cost me a bug. The screen had a goal snapshot captured at mount and computed the new balance by adding the deposit to it. Correct on the first deposit of a session, wrong on every one after, because the snapshot never moved. The visible symptom was the page showing 1.502.000 while the store held 1.503.000.

The tempting fix is to make the snapshot live. The real fix is that the presentation layer had no business doing domain arithmetic at all. The use case already computes the new balance from current state; it just was not returning it. Once it did, the screen forwards a number instead of deriving one, and the duplicated arithmetic disappears.

## The rule that generalises

Everything above is one rule wearing four costumes: across a runtime boundary, send facts, never derivations.

The stable `source` is a fact about identity. The handshake is a fact about readiness rather than a guess at it. The validated parser is a refusal to derive trust from origin. And the balance message carries what the domain computed instead of what the view could work out.

A `WebView` looks like a component in the JSX tree, which is exactly why this keeps catching people. It is a second application with a message queue in front of it, and every habit that makes sense across a network boundary applies to it unchanged.

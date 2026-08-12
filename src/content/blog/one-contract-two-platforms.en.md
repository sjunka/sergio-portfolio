---
title: What a TurboModule spec cannot tell you
date: 2026-08-11
summary: Codegen guarantees both platforms have the same types. It has nothing to say about denied permissions, double taps, or who owns a system singleton, and that is where implementations quietly diverge.
tags: react-native, native-modules
---

A native module has a deceptively simple job: expose a platform capability to JavaScript once, and have it behave the same way on two operating systems that agree about almost nothing. React Native's codegen makes the first half free. The second half is where the work is, and no amount of tooling touches it.

I wrote a small library that does two things, open the system confirm dialog and fire a local notification when a savings goal completes. The whole TypeScript surface is two method signatures. Writing it twice, once in Swift and once in Kotlin, is what showed me how much of the contract had never been written down.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="One TypeScript spec generating two native implementations, with a line marking where the spec stops guaranteeing anything">
  <defs>
    <marker id="tm-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tm-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="200" y="0" width="240" height="46" rx="8" class="dg-node-accent"/>
  <text x="320" y="21" text-anchor="middle" class="dg-t">TypeScript spec</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">names, arity, types, promise shape</text>
  <path d="M320 50 V66" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="250" y="70" width="140" height="30" rx="15" class="dg-node"/>
  <text x="320" y="90" text-anchor="middle" class="dg-t">codegen</text>
  <path d="M320 104 V118 H130 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <path d="M320 104 V118 H510 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="30" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="130" y="162" text-anchor="middle" class="dg-t">Swift implementation</text>
  <text x="130" y="179" text-anchor="middle" class="dg-s">UIAlertController, UNUserNC</text>
  <rect x="410" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="510" y="162" text-anchor="middle" class="dg-t">Kotlin implementation</text>
  <text x="510" y="179" text-anchor="middle" class="dg-s">AlertDialog, NotificationManager</text>
  <path d="M0 216 H640" class="dg-flow-dashed"/>
  <text x="320" y="234" text-anchor="middle" class="dg-m">BELOW THIS LINE THE SPEC GUARANTEES NOTHING</text>
  <rect x="0" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="100" y="268" text-anchor="middle" class="dg-t">Denial semantics</text>
  <text x="100" y="284" text-anchor="middle" class="dg-s">resolve or reject?</text>
  <rect x="220" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="268" text-anchor="middle" class="dg-t">Re-entrancy</text>
  <text x="320" y="284" text-anchor="middle" class="dg-s">what does a double tap do?</text>
  <rect x="440" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="540" y="268" text-anchor="middle" class="dg-t">Singleton ownership</text>
  <text x="540" y="284" text-anchor="middle" class="dg-s">who holds the delegate?</text>
</svg>
<figcaption>Codegen enforces everything above the line and nothing below it. The three boxes underneath are the ones that make two platforms behave differently while both still typecheck.</figcaption>
</figure>

## Denial is not an error

`notifyGoalCompleted(goalName): Promise<void>`. What should happen when the user has denied notification permission?

The type does not say, and both answers are defensible. Rejecting is honest: the caller asked for a notification and did not get one. Resolving is also honest: the user already made this choice, it is not an exceptional condition, and the caller cannot do anything with the rejection except swallow it.

I chose to resolve. The goal is still complete; this one channel stays quiet. What matters more than the choice is that both platforms make the same one, and that turns out to be harder than it sounds, because they do not present the same question. iOS gives an authorization status enum with five cases, checked before you schedule anything. Android 13 and up gives a runtime permission you request through the activity, plus a separate app-level notifications switch that is not a permission at all and has to be checked independently.

Two platforms, three different ways for the answer to be no, one behaviour the JavaScript caller observes. None of that is visible in `Promise<void>`.

## The promise that never settles

`showConfirmDialog(title, message): Promise<boolean>`. Users double tap. What happens on the second call while the first dialog is still up?

On iOS, UIKit refuses to present a view controller on top of one that is already presenting, and it refuses silently. No exception, no callback, nothing at all. The second promise simply never settles, and the caller waits forever behind a spinner that will never resolve. On Android the second dialog stacks over the first, which is not a hang but is not what anyone wanted either.

The fix is a re-entrancy guard on both sides that rejects the second call with a named error instead of leaving it dangling. Small code. The point is that nothing in the type system, the codegen, or either platform's compiler was ever going to ask me the question. Writing the second implementation asked it, because you cannot port a behaviour you never articulated.

## The singleton you are quietly taking

To show a notification while the app is in the foreground on iOS, something must implement the notification centre delegate. That API accepts exactly one delegate, process-wide.

A library that registers itself as that delegate silently evicts whatever the host app had registered, which for a lot of apps is their push notification handling. It works in the example app and breaks in production, in a codebase whose owner has no reason to suspect a savings-notification library.

So the library keeps a weak reference to the previous delegate and forwards the presentation callback to it when one exists. Android has no equivalent hazard, because its notification manager is not a single-delegate API. There is nothing to take and nothing to give back.

That asymmetry is the shape of most of them. The differences that survived into the final code all live in the platform, not in the contract: Android needs a request code per permission request so a late callback cannot resolve the wrong promise, and an incrementing notification id so two completed goals do not overwrite each other in the tray. iOS needs neither.

## The result should look different

Here is the same message, dispatched through the same JavaScript call, on both platforms:

<figure class="shots">
<img src="/blog/bolsillo-dialog-ios.png" alt="The iOS system confirm dialog over the savings app" />
<img src="/blog/bolsillo-dialog-android.png" alt="The Android system confirm dialog over the same screen" />
</figure>

Frosted panel with stacked buttons on one, opaque sheet with right-aligned text buttons on the other. Different button order, different typography, different everything.

This is the outcome you want, and it is worth saying because the instinct when you own both implementations is to make them match. A user's confirmation dialog should look like their operating system's confirmation dialog. What has to be identical is the contract: same question, same two outcomes, same promise resolving to the same boolean. The chrome should be native, and native means different.

## The part to write down

The type contract is generated and enforced perfectly. The behaviour contract is prose, nothing enforces it, and it is the only one where two platforms drift apart.

So the README is not documentation of the library, it is part of the library. Denial resolves rather than rejects, a second dialog rejects rather than hangs, the delegate is borrowed rather than taken. Each of those is a decision that a compiler will never check and a second implementer will otherwise make differently.

Write it before the second platform, not after. I did it after, and every "wait, what does iOS do here" cost a trip back through code I had written by feel two days earlier.

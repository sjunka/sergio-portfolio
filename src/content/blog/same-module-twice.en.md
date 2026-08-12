---
title: Writing the same native module twice tells you what your spec left out
date: 2026-08-11
summary: Codegen gave me a typed TurboModule for free. It had nothing to say about denied permissions, double-tapped dialogs, or who owns the notification delegate.
tags: react-native, native-modules
---

I wrote a small React Native library that does two things: open the system confirm dialog, and fire a local notification when a savings goal is completed. The TypeScript spec is eleven lines:

```ts
export interface Spec extends TurboModule {
  showConfirmDialog(title: string, message: string): Promise<boolean>
  notifyGoalCompleted(goalName: string): Promise<void>
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnSavingsNotifier')
```

Codegen turns that into the native interfaces on both platforms and the type-safe glue between them. It's genuinely good. It also means that when I finished the Swift implementation I believed I was most of the way done, and then I wrote the Kotlin one and found out how much of the contract had never been written down anywhere.

## The spec says Promise, the platform says it depends

`notifyGoalCompleted` returns `Promise<void>`. What happens when the user has denied notification permission?

Nothing in that type answers it. Rejecting is defensible: the caller asked for a notification and did not get one. Resolving is also defensible: a permission the user denied is not an error, it's a choice they already made, and the caller cannot do anything useful with the rejection except swallow it.

I resolved. The goal is still complete, this one channel just stays quiet. What matters is that I made the same call twice, and that the reasoning lives in the README instead of in my head, because the two implementations do not resemble each other at all:

```swift
case .denied:
  // Denegado en un intento previo: mismo comportamiento documentado.
  resolve(nil)
```

```kotlin
if (!manager.areNotificationsEnabled()) {
  // Notificaciones desactivadas para la app: mismo comportamiento
  // documentado que un permiso denegado.
  promise.resolve(null)
  return
}
```

iOS gives you an `authorizationStatus` enum with five cases. Android 13 and up gives you a runtime permission you have to request through a `PermissionAwareActivity`, plus a separate app-level "notifications are off" switch that is not a permission at all. Two platforms, three ways to say no, one behavior the JavaScript caller sees.

## The promise that never resolves

`showConfirmDialog` returns `Promise<boolean>`. Users double-tap buttons. What happens on the second call while the first dialog is still up?

On iOS, UIKit refuses to present a view controller on top of one that is already presenting, and it does it silently. No exception, no callback, nothing. The second promise just never settles, and the caller waits forever with a spinner. Android stacks a second `AlertDialog` over the first, which is not a hang but is not what anyone wanted either.

Same guard on both sides:

```swift
guard !self.isPresentingDialog else {
  reject("DIALOG_ALREADY_PRESENTED", "Ya hay un diálogo presentado; esperá a que se resuelva.", nil)
  return
}
```

I only found this because writing the Android version made me ask "what does this do if it's called twice," and once I had asked it I had to go back and ask it of the Swift code too. The second implementation is a review of the first, done by someone who cannot skim.

## The delegate you are quietly stealing

To show a notification while the app is in the foreground on iOS, something has to implement `UNUserNotificationCenterDelegate`. `UNUserNotificationCenter` accepts exactly one delegate. My library takes it in its initialiser.

That means any app that installs this library and had its own delegate registered for push notifications loses it, silently, and finds out in production. So the library keeps a weak reference to whoever was there first and forwards `willPresent` to them if they respond to it:

```swift
private weak var previousNotificationDelegate: UNUserNotificationCenterDelegate?
```

Android has no equivalent problem. `NotificationManager` is not a single-delegate API, so nothing to steal and nothing to give back. I would never have noticed the iOS hazard from the spec, and I would never have noticed it was iOS-specific if I had only shipped iOS.

The asymmetries that survived into the final code are all like this: they live in the platform, not in the contract. Android needs a request code per permission request so a late callback from an earlier request cannot resolve the wrong promise. Android needs an incrementing notification id so two goals completed in one session do not overwrite each other in the tray. iOS needs neither and gets a `UUID` per request instead.

## What I would do differently

Write the README before the second platform, not after. By the time I got to Kotlin I was implementing behavior I had decided in Swift by feel, and half of it was undocumented. Every "wait, what does iOS do here" cost a trip back through the Swift file.

The TypeScript spec is the type contract and codegen enforces it perfectly. The behavior contract is prose, nothing enforces it, and it's the one where two platforms actually drift apart. Nothing about permissions, re-entrancy, or delegate ownership is expressible in `Promise<void>`.

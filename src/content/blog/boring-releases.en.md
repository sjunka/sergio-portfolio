---
title: The best mobile release is the one nobody notices
date: 2026-06-05
summary: Ten years of App Store submissions taught me that release quality is a process property, not a testing phase.
tags: process, mobile
---

Web teams ship a bad deploy and roll it back in four minutes. Mobile teams ship a bad build and wait a day and a half for review, while the crash rate graph does something upsetting in front of the whole company. Every release habit worth having comes from that asymmetry.

## Cut the branch on a schedule, not when the work is done

If the release date moves because a feature isn't ready, then every feature is now negotiating with the release, and the release always loses. Pick a day. Cut the branch on that day. Whatever is merged and behind a flag goes out, whatever isn't waits for the next one. This sounds rigid until the first time a stakeholder asks to "just squeeze this in" and the answer is a date rather than an argument.

## Feature flags are how you get to roll back

You cannot un-ship a binary. You can turn something off inside a binary you already shipped. That's the entire reason flags earn their complexity on mobile, and it's why the flag has to be checked at the point of use rather than read once at launch:

```ts
// A user who launched the app before you flipped the kill switch
// keeps the broken screen for their whole session.
const showNewCheckout = flags.get('new-checkout')

// Reads current state, so the kill switch actually kills.
function Checkout() {
  const showNew = useFlag('new-checkout')
  return showNew ? <NewCheckout /> : <LegacyCheckout />
}
```

Every flag needs a removal ticket filed the day it's created. A flag left in for two years isn't a flag, it's a branch in your codebase that nobody has the confidence to delete.

## Staged rollout is not optional and 1% is not enough

Both stores let you release to a fraction of users. Use it, but be honest about the arithmetic: 1% of a small user base is a sample too small to show you anything before you've already gone to 100%. I'd rather do 10% for 24 hours and actually see the crash-free rate move than 1% for an hour and call it a canary.

Know which number aborts the rollout, and know it before you start. "Crash-free sessions below 99.5%, we halt" is a decision. "We'll watch it and see" is how you find out on Monday.

## Version the build, not the sprint

Put the commit SHA in a settings screen where support can read it out loud. When a user reports something impossible, the first question is which build, and "the latest one" is never true. This costs an afternoon once and saves you every time.

## The part that's cultural

None of the above works if a release is an event. If shipping requires three people to stay late, you will ship less often, each release will carry more change, and each release will be riskier, which makes the next one an even bigger event. The way out is boring: ship smaller things more often until it stops being interesting.

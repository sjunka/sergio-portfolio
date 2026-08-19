---
title: Parallel agents need file ownership, not better prompts
date: 2026-08-19
summary: Three agents on three branches only stay out of each other's way when every file has exactly one owner and every cross-branch call is a signature agreed before either side is written.
tags: process, architecture
---

Put three coding agents on the same repository at the same time and the failure is never that one of them wrote bad code. It is that two of them wrote good code into the same file, and the merge is now a judgement call that neither of them is around to make.

The instinct is to fix this by prompting harder. Tell each agent what it is working on, tell it to stay in its lane, remind it that other people exist. That does not work, because a lane is not a topic. It is a set of paths on disk. A topic-shaped instruction like "you own the dashboard" leaves every shared module ambiguous, and shared modules are where the collisions actually happen. The dashboard needs to know whether generation is switched off. So does the route that generates. Who writes `lib/settings.js`?

## Split the work by file, not by user story

A task breakdown generated from a specification comes out story-shaped by default. One phase per feature slice, each slice touching whatever it needs. It reads beautifully and it is unmergeable, because a story is a vertical cut: it reaches through the screen, the route, the library and the database, which is exactly the set of files the next story also reaches through. Two verticals over the same stack always meet in the middle.

So cut horizontally. Every phase declares two lists, what it owns and what it never touches, and no path is allowed to appear in two owned lists. That constraint is the whole mechanism. Everything else is bookkeeping.

<figure>
<svg viewBox="0 0 640 266" role="img" aria-label="One blocking foundation phase fanning out into three parallel phases with disjoint file ownership, then a merge phase">
  <defs>
    <marker id="fo-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="fo-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="170" y="0" width="300" height="48" rx="6" class="dg-node-accent"/>
  <text x="320" y="20" text-anchor="middle" class="dg-t">Phase 1, the base</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">owns everything the others do not, and blocks them all</text>
  <path d="M320 48 V68 H106 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <path d="M320 48 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <path d="M320 48 V68 H534 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <rect x="8" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="106" y="118" text-anchor="middle" class="dg-t">Phase 2, the screens</text>
  <text x="106" y="137" text-anchor="middle" class="dg-s">app/capture, app/result</text>
  <text x="106" y="151" text-anchor="middle" class="dg-s">components/capture, hooks/</text>
  <text x="106" y="165" text-anchor="middle" class="dg-s">proxy.js</text>
  <rect x="222" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="320" y="118" text-anchor="middle" class="dg-t">Phase 3, the backend</text>
  <text x="320" y="137" text-anchor="middle" class="dg-s">lib/db, lib/blob</text>
  <text x="320" y="151" text-anchor="middle" class="dg-s">lib/higgsfield</text>
  <text x="320" y="165" text-anchor="middle" class="dg-s">app/api/image, app/api/video</text>
  <rect x="436" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="534" y="118" text-anchor="middle" class="dg-t">Phase 4, the dashboard</text>
  <text x="534" y="137" text-anchor="middle" class="dg-s">lib/settings, lib/models</text>
  <text x="534" y="151" text-anchor="middle" class="dg-s">app/api/settings</text>
  <text x="534" y="165" text-anchor="middle" class="dg-s">app/dashboard</text>
  <path d="M106 184 V206 H320 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <path d="M320 184 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <path d="M534 184 V206 H320 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <rect x="170" y="222" width="300" height="44" rx="6" class="dg-node-accent"/>
  <text x="320" y="242" text-anchor="middle" class="dg-t">Phase 5, the merge</text>
  <text x="320" y="258" text-anchor="middle" class="dg-s">stubs collide with real files, the real one wins</text>
</svg>
<figcaption>The three middle phases never wait on each other because no filename in one box appears in another. Phase 1 is the only serialised part of the schedule, and it is short on purpose.</figcaption>
</figure>

Thirty nine tickets came out of this split across five phases, and three of the phases ran at once on three branches. The scheduling gain is real but it is the smaller half of the benefit. The larger half is that a merge conflict becomes a signal rather than a chore: if two branches touch the same file, somebody violated the ownership table, and that is a design problem worth stopping for.

There is a cost, and it is paid up front. Somebody has to sit with the design long enough to know which files exist before any of them do, and a list that is wrong in the third week is expensive to renegotiate across three branches. This is work a story-shaped breakdown lets you defer, which is why story-shaped breakdowns are popular.

## The part everyone skips: pin the contract first

Ownership tells a phase what it may write. It says nothing about what a phase is allowed to call. Phase 3 needs `getSettings` from Phase 4 on day one, and Phase 4 has not started.

So the signature is agreed before either side exists, and written down where both can see it:

```js
// lib/settings.js
export const getSettings = async () => ({ enabled: boolean, videoQuality: string })
export const assertEnabled = async () => void  // throws, .status = 503
export const isOwner = (userId) => boolean     // userId === process.env.OWNER_ID
```

That is not documentation. It is the interface both branches build against, one by implementing it and one by calling it, and it is the reason they meet at the merge instead of negotiating during it. Every cross-phase call in the plan got a line like this before any code was written. The ones I forgot to pin are the ones that produced arguments later.

## A mock cannot mock a file that does not exist

Here is the detail that cost me an afternoon and is worth the price of the whole approach.

The consuming branch writes against `lib/settings.js` and mocks it in tests. Except Vitest resolves ES imports against the real filesystem before `vi.mock` ever runs, so mocking a path with nothing behind it fails at resolution with an unhelpful message about a missing module. The mock never gets a chance.

<figure>
<svg viewBox="0 0 640 145" role="img" aria-label="A pinned contract becomes a stub file on disk, which the merge replaces with the real implementation">
  <defs>
    <marker id="ct-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="8" y="10" class="dg-m">PINNED BEFORE EITHER SIDE IS WRITTEN</text>
  <rect x="8" y="20" width="180" height="64" rx="6" class="dg-node"/>
  <text x="98" y="43" text-anchor="middle" class="dg-t">The contract</text>
  <text x="98" y="60" text-anchor="middle" class="dg-s">getSettings() returns</text>
  <text x="98" y="73" text-anchor="middle" class="dg-s">enabled and videoQuality</text>
  <path d="M188 52 H216" class="dg-flow" marker-end="url(#ct-head)"/>
  <rect x="230" y="20" width="180" height="64" rx="6" class="dg-node"/>
  <text x="320" y="43" text-anchor="middle" class="dg-t">A stub on disk</text>
  <text x="320" y="60" text-anchor="middle" class="dg-s">one file, that signature</text>
  <text x="320" y="73" text-anchor="middle" class="dg-s">// stub, Phase 4 replaces</text>
  <path d="M410 52 H438" class="dg-flow" marker-end="url(#ct-head)"/>
  <rect x="452" y="20" width="180" height="64" rx="6" class="dg-node-accent"/>
  <text x="542" y="43" text-anchor="middle" class="dg-t">The merge</text>
  <text x="542" y="60" text-anchor="middle" class="dg-s">the collision is expected</text>
  <text x="542" y="73" text-anchor="middle" class="dg-s">and the real file wins</text>
  <path d="M320 84 V100" class="dg-flow-dashed" marker-end="url(#ct-head)"/>
  <rect x="230" y="106" width="180" height="38" rx="6" class="dg-node-warn"/>
  <text x="320" y="122" text-anchor="middle" class="dg-s">Vitest resolves the import</text>
  <text x="320" y="136" text-anchor="middle" class="dg-s">before vi.mock ever runs</text>
</svg>
<figcaption>The stub exists so the module can be resolved, not so it can be used. Every test overrides it, and nothing in the branch depends on the body it ships with.</figcaption>
</figure>

So "mock it until the other branch lands" means writing a physical file at that exact path, with the pinned signature and a comment saying which phase replaces it. The merge is then told to expect that collision and keep the implementation. It sounds fussy until you notice it is the only way a branch can run its own suite on its first minute rather than its last.

## What this does not fix

Ownership stops two writers from touching one file. It does nothing about a phase that implements the contract differently from how the contract reads, and nothing about a contract that was wrong when it was pinned. Those still land at the merge, at full price. The tables only guarantee that when the merge goes badly, it goes badly for a reason somebody can name.

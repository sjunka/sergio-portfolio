---
title: A spec an agent can build is one that pins what it would otherwise guess
date: 2026-08-25
summary: The lines of a specification that earn their length describe the shape of things the code cannot see, because a mock written from the calling code agrees with it perfectly and is wrong in the same way.
tags: process, architecture
---

A specification detailed enough for a competent person is not detailed enough for an agent, and the gap is not in the requirements. Requirements are the easy part. Both a person and a machine can read "the user photographs something and gets a short video back" and build roughly the right thing.

The gap is in shapes. Every place the code meets something it did not write, a third party API, a driver's caching behaviour, a framework file that changed name between versions, there is a fact that cannot be derived from the codebase. A person notices the uncertainty and goes looking. An agent fills it with the most plausible value and keeps going, and plausible is usually close enough to compile.

## The mock that agrees with the bug

The generation provider returns a status document. The obvious guess for the image field is an array of URLs. What it actually sends is an array of objects:

```js
// The guess. Reads fine, compiles, matches the test.
const url = status.images[0]

// What the provider sends.
{ images: [{ url: "https://..." }], video: { url: "https://..." } }
```

That is a one character fix and it is not the interesting part. The interesting part is that this shipped past a full green test suite, twice, with two different agents, because whoever writes the consuming code also writes the double. The mock returned `images: ["https://..."]` and the code read `images[0]`, and they agreed with each other completely. The suite was proving the code consistent with a provider that does not exist.

The reason this survives review is that nothing about it looks wrong. There is no failing test to investigate and no warning in the log. The suite is green, the coverage is high, and the only artefact of the mistake is a number of passing assertions about a fiction. Type checking would not have caught it either, because the fiction was internally consistent.

A double is a claim about a system you do not control. It should be written from a recorded response, not from the function that consumes it, and the assertion belongs in the spec so that neither half of the pair can drift toward the other. Ours now says it in one line: the provider wraps its assets, read `status.images?.[0]?.url` and `status.video?.url`, never the bare element.

## The loop that runs out and says nothing

The second one is a class of bug rather than a shape, and it is worse because it never fails where it happens.

<figure>
<svg viewBox="0 0 640 176" role="img" aria-label="The generation pipeline from photo to stored asset, with the provider poll marked as the risky step">
  <defs>
    <marker id="pp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="10" y="12" class="dg-m">TWO REAL RUNS LANDED AT 59S AND 115S</text>
  <rect x="10" y="24" width="140" height="52" rx="6" class="dg-node"/>
  <text x="80" y="46" text-anchor="middle" class="dg-t">Photo</text>
  <text x="80" y="63" text-anchor="middle" class="dg-s">a data: URL from the phone</text>
  <path d="M150 50 H166" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="170" y="24" width="140" height="52" rx="6" class="dg-node"/>
  <text x="240" y="46" text-anchor="middle" class="dg-t">Blob storage</text>
  <text x="240" y="63" text-anchor="middle" class="dg-s">a public URL, not bytes</text>
  <path d="M310 50 H326" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="330" y="24" width="140" height="52" rx="6" class="dg-node-warn"/>
  <text x="400" y="46" text-anchor="middle" class="dg-t">Provider poll</text>
  <text x="400" y="63" text-anchor="middle" class="dg-s">every 2s, 60 attempts</text>
  <path d="M470 50 H486" class="dg-flow" marker-end="url(#pp-head)"/>
  <rect x="490" y="24" width="140" height="52" rx="6" class="dg-node-accent"/>
  <text x="560" y="46" text-anchor="middle" class="dg-t">Stored, recorded</text>
  <text x="560" y="63" text-anchor="middle" class="dg-s">one row per asset</text>
  <path d="M400 76 V104" class="dg-flow-dashed" marker-end="url(#pp-head)"/>
  <rect x="290" y="110" width="220" height="60" rx="6" class="dg-node-warn"/>
  <text x="400" y="128" text-anchor="middle" class="dg-s">attempts exhausted, throw</text>
  <text x="400" y="142" text-anchor="middle" class="dg-s">"Image provider timed out"</text>
  <text x="400" y="156" text-anchor="middle" class="dg-s">no URL on a done response, throw too</text>
</svg>
<figcaption>The ceiling is 120 seconds against a queue that has been observed to sit idle for 45 before it starts. The headroom here is seconds, and knowing that is what makes it a decision rather than an accident.</figcaption>
</figure>

The poll is written as a bounded loop, which is correct. What the loop does when it runs out is the whole question:

```js
// Exits the loop, reads a status that never became ready,
// and dies inside fetch(undefined) three frames away.
for (let i = 0; i < 60; i++) { ... }
return fetch(status.images[0].url)

// Fails where it failed, with the cause in the message.
throw new Error("Image provider timed out")
```

Falling out of the bottom converts a timeout into a null dereference, and the stack trace then points at the fetch helper, which is innocent. An hour of debugging goes to the wrong file. The rule is small enough to fit in a spec line: a bounded wait throws when the bound is reached, and a value read after a wait is checked before it is used.

## Write the number you measured, not the one you want

The temptation in a plan is to state a target as though it were a guarantee. First image on screen in ninety seconds sounds like an assertion. It is not one, because the provider's queue is shared and nobody on my side controls it.

What went into the plan instead was the measurement: the queue sits up to 45 seconds before work starts, two real runs finished at 59 and 115 seconds, the client gives it 120, so the margin is seconds rather than minutes. That is written down as a known ceiling with the upgrade path next to it. An agent reading a target will build to the target and be surprised. An agent reading a measured range and a named ceiling will write the timeout branch, because the document just told it the timeout branch is reachable.

## The shape of a spec that survives contact

Three quarters of what makes a specification buildable without a human in the loop is not novel. Screens, routes, data model, all of it is ordinary work anyone would write down. The quarter that decides whether it works is the part describing the world outside the repository: the exact response body, the behaviour at the boundary of a bounded wait, the numbers somebody actually observed, and the traps that already cost an hour each.

Those lines look like trivia in a document review. They are the only lines an agent could not have written for itself.

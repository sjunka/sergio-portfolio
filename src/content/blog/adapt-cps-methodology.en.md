---
title: A process model where the contract exists before the code
date: 2026-08-15
summary: Six phases for building a self-adaptive cyber-physical system, built around one structural idea: the team's feedback loop and the system's feedback loop run at wildly different speeds and must not be confused.
tags: cyber-physical, process
---

Having argued that agile and waterfall both miss what a cyber-physical adaptive system needs, I owed the room an actual answer. This is it: ADAPT-CPS, six phases plus a preparation step, aimed at multi-team projects where software, hardware and safety all have to move at once.

The shape of it comes from one observation. A self-adaptive system contains two feedback loops with about nine orders of magnitude between them, and almost every methodology failure I could find came from treating them as one.

<figure>
<svg viewBox="0 0 640 400" role="img" aria-label="Six phases with an iteration zero, and two feedback paths returning from adaptive operation">
  <defs>
    <marker id="ph-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ph-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="0" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="20" class="dg-t">1 &#183; Level-zero global specification</text>
  <text x="16" y="35" class="dg-s">rules, quality attributes, context map. Defined once.</text>
  <path d="M175 46 V56" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="58" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="78" class="dg-t">2 &#183; Decomposition into domains</text>
  <text x="16" y="93" class="dg-s">one team per domain, recursive when a domain is too big</text>
  <path d="M175 104 V114" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="116" width="350" height="44" rx="8" class="dg-node-warn"/>
  <text x="16" y="136" class="dg-t">Iteration zero</text>
  <text x="16" y="151" class="dg-s">riskiest scenario, contracts made concrete, CI standing up</text>
  <path d="M175 162 V172" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="174" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="194" class="dg-t">3 &#183; Minimum functional skeleton</text>
  <text x="16" y="209" class="dg-s">the adaptation loop is born here, end to end, minimal</text>
  <path d="M175 220 V230" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="232" width="350" height="44" rx="8" class="dg-node-accent"/>
  <text x="16" y="252" class="dg-t">4 &#183; Incremental multi-team growth</text>
  <text x="16" y="267" class="dg-s">parallel, against the contract, on simulators</text>
  <path d="M175 278 V288" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="290" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="310" class="dg-t">5 &#183; Verification, integration, deployment</text>
  <text x="16" y="325" class="dg-s">contract tests, then the twin, then the metal</text>
  <path d="M175 336 V346" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="348" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="368" class="dg-t">6 &#183; Adaptive operation</text>
  <text x="16" y="383" class="dg-s">the loop runs continuously, on its own</text>
  <path d="M350 370 H420 V254 H358" class="dg-flow-accent" marker-end="url(#ph-head-a)"/>
  <text x="432" y="290" class="dg-m">EVERY CYCLE</text>
  <text x="432" y="306" class="dg-s">what the system learns in</text>
  <text x="432" y="319" class="dg-s">operation feeds the next</text>
  <text x="432" y="332" class="dg-s">growth increment.</text>
  <path d="M350 370 H570 V22 H358" class="dg-flow-dashed" marker-end="url(#ph-head)"/>
  <text x="432" y="52" class="dg-m">RARE</text>
  <text x="432" y="68" class="dg-s">only when a level-zero rule</text>
  <text x="432" y="81" class="dg-s">stops holding. That is a</text>
  <text x="432" y="94" class="dg-s">baseline change and needs</text>
  <text x="432" y="107" class="dg-s">formal review by every</text>
  <text x="432" y="120" class="dg-s">affected domain.</text>
</svg>
<figcaption>The solid return path is the normal one and it is short. The dashed one reaches all the way back to the founding agreement, and making it expensive on purpose is what keeps that agreement worth having.</figcaption>
</figure>

## The founding agreement is made once

Phase 1 puts the leads of every domain in one room to define, collaboratively and once, three things: the business rules, the quality attributes of the whole system, and the context map with the integration contracts between domains.

The word doing the work there is once. This level is meant to stay stable for the life of normal development. If it moves every quarter it was never a baseline, it was a backlog, and every downstream team has been building against sand.

Phase 2 turns the context map into an org chart. Each functional domain gets a responsible team, and when a domain turns out to be too broad the same pattern repeats inside it: subdomains with their own internal contract, always subordinate to the global one. Two questions get answered here and nowhere else. What are the pieces, and how do they relate.

## Iteration zero exists because three decisions block everything else

Before construction starts, three things get decided, and each one is a common cause of a stalled project when skipped.

Which scenario to build first. The criterion is not business value, it is early uncertainty reduction: pick the scenario that is simultaneously the simplest and the riskiest. The one that will teach you the most about whether the architecture survives contact with the physical world.

Contracts get lowered from concept to reality. The context map from phase 1 says two domains exchange a commanded setpoint. Iteration zero says exactly which schema, which format, which protocol, which units. Until that happens, "we agreed on the contract" is a shared feeling rather than something two teams can build against.

And the shared infrastructure goes up: repositories, test environments, the first continuous integration channel. Not because tooling is exciting, but because a phase-4 team that has to invent its own pipeline will invent a different one, and integration will pay for it later.

## The loop is born in phase 3, and it is born whole

Phase 3 is the smallest interesting phase. Each team builds its own smallest real slice of the chosen scenario, with real components or temporary simulators.

What makes it a phase rather than a milestone is what appears at the end of it: a complete monitor, analyze, plan and execute cycle, running end to end, however minimally. There is no earlier version of that loop. This is where it starts existing.

That ordering matters. A loop assembled at the end from four independently built stages tends to discover, very late, that the monitor's sampling rate cannot support the plan's decision window. Building it thin and whole first makes that a phase-3 problem instead of a phase-5 catastrophe.

## Phase 4 is where the contract earns its keep

Each team grows its part in parallel, keeping its own internal way of working, which is deliberate: a mechatronics group and an embedded software group should not be forced onto the same ceremony.

The mechanism that lets them move without blocking each other is the contract defined before anyone wrote code. Each side builds against the interface and uses simulators until both are ready to integrate with the real physical component. Coordination between teams happens at periodic synchronisation points rather than continuously, because continuous coordination between six teams is just a meeting.

Phase 5 is the automated gate: integrate everyone's work, run the contract conformance tests, validate the enriched loop against the digital twin where one exists, and only then deploy to the physical environment. The twin is not a nice-to-have in that sentence. It is the step that makes deploying to real equipment a decision rather than a gamble.

## Two clocks, and the reason to keep them apart

Phase 6 is the system operating and adapting on its own. And here is the structural point of the whole model.

<figure>
<svg viewBox="0 0 640 160" role="img" aria-label="Two timelines at very different frequencies: the team's increments and the system's runtime adaptation">
  <defs>
    <marker id="cl-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="0" y="30" class="dg-m">TEAM CLOCK</text>
  <path d="M0 52 H628" class="dg-flow" marker-end="url(#cl-head)"/>
  <path d="M0 44 V60 M156 44 V60 M312 44 V60 M468 44 V60 M624 44 V60" class="dg-flow"/>
  <text x="78" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="234" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="390" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="546" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="0" y="76" class="dg-s">closes against the simulator &#183; CI on every commit &#183; hardware-in-the-loop every second increment</text>
  <text x="0" y="112" class="dg-m">SYSTEM CLOCK</text>
  <path d="M0 130 H628" class="dg-flow-accent" marker-end="url(#cl-head)"/>
  <path d="M0 124 V136 M12 124 V136 M24 124 V136 M36 124 V136 M48 124 V136 M60 124 V136 M72 124 V136 M84 124 V136 M96 124 V136 M108 124 V136 M120 124 V136 M132 124 V136 M144 124 V136 M156 124 V136 M168 124 V136 M180 124 V136 M192 124 V136 M204 124 V136 M216 124 V136 M228 124 V136 M240 124 V136 M252 124 V136 M264 124 V136 M276 124 V136 M288 124 V136 M300 124 V136 M312 124 V136 M324 124 V136 M336 124 V136 M348 124 V136 M360 124 V136 M372 124 V136 M384 124 V136 M396 124 V136 M408 124 V136 M420 124 V136 M432 124 V136 M444 124 V136 M456 124 V136 M468 124 V136 M480 124 V136 M492 124 V136 M504 124 V136 M516 124 V136 M528 124 V136 M540 124 V136 M552 124 V136 M564 124 V136 M576 124 V136 M588 124 V136 M600 124 V136 M612 124 V136 M624 124 V136" class="dg-flow-accent"/>
  <text x="0" y="152" class="dg-s">the loop adapting in milliseconds, continuously, with nobody in the room</text>
</svg>
<figcaption>Not a metaphor. These are the two rates at which the system changes, and the same drawing at true scale would put roughly a billion ticks on the lower line per tick of the upper one.</figcaption>
</figure>

Confusing them is the classic mistake, and it goes in both directions. Teams promise runtime adaptiveness and deliver a sprint cadence, so the system waits for humans to notice a problem. Or they treat every runtime adaptation as feedback the backlog must respond to, and drown.

Keeping them apart is what the last phase encodes. What phase 6 learns feeds phase 4, the next growth increment: normal, frequent, cheap. Only in the exceptional case where a level-zero rule has stopped being true does that feedback reach phase 1, and then it is explicitly a change of baseline requiring formal review by the leads of every affected domain.

Two return paths, deliberately different costs. That is the part I would defend hardest if only one idea survived: the founding agreement is only worth having if going back to it is expensive, and the growth loop is only worth having if going back to it is not.

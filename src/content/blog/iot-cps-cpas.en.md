---
title: IoT measures, a CPS acts, a CPAS rewrites how it acts
date: 2026-07-30
summary: The three get used interchangeably and they are not the same system. The difference is where the value ends, and it decides your whole architecture.
tags: cyber-physical, architecture
---

I spent a few weeks researching cyber-physical adaptive systems for a methodology proposal, and the single most useful hour was the one where the vocabulary stopped being a synonym pile. Vendors, papers and job posts use IoT, CPS and CPAS as if they were the same thing with different amounts of marketing. They describe three architectures with three different failure modes.

The distinction that holds up is not about sensors or protocols. It is about where the value of the system ends.

<figure>
<svg viewBox="0 0 640 258" role="img" aria-label="Three lanes comparing where value ends in IoT, CPS and CPAS systems">
  <defs>
    <marker id="ic-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ic-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <text x="0" y="40" class="dg-m">IOT</text>
  <rect x="76" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="41" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 36 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="41" text-anchor="middle" class="dg-t">Transmit</text>
  <path d="M310 36 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="41" text-anchor="middle" class="dg-t">Report</text>
  <text x="456" y="32" class="dg-s">Value ends in the data:</text>
  <text x="456" y="46" class="dg-s">a dashboard, an alert.</text>
  <text x="0" y="116" class="dg-m">CPS</text>
  <rect x="76" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="117" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 112 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="117" text-anchor="middle" class="dg-t">Decide</text>
  <path d="M310 112 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="117" text-anchor="middle" class="dg-t">Actuate</text>
  <text x="456" y="108" class="dg-s">Value ends in the world:</text>
  <text x="456" y="122" class="dg-s">a valve moves.</text>
  <text x="0" y="196" class="dg-m">CPAS</text>
  <rect x="76" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="128" y="197" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 192 H200" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="204" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="256" y="197" text-anchor="middle" class="dg-t">Decide</text>
  <path d="M310 192 H328" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="332" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="384" y="197" text-anchor="middle" class="dg-t">Actuate</text>
  <path d="M384 211 V234 H256 V216" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <text x="320" y="250" text-anchor="middle" class="dg-m">THE DECIDE STEP REWRITES ITSELF AT RUNTIME</text>
  <text x="456" y="188" class="dg-s">Value ends in a system</text>
  <text x="456" y="202" class="dg-s">that changed itself.</text>
</svg>
<figcaption>The same three boxes. What differs is whether anything comes back, and whether what comes back is data or a new decision rule.</figcaption>
</figure>

An IoT deployment measures, transmits and reports. Its output is telemetry, and a human or a fixed rule decides what to do with it. A cyber-physical system closes the loop: sensors capture temperature or pressure or movement, algorithms pick a response given goals and constraints, actuators change the physical process, and the system measures the result to adjust on the next pass. Its output is a movement.

A cyber-physical adaptive system adds one condition, and it is the expensive one. The decision logic itself changes at runtime, without recompiling and without redeploying. The system is not executing a policy someone shipped. It is executing a policy it currently holds, which may not be the one that was installed.

## Each generation solved something and left something

Reading the field chronologically is more useful than reading it by vendor, because every stage is a direct answer to what the previous one could not do.

| Stage | Dominant approach | What it left open |
| --- | --- | --- |
| Classic embedded | Deterministic control, monolithic firmware | Closed. It does not evolve. |
| IoT, the 2010s | Connectivity and cloud, telemetry | Connecting is not adapting. Silos per vendor. |
| CPS | Joint modelling of the physical and the computational | Integration complexity |
| Self-adaptive CPS | Software control loops, MAPE-K, autonomic computing | Hard to verify, hard to guarantee |
| Current frontier | Learned adaptation, digital twins, LLMs in the decision loop | Explainability, safety, non-determinism |

That last row is the one worth staring at. The capability is here. Adaptation driven by learning works, ships, and is in production in several industries. What is missing is not the mechanism. It is any accepted way to verify what it will do, or to explain what it just did.

## Four gaps, and only one of them is a research problem

Across the current work, four things are consistently missing, and it is worth separating them because they do not have the same kind of answer.

Commercial ecosystems are reactive rather than adaptive. A smart home that runs "if motion, then light" is automating a rule a human wrote. Nothing in it learns, and calling it adaptive is a category error that quietly sets expectations no product meets.

When behaviour genuinely does change, the user gets no answer to why. Adaptation without explanation is indistinguishable from a bug, and users treat it as one. This is the research problem of the four, and it is not close to solved.

There is design guidance for adaptive CPS and almost nothing on how to develop one in a disciplined way. Plenty of papers describe what the architecture should look like. Very few describe who does what, in which order, with which artifacts, and how you know a stage is done. That gap is a methodology gap, not a technology gap, which means it can be closed by deciding rather than by discovering.

And the domain logic ends up welded to the hardware protocol. The rule that says when a pump should slow down lives inside the code that speaks Modbus to the pump. Change the pump, rewrite the rule. This one is the most ordinary and the most fixable: it is the same coupling problem application developers solved years ago with ports and adapters, applied to a boundary that happens to be physical.

## Why the distinction is not academic

If you are building the IoT version, your risk is data loss and your hardest question is fleet management.

If you are building the CPS version, your risk is that a wrong decision moves something heavy, and your hardest question is verification of a fixed policy.

If you are building the CPAS version, your risk is that the policy you verified is not the policy running right now, and your hardest question is how to bound what the system is allowed to become. That is a different job. Runtime assurance, safe envelopes and contracts that constrain the adaptation stop being nice architecture and start being the thing that keeps the system certifiable.

Three words, three risk models. Picking the wrong one at the start means the whole verification strategy is aimed at a system you are not building.

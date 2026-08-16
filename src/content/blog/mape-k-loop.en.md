---
title: MAPE-K, or how to keep adaptation out of your business logic
date: 2026-08-04
summary: A self-adaptive system has two jobs running at once: doing the work, and deciding how the work should be done. MAPE-K is the pattern that stops those two from merging.
tags: cyber-physical, architecture
---

The failure mode is easy to picture. A pump controller starts as one function that reads a sensor and sets a speed. Then somebody adds a rule for when the sensor is noisy. Then a fallback for when the network is down. Then a slower profile for night hours, and an override for maintenance mode. Six months later the function that controls the pump is mostly a function that decides which pump-controlling behaviour to use, and nobody can change either without touching the other.

MAPE-K exists to prevent exactly that. Proposed by IBM in 2003 as the core of autonomic computing, it is still the reference architecture for self-adaptive systems, and the reason it survived is not sophistication. It is that it draws one line: the logic that does the work and the logic that adapts the work are separate components, and they meet only through shared knowledge.

<figure>
<svg viewBox="0 0 640 282" role="img" aria-label="The MAPE-K loop reading and writing shared Knowledge, acting on a managed physical system, and validating plans against a digital twin">
  <defs>
    <marker id="mk-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="mk-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="32" width="118" height="214" rx="8" class="dg-node"/>
  <text x="59" y="126" text-anchor="middle" class="dg-t">Knowledge</text>
  <text x="59" y="144" text-anchor="middle" class="dg-s">models, goals,</text>
  <text x="59" y="158" text-anchor="middle" class="dg-s">history</text>
  <rect x="142" y="8" width="250" height="262" rx="10" class="dg-plate"/>
  <text x="142" y="0" class="dg-m">MANAGING SYSTEM</text>
  <rect x="162" y="32" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="52" class="dg-t">Monitor</text>
  <text x="178" y="67" class="dg-s">sensors, connectivity, load</text>
  <rect x="162" y="90" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="110" class="dg-t">Analyze</text>
  <text x="178" y="125" class="dg-s">state against quality goals</text>
  <rect x="162" y="148" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="168" class="dg-t">Plan</text>
  <text x="178" y="183" class="dg-s">a strategy, under deadline</text>
  <rect x="162" y="206" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="226" class="dg-t">Execute</text>
  <text x="178" y="241" class="dg-s">without stopping the system</text>
  <path d="M267 78 V86" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 136 V144" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 194 V202" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M120 54 H158" class="dg-flow-dashed"/>
  <path d="M120 112 H158" class="dg-flow-dashed"/>
  <path d="M120 170 H158" class="dg-flow-dashed"/>
  <path d="M120 228 H158" class="dg-flow-dashed"/>
  <text x="59" y="180" text-anchor="middle" class="dg-m">SHARED BY</text>
  <text x="59" y="192" text-anchor="middle" class="dg-m">ALL FOUR</text>
  <rect x="430" y="32" width="210" height="86" rx="8" class="dg-node"/>
  <text x="446" y="60" class="dg-t">Managed system</text>
  <text x="446" y="78" class="dg-s">the pump, the vehicle,</text>
  <text x="446" y="92" class="dg-s">the production cell. Never</text>
  <text x="446" y="106" class="dg-s">stops doing its own job.</text>
  <rect x="430" y="160" width="210" height="86" rx="8" class="dg-node-warn"/>
  <text x="446" y="188" class="dg-t">Digital twin</text>
  <text x="446" y="206" class="dg-s">an executable replica.</text>
  <text x="446" y="220" class="dg-s">The plan runs here before</text>
  <text x="446" y="234" class="dg-s">it runs on the metal.</text>
  <path d="M426 62 H404 V54 H378" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="398" y="40" text-anchor="middle" class="dg-m">READS</text>
  <path d="M376 228 H414 V100 H426" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="420" y="140" class="dg-m">ACTS</text>
  <path d="M376 170 H396 V200 H426" class="dg-flow" marker-end="url(#mk-head)"/>
  <text x="382" y="196" class="dg-m">SIMULATE</text>
</svg>
<figcaption>Four stages in order, one Knowledge every stage reads and writes, and a managed system that never stops running. The plan reaches the twin before it reaches the equipment.</figcaption>
</figure>

## The four stages are not four functions

Written out, MAPE-K sounds like a pipeline anyone would have invented: monitor, analyze, plan, execute. What makes it worth naming is that each stage has a distinct input, a distinct failure, and a distinct owner in a real team.

Monitor collects runtime state from the physical side: temperature, vibration, network connectivity, workload. Its failure is sampling that is too slow or too coarse to see the thing you are adapting to, and it is usually owned by whoever owns the hardware.

Analyze compares that state against defined quality goals, which is the stage most projects skip and later regret. Availability, safety and performance have to be written down as thresholds before this stage can exist at all. Without them, Analyze degrades into a pile of if-statements that encode goals nobody agreed on.

Plan produces a concrete strategy: reconfigure an industrial workflow, recalculate a route, drop to a degraded mode. In a cyber-physical setting it plans under hard time constraints, which rules out a lot of otherwise attractive search techniques.

Execute applies the change through the actuators while the system keeps operating. Not on restart, not in a maintenance window. That constraint is what makes Execute hard, and it is why the split matters: the managed system must be built so that its behaviour can be swapped underneath it.

Knowledge is the shared model all four read and write. Goals, current beliefs, history of past adaptations.

## The twin is the safety mechanism

In a normal software system the Plan stage can be optimistic, because a bad plan gets rolled back. In a cyber-physical one a bad plan moves several tonnes of something.

That is the reason a digital twin usually attaches to Knowledge rather than being a separate initiative. An executable replica of the physical system lets the loop simulate the adaptation and check it before it goes anywhere near the equipment. It converts an unbounded runtime risk into a bounded simulation cost, which is the only version of this that certifies.

The corollary is that the twin has to be maintained as part of the loop, not as a demo. A twin that drifts from the plant is worse than no twin, because it grants confidence it has not earned.

## One loop is the exception, not the rule

The textbook drawing shows a single central loop, and cyber-physical systems mostly cannot have one. Connectivity is intermittent, latency budgets are tight, and a controller that must reach a central brain to react is a controller that fails when the link does.

So decentralised MAPE-K is the normal shape: several loops, each local to a subsystem, coordinating with each other. They can share only the Monitor stage, or share Knowledge, or run fully independently with negotiated contracts at the edges. Choosing which pattern you are using is an architectural decision worth making explicitly and writing down, because the patterns differ in what they guarantee when a link drops, and that is the exact moment anyone will care.

## Where this meets ordinary application architecture

The fourth gap I keep running into in this field is that the domain rule gets welded to the hardware protocol. The logic that says a pump should slow down ends up inside the code that speaks Modbus to that specific pump.

MAPE-K does not fix that by itself. Hexagonal architecture does, and the two compose well: the loop is domain logic, the sensors and actuators sit behind ports, and the adapters are whatever hardware happens to be installed today.

<figure>
<svg viewBox="0 0 640 168" role="img" aria-label="The adaptation loop talking to a port, with three interchangeable adapters behind it">
  <defs>
    <marker id="hx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="56" width="150" height="56" rx="8" class="dg-node-accent"/>
  <text x="75" y="80" text-anchor="middle" class="dg-t">MAPE-K loop</text>
  <text x="75" y="96" text-anchor="middle" class="dg-s">pure domain logic</text>
  <path d="M154 84 H206" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="210" y="46" width="120" height="76" rx="8" class="dg-plate"/>
  <text x="270" y="78" text-anchor="middle" class="dg-t">Actuator port</text>
  <text x="270" y="94" text-anchor="middle" class="dg-s">an interface</text>
  <path d="M334 84 H384" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="388" y="10" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="34" class="dg-t">Modbus adapter</text>
  <rect x="388" y="65" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="89" class="dg-t">Simulator adapter</text>
  <rect x="388" y="120" width="200" height="38" rx="6" class="dg-node-warn"/>
  <text x="404" y="144" class="dg-t">Digital twin adapter</text>
  <path d="M370 29 V139" class="dg-flow"/>
  <path d="M370 29 H382" class="dg-flow" marker-end="url(#hx-head)"/>
  <path d="M370 139 H382" class="dg-flow" marker-end="url(#hx-head)"/>
</svg>
<figcaption>Same loop, three destinations. Testing against the simulator and validating against the twin stop being separate builds and become a swapped adapter.</figcaption>
</figure>

The payoff is not elegance. It is that "test the adaptation logic" stops requiring hardware, and "validate against the twin before deploying" stops being a manual step somebody remembers. Both become the same call against a different adapter, which is the only version of this that a team keeps doing after the third month.

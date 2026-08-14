---
title: Agile and waterfall both fail cyber-physical systems, from opposite ends
date: 2026-08-13
summary: One method ignores physics. The other cannot absorb uncertainty. Neither gap is fixable by tuning ceremonies, which is why the answer is a different process model.
tags: cyber-physical, process
---

Ask how a team should build a system where software controls physical equipment and adapts its own behaviour at runtime, and you get one of two answers. Run Scrum. Or run a V-model, because safety.

Both answers are given in good faith and both are wrong, in ways that turn out to be exact mirror images of each other. Understanding why is what justifies proposing a different process model rather than adjusting an existing one.

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Agile and rigid methods approaching from opposite ends and both stopping short of what a cyber-physical adaptive system needs">
  <defs>
    <marker id="gp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="94" y="56" text-anchor="middle" class="dg-t">Traditional agile</text>
  <text x="94" y="72" text-anchor="middle" class="dg-s">Scrum, Kanban, XP</text>
  <path d="M192 59 H236" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="452" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="546" y="56" text-anchor="middle" class="dg-t">Traditional rigid</text>
  <text x="546" y="72" text-anchor="middle" class="dg-s">Waterfall, V-model</text>
  <path d="M448 59 H404" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="244" y="14" width="152" height="90" rx="8" class="dg-plate"/>
  <text x="320" y="38" text-anchor="middle" class="dg-m">THE GAP</text>
  <text x="320" y="58" text-anchor="middle" class="dg-s">real-time physics</text>
  <text x="320" y="74" text-anchor="middle" class="dg-s">runtime adaptation</text>
  <text x="320" y="90" text-anchor="middle" class="dg-s">a living safety case</text>
  <text x="0" y="136" class="dg-t">Stops because it ignores the physical</text>
  <text x="0" y="156" class="dg-s">No latency budgets, no actuator limits, no</text>
  <text x="0" y="170" class="dg-s">certification evidence. Flexibility means the</text>
  <text x="0" y="184" class="dg-s">team can change its mind next Tuesday.</text>
  <text x="640" y="136" text-anchor="end" class="dg-t">Stops because it freezes too early</text>
  <text x="640" y="156" text-anchor="end" class="dg-s">Physics modelled once, in a document that</text>
  <text x="640" y="170" text-anchor="end" class="dg-s">ages. Software waits for hardware. Runtime</text>
  <text x="640" y="184" text-anchor="end" class="dg-s">variability is not contemplated at all.</text>
</svg>
<figcaption>Both arrows are travelling toward the same middle and neither one arrives. That middle is the entire problem space of a cyber-physical adaptive system.</figcaption>
</figure>

## Five dimensions where the two methods split

Laid out side by side, the failures are not random. Each method fails on the exact dimension the other handles, which is what makes "just combine them" so tempting and so unhelpful.

| Critical dimension | Traditional agile | Traditional rigid |
| --- | --- | --- |
| Real time and physics | Does not model latencies or physical limits | Models them, frozen in the opening document |
| Hardware and software co-design | Assumes the environment already exists | Sequential: software waits for the board |
| Runtime adaptation | Flexibility means changing requirements at the next meeting | Runtime variability is not contemplated |
| Safety and certification | Minimal documentation, the safety case does not exist | Certification as a closing phase, late and expensive |
| Cost of an error | Cheap, you revert a deploy | High, and that is why the whole cycle goes slow |

The last row explains the other four. Agile's speed is downstream of cheap mistakes: you can ship on Tuesday and revert on Wednesday because reverting costs a deploy. Waterfall's caution is downstream of expensive ones. Put software in charge of something heavy and errors become expensive again, so agile's economics stop holding. But make that software adapt at runtime and the specification cannot be frozen, so waterfall's economics stop holding too.

You end up needing a method that is cheap to iterate and rigorous about physical risk. Neither tradition offers both because neither ever had to.

## Four things a CPAS method has to do differently

The proposal I ended up defending is not a blend of the two. It is four commitments, each of which contradicts current practice in a specific way.

**Simulate first, instead of writing documents nobody executes.** Digital twins and SysML models let code be tested in a virtual environment, software-in-the-loop, before the hardware exists. The status quo is one of two failure modes: no documentation at all, or hundreds of pages of PDF that no pipeline ever runs. An executable model is documentation that fails a build when it stops being true.

**Co-design in parallel, for real.** Mechatronics, control and software advance simultaneously against validated simulators, under agreed maximum latencies. Today the honest description of most projects is that nobody writes control code until the board arrives, and then everything is late at once.

**Put the flexibility in the runtime, not in the meeting.** This is the one that separates a CPAS method from a normal one. The code is designed from the start to reconfigure itself when a sensor degrades or the environment changes unpredictably. In current practice, "we are flexible" means the team can change plan, which is a property of the organisation, not of the system. A system that needs a sprint planning session to adapt is not adaptive.

**Manage physical risk as a continuous metric.** Hardware-in-the-loop runs and the safety case are tracked continuously as part of the maturity of the system, not produced as a closing formality. The alternative is what everyone has watched happen: certification discovered late, and a redesign that costs more than the feature did.

## Why the answer had to be a process model

I resisted this conclusion for a while, because "the answer is a new methodology" is usually a bad smell.

What changed my mind is that the four commitments above are not technology. Digital twins exist. Simulation-in-the-loop exists. Runtime reconfiguration exists and ships in production. Safety cases are a mature practice with standards behind them.

What does not exist is an accepted answer to who does which of those, in what order, with what artifacts, and how a team knows a stage is finished. The literature is generous with guidance on designing adaptive cyber-physical systems and nearly silent on developing them. That is not a research gap you close by discovering something. It is a gap you close by deciding, writing it down, and being specific enough that a team can follow it on a Monday.

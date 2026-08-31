---
title: The coffee farmer is a role in our process, not a stakeholder we consult
date: 2026-08-30
summary: In a drone guided irrigation system, the person who knows when to water owns tasks and closes gates, because a wrong agronomic rule is a specification defect no test suite can catch.
tags: cyber-physical, process
---

A drone flies a coffee slope. A sensor reads soil moisture. A rule decides to open a valve on lot seven for eleven minutes. Every test in the pipeline can pass and that decision can still be wrong, because nothing in the pipeline knows how much water a coffee plant on a slope wants in August.

A coffee farmer does know. The usual arrangement is to invite them to a review and write down what they say. We put them in the process model instead, with tasks of their own.

I should say what exists: the system is not built. What exists is the process model for building it, and the argument below is about the model, which is the thing that has to be right before anyone buys a valve.

## What being a role actually means

The role executes four tasks, and each one leaves an artefact it answers for. In phase 1 it captures and models the domain knowledge, and the output is the business rules the whole control loop is written against. In phase 3 it validates those rules against the prototype. In phase 4 it writes the operating manual and runs the increment review with the team.

![The EPF detail view of phase 3: six tasks, and the domain expert in bold as the one who performs the validation of the business rules and agronomic conditions](/blog/spem-fase-3.png)

Written in bold in that figure means the role performs the task and answers for what comes out of it. It is not a decoration. The project manager assists on the agronomic validation and performs none of it, which is the honest arrangement, since the project manager knows no agronomy.

## Two of the four gates send you back to the beginning

The model has four decision gates. No phase advances because its weeks ran out.

Two of them fail the way you expect. The increment does not pass its tests, so it goes back to the task that built it, and the loop is short. The other two return all the way to phase 1, and one of those is the farmer's.

<figure>
<video src="/blog/spem-gates.en.mp4" poster="/blog/spem-gates.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>The No path is longer than the work that failed it, and drawing it that long is the decision, not an accident of layout.</figcaption>
</figure>

When the farmer looks at the prototype and says the rule is wrong, the return does not stop at the developer who built it. It goes back to phase 1, to the founding document and the contracts derived from it. A rule that waters the wrong lot at the wrong hour was written down wrong before it was coded wrong, and re-implementing it faster produces the same wrong system sooner.

## The hardware people are not a support function either

The same reasoning removes the other soft spot. Electronics and mechatronics have their own tasks, their own bench, and their own deliverables: an increment ships an installed sensor network and firmware, not only code.

Increments run two to four weeks rather than two. That is a plan and not a measurement, since none has run yet, but the reason is specific: calibrating a sensor in a field involves weather, and weather does not fit in a sprint.

## The objection I would make

This is a product owner with extra ceremony. Fair, and here is the difference. A product owner ranks work. This role stops it, and the path back from its No is longer than anyone else's, which is a cost the model pays deliberately.

The harder objection is practical. Will a coffee farmer really write an operating manual and sit through five increment reviews. Maybe not, and if not, the model has told you something true rather than something inconvenient: the project has nobody accountable for whether the water lands in the right place.

Every process model decides who is allowed to say the system is wrong. Most of them give that to the people who can read the code.

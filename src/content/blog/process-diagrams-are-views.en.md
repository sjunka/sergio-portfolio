---
title: A process diagram is a view of a model, not a drawing
date: 2026-08-27
summary: Twenty five figures for one process model, and the role rename that decided how all of them had to be produced.
tags: process, architecture
---

A process model document needed twenty five figures: five phases, five views of each phase, in SPEM 2.0 notation. I drew the first three by hand in a diagram tool. Then a role got renamed, and I spent twenty minutes hunting that name across three files and still shipped one figure with the old label.

That is the entire argument for what I built instead. A diagram is not a picture you maintain. It is a query over a model, and the model is the only thing worth editing.

## One phase, five questions

The instinct with a process model is to draw the big diagram, the one with everything on it. I have made that diagram. It is a lookup table with no index.

Each phase instead produces five figures, and each answers exactly one question. Summary: what is this phase. Flow: what does each task consume and produce. Roles: who performs it and who assists. Breakdown: what is it made of. EPF detail: how the Eclipse Process Framework would lay it out, roles on the left, tasks down the middle, work products on the right.

![The EPF detail view of phase 1: three roles on the left, three tasks chained down the middle, and the documents each one produces on the right](/blog/spem-fase-1.png)

Five drawings that overlap heavily and disagree nowhere, because they are five renderings of the same data.

## The rename test

Ask any diagramming setup one question: what does it cost to rename a role that appears eleven times across five figures.

Hand drawing costs eleven edits and, worse, it fails silently. Miss one and the figure is simply wrong. No tool tells you, because no tool knows the eleven boxes were ever the same thing.

<figure>
<video src="/blog/spem-views.en.mp4" poster="/blog/spem-views.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>The rename is one field. What redraws is every figure that mentions the role, which is the part a drawing tool cannot offer you.</figcaption>
</figure>

The model is boring data, which is the point:

```ts
const phase = {
  name: 'Domain decomposition',
  roles: ['Project manager', 'Mechatronics engineer'],
  tasks: [{
    name: 'Set up SIL and HIL',
    roles: [{ role: 'Mechatronics engineer', part: 'perform' }],
  }],
}
```

Every figure is a function of that object. Rename the string, and the five views, the per phase exports and the consolidated network all come out consistent, because none of them holds its own copy of the name.

## The editor is the exporter

The playground is a form on the left and the figure on the right, and the PNG and PDF buttons export the same SVG that is already on screen.

![The playground: a form editing phase 0 on the left, the redrawn summary view on the right, phase tabs across the top](/blog/spem-playground-editor.png)

No round trip through a drawing tool means no second copy to keep in sync. It also makes figures possible that nobody would draw: the consolidated model, all five phases as one network, comes out at 4360 by 9380 pixels. That figure was never going to be maintained by hand.

The model is written in Spanish, which stays a detail right up until the labels overrun their boxes. Spanish runs about a fifth longer than English, so the box widths are computed from the text rather than set once and eyeballed.

## The obvious objection

You wrote a tool to avoid drawing twenty five boxes. Yes. EPF Composer already exists, it is the reference implementation of this notation, and it is an Eclipse application shipped in 2008.

The honest break even is not the first twenty five figures. It is the third revision of them. This model carries sixteen architecture decision records, and one of them deletes a role and redistributes its eight tasks across two others. If your diagram gets drawn once and pasted once, draw it by hand and stop reading.

The figures are a build output. Anything else is a copy of the model that starts going stale the day someone renames a role.

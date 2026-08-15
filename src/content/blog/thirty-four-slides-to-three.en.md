---
title: Cutting 34 slides down to 3 is not summarising
date: 2026-08-15
summary: The compact deck is not the full deck with slides removed. It's a different deck, and the diagram that survived the cut was the one built from data instead of drawn.
tags: slides, process
---

I had a 34-slide deck covering a taxonomy of software process axes, which approaches we picked, and why. Then the brief changed: three slides, seven minutes, in front of a room where five other people also have seven minutes.

My first instinct was to pick the eleven best slides and merge them. That produced three slides that were unreadable and still somehow incomplete, which is the standard result and should have told me something sooner.

## A shorter deck is a different deck

The 34 slides are a reference. You can stop, go back, read a table. Density is a feature, because the reader controls the pace.

Three slides in seven minutes are a talk. Nobody reads anything, they listen, and the slide's job is to hold the one thing they should still have in mind twenty seconds from now. The pace belongs to me, not to them.

Once I accepted those are different artifacts, the cut got easier. I stopped asking "is this important" and started asking "what does this slide close on":

1. Domain and current state. Where the boundaries sit, what's active, where the gaps are. Closes on the problem.
2. Approaches and why these ones. Two mandatory, two optional, each with the reason it was picked. Closes on the justification.
3. The taxonomy, the operational decisions that fall out of it, and how that differs from doing it the usual way. Closes on the contrast.

Three slides, three landings. Everything that did not serve one of those landings went back to the long deck, which I kept and brought with me for questions. Cutting content is much less painful when the cut material is one keystroke away rather than deleted.

## The diagram that survived because it was data

The centrepiece is a fishbone: six axes, thirty-three sub-axes, sixteen of them selected. In the long deck it fills a slide. In the short deck it has to share space with two other blocks.

If I had drawn it, that would have been a redraw. It was generated, so it's a parameter:

```python
# (eje, arriba?, x del pie sobre la espina, [(sub-eje, seleccionado)])
AXES = [
    ("Ciclo", True, 430, [
        ("Paralelismo", True), ("Incremento", True), ("Retroceso", True),
        ("Enfoque", True), ("Orientacion", False), ("Duracion", False),
        ("Iteracion", False)]),
    ...
]
```

One list, two render modes. `full` draws every sub-axis including the rejected ones and goes into the long deck. `compact` draws only the selected sixteen in a low wide band and goes into the talk. The script rewrites whatever sits between the `<!--FISHBONE-->` markers in each HTML file, so regenerating is one command and neither version can drift from the data.

This is the piece I'd carry into any future deck. Not the fishbone specifically, the property: the diagram is a data structure plus a renderer, so audience-appropriate density is a flag rather than an afternoon in a drawing tool.

## Rejected things are information, until they aren't

The long deck colours every sub-axis: green for selected, amber for rejected as redundant, red for rejected as out of scope. The rejections are genuinely useful. They show the taxonomy was applied rather than cherry-picked, and they answer half the questions a reader would otherwise ask.

The compact version drops them entirely, and that was the right call. In seven minutes, an audience glancing at thirty-three items in three colours cannot tell which colour means what, so the extra items do not read as rigour, they read as noise around the sixteen that matter. Same information, opposite effect, purely because of how long the viewer gets to look at it.

## The accents dictionary

The source material was a `.docx` that had lost most of its Spanish accents somewhere in its history. Rather than fix the document, the script restores them at render time:

```python
# El .docx viene sin tildes fiables; se restituyen aqui para el render.
ACCENTS = {
    "Colaboracion": "Colaboración", "Orientacion": "Orientación",
    "Duracion": "Duración", "Iteracion": "Iteración",
    ...
}
```

Ugly, and I left it. Fixing the `.docx` fixes it once and breaks again the next time someone re-exports it from the same tool. A lookup table in the renderer is correct every time the renderer runs, which is the only moment the accents actually matter.

## The order mattered

I could not have written the three slides first. Knowing which sixteen sub-axes to keep meant working through all thirty-three, and that work only exists as the long deck. So the compact version is downstream of the thing it replaced, and both files stay in the repo.

Which is a slightly annoying answer if you were hoping the lesson was "just make fewer slides."

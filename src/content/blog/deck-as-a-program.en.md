---
title: I stopped making slides and wrote a program that makes them
date: 2026-07-30
summary: Thirty-four slides that have to stay visually consistent is not a design problem, it's a build problem. python-pptx turned my deck into a program with design tokens.
tags: python, slides
---

I had to build a 34-slide technical deck about cyber-physical agent systems, dark theme, lots of taxonomy diagrams. Two slides in, I did the thing everyone does: copy slide 1, change the text, nudge the boxes back into alignment. By slide six the card padding was 0.28 inches on some slides and 0.3 on others, and I could see it.

So I deleted the file and wrote `build_deck.py` instead. The deck is now a Python program that emits a `.pptx`. I would do it again, with reservations I'll get to.

## The tokens are the whole point

The top of the script is a palette and nothing else, lifted from Material Design 3's dark theme because I needed something that was already coherent and I did not want to invent one:

```python
SURFACE   = RGBColor(0x12, 0x12, 0x12)
SURF_1    = RGBColor(0x1E, 0x1E, 0x1E)
PRIMARY   = RGBColor(0x00, 0xD9, 0xB8)   # teal
SECONDARY = RGBColor(0x8B, 0x6B, 0xFF)   # indigo
TERTIARY  = RGBColor(0xFF, 0xC1, 0x07)   # amber
```

Below that, three helpers: `slide()` paints a background rectangle and hands back the slide, `rect()` draws a card with an optional corner radius, `txt()` places a text box where each line can be a plain string or a `(text, opts)` tuple when one run needs a different size or weight.

Every slide in the deck is built from those three functions and those tokens. Not because I planned a design system, but because the second time I typed a hex value by hand I got it wrong and spent ten minutes finding it. Consistency in a hand-made deck is discipline. In a generated deck it's the default, and breaking it takes extra effort.

There is one status palette that is deliberately separate:

```python
GREEN  = RGBColor(0x4C, 0xC9, 0x6A)   # seleccionado
YELLOW = RGBColor(0xFF, 0xC1, 0x07)   # descartado por redundante
RED    = RGBColor(0xEF, 0x53, 0x50)   # descartado por contextual
STATUS = {"green": GREEN, "yellow": YELLOW, "red": RED}
```

Those three colors mean something in the fishbone diagram. Nothing else in the deck is allowed to use them. Amber shows up twice in the file under two names, `TERTIARY` and `YELLOW`, with the same value, and that duplication is intentional: if I ever change the accent color, the semaphore should not move with it.

## What a script buys you that dragging boxes doesn't

Reordering, mostly. I moved the deck around twice and it cost nothing, because the slides are function calls in a file and the order is the order they run in. The equivalent in Keynote is dragging thumbnails and then hunting for the one slide whose "3 of 8" footer you forgot to update.

Bulk edits are the other one. Someone asked for slightly bigger body text on the dense slides, which is one default parameter in `txt()` and a rebuild. By hand that's thirty-four slides of select-all-and-change, and you will miss one, and it will be the slide that goes on screen while you're talking.

The one I did not expect to care about was diffs. `git diff` on a `.pptx` tells you a binary file changed. `git diff` on the script tells you the amber card on slide 19 became indigo. I came back to this deck after four days on something else and could read what past me had done, which has never once been true of a deck I made by hand.

## What it costs, honestly

python-pptx has no layout engine. You position everything in absolute inches on a 13.333 by 7.5 canvas, and nothing reflows. If a paragraph runs three lines instead of two it silently overflows the card it was supposed to sit inside, and the script exits with code 0 while telling you nothing is wrong.

That is the real tax, and it's bad enough that the script alone is not a workflow. You need a way to look at what you built, which is a separate problem and the subject of the next post.

The other cost is that it's genuinely slower for the first three slides. If your deck is five slides for a standup, open Keynote. The break-even for me was somewhere around slide eight, which is also roughly where the manual version started drifting out of alignment.

## The scar in the file

For a while this line was in there:

```python
SECONDARY = RGBColor(0x8B, 0x6BFF % 256, 0xFF) if False else RGBColor(0x8B, 0x6B, 0xFF)
```

That is what a half-finished fix looks like when you're moving fast and the deck is due. It ran correctly. It also sat in the file for days, dead branch and all, because a generated deck looks fine on screen no matter how ugly the generator is. Nobody reviews a build script for a slide deck.

Worth knowing about this approach: the output stays clean while the source rots quietly, and the only person who will ever notice is whoever inherits the file. Usually you, in a month, wondering what `if False` was for.

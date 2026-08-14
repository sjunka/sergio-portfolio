---
title: I shipped the same three slides twice, on purpose
date: 2026-08-13
summary: The HTML version was for presenting. The PowerPoint version had to be editable by someone else. Converting between them would have cost more than maintaining both.
tags: python, slides
---

Three slides. Seven minutes on a Saturday morning. They existed in two places at once: an HTML deck styled with `deck.css`, and a native `.pptx` built by a separate Python script. Same content, same palette, two completely independent renderers, and a warning in the README that a change made in one and not the other goes stale with nobody noticing.

Duplication I documented instead of removing. Here's why I still think that was right.

## The two audiences are not the same audience

I present from the HTML. It's a browser, it does exactly what the CSS says, the fishbone diagram is real SVG, and there's no font substitution surprise on the presenting machine.

The `.pptx` is not for me. It goes to the team lead, who is assembling one deck out of several people's contributions and will move boxes, rewrite half my text, and paste it into a template I have never seen. For that to work, every element has to be a real PowerPoint object: an autoshape they can drag, a text box they can retype into, a connector that follows when they move the thing it points at.

That is the constraint that killed every conversion route.

## Everything that converts loses the wrong thing

Export the HTML to PDF and place it in PowerPoint, and you get a picture of a slide. Nothing is editable. The lead cannot change a word.

Render the HTML to an image, same outcome with worse text rendering.

Use one of the HTML-to-pptx converters, and you get a pile of absolutely-positioned text frames that approximate the layout and break the moment anyone touches them. I tried this for about twenty minutes. The output looked close enough to be tempting and was structurally junk: nested boxes with no relationship to each other, so moving the card left the label behind.

The only way to get a `.pptx` where a human can actually work is to build it as a `.pptx`. So `build_pptx.py` places every box with `python-pptx`, reusing helpers I had already written and debugged for a different deck:

```python
# Los helpers vienen de ../cpas-deck/build_deck.py, ya probados; aqui cambian
# los tokens de color y la tipografia (Arial y Consolas, que existen en Office).
```

Arial and Consolas instead of the web fonts, because those two are on every Office install and my nice fonts are not. Font substitution in the lead's PowerPoint would break the layout in a way I could not see or fix from here.

## What makes the duplication survivable

The tokens are duplicated, but the names match on both sides. `deck.css` has `--ink`, `--chalk`, `--accent`, `--amber`; `build_pptx.py` has `INK`, `CHALK`, `ACCENT`, `AMBER`, same hex values in the same order in the file. Two windows side by side and a colour drift is visible in about four seconds. That is not synchronisation, it's making the desync cheap to spot, which is a different and more achievable goal.

The scope is also tiny. Three slides. If it had been thirty I would have paid for a generator: put the content in a YAML file, write an HTML renderer and a pptx renderer over the same data, and eat the day it costs. At three slides that generator is more code than the thing it generates, and the abstraction would have been designed against a sample size of three.

And the deck has a known end date. It gets presented once. Two weeks after that, both files are archives. Maintenance cost only accrues while something is alive.

## The part I would not repeat

The README says a change has to be made in both places. I know this because I wrote it, and I still shipped one edit to `presentacion.html` and forgot the `.pptx` for about an hour. A comment does not prevent a mistake, it only shortens the time to diagnose one.

If I did this again for anything with a longer life, the cheap version of the fix is not a generator. It's a script that pulls the strings out of both files and diffs them, and fails loudly when they disagree. That's maybe thirty lines, it catches the exact failure mode I hit, and it does not require inventing a content format.

I did not write it, because the deck was presented two days later and the check would have run maybe twice. Some technical debt never comes due, and telling that kind apart from the real kind is most of the skill.

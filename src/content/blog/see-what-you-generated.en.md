---
title: If you generate something visual, you need a way to look at it
date: 2026-08-04
summary: A script that emits a PowerPoint file gives you no feedback at all. Six lines of AppleScript and pdftoppm turned a blind build into a loop I could actually work in.
tags: python, tooling
---

Generating a `.pptx` from Python is the easy half. The hard half is that `python-pptx` will happily place a text box that overflows its card, run a title off the right edge of the slide, or stack two shapes on top of each other, and exit successfully every single time. There is no layout engine, so there is no layout error. The script has no idea what the slide looks like, and neither do you.

For about an hour I worked the obvious way: run the script, open the file in Keynote, squint, close it, edit, repeat. Opening a 34-slide deck to check one card is a terrible loop. You lose your scroll position, you lose your place in the script, and you start batching changes so you don't have to open the file again, which means when something breaks you have five suspects.

So I wrote `render.sh`, which is the whole build and the whole feedback loop in about fifteen lines:

```bash
./venv/bin/python build_deck.py

osascript <<'APPLESCRIPT'
set src to POSIX file ((POSIX path of (path to home folder)) & "Documents/CPAS-Parte1.pptx")
set dst to POSIX file ((POSIX path of (path to home folder)) & "Documents/cpas-deck/out.pdf")
tell application "Keynote"
  set d to open src
  export d to dst as PDF
  close d saving no
end tell
APPLESCRIPT

rm -rf render && mkdir render
pdftoppm -png -r 60 out.pdf render/s
```

Build, export to PDF, split the PDF into one PNG per slide. Now `render/` holds a picture of every slide, and I can open the folder in Finder's gallery view and arrow through the entire deck in about eight seconds.

## Why Keynote, of all things

Because it was already on the machine and AppleScript could drive it in six lines. That's the entire reason. LibreOffice headless would have been more portable and I did not need portable, I needed the loop working before lunch. This is the kind of decision that looks lazy in a blog post and correct in a repo that exists for two weeks.

The one thing I'd flag: Keynote's rendering of a PowerPoint file is not PowerPoint's rendering of the same file. Fonts substitute differently and rounded rectangles come out slightly softer. For catching an overflowing text box that difference does not matter at all. For checking exactly how a slide will look on the presenting machine, it does, and I opened the real thing in PowerPoint once at the end to confirm.

## The 60 DPI is deliberate

`pdftoppm -png -r 60` produces images around 800 pixels wide. They look soft. Body text is barely readable.

That is the correct resolution for this job. I'm not proofreading at this stage, I'm asking whether the boxes line up, whether anything is spilling out of its card, and whether the visual weight across a slide is balanced. All of that is legible at 60 DPI, and the whole deck renders in a couple of seconds instead of a minute. When I needed to actually read a slide I opened the PDF.

Picking a resolution low enough to be fast is the part I'd carry to any similar tool. The temptation is to render at print quality because it's one flag away, and then the loop is slow enough that you stop running it.

## The venv note nobody wants to write

The README carries this line:

> The venv uses `/usr/bin/python3` because the Homebrew python has a broken `pyexpat`.

`python-pptx` writes XML, `pyexpat` is how it parses XML, and my Homebrew install had it linked against something it did not like. I lost twenty minutes to a stack trace that looked like a `python-pptx` bug and was not. Writing the workaround down took ten seconds and it is the single highest-value line in that README, because the next person to hit it is me on a fresh laptop.

## The general shape

Any generator whose output a human has to look at needs a cheap way to look at it. That's what snapshot tests are for React components, and what Storybook is for a design system. A folder of `render/s-01.png` through `render/s-30.png` is the crudest possible member of that family, and for a deck built by a script it worked about as well.

The build step was never the problem. The problem was writing a program whose output I could not see, and doing it for an hour before it occurred to me that this was fixable in fifteen lines of shell.

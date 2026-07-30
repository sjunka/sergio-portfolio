---
title: What I look for when I interview a mobile engineer
date: 2026-07-21
summary: I stopped asking about the event loop. These four questions tell me more in ten minutes than a whiteboard does in an hour.
tags: career, hiring
---

I've been on both sides of enough mobile interviews to know that most of them measure interview practice. Here's what I ask instead, and what the answers tell me.

## "Walk me through the last bug that took you more than a day."

Not the hardest bug, the last one. Hard-bug stories get rehearsed. The last one is still messy, and the mess is the useful part: how they narrowed it down, what they ruled out and why, whether they went looking for the root cause or stopped at the symptom that made the ticket go away.

The answer I like is unglamorous. Something like "I couldn't reproduce it on my device so I checked what was different about the reporters' devices." The answer that worries me is a fix with no diagnosis attached.

## "This screen re-renders on every keystroke somewhere else in the app. Where do you look?"

A real problem with a real shape. I'm not after a specific answer, I'm after whether they reason about the tree or reach for a tool. Both are fine. Reaching for `React.memo` on every component without knowing which one is re-rendering is not fine, and it's common enough that this question earns its slot.

## "What did you have to ship that you disagreed with?"

Senior work happens inside constraints, and most of the constraints aren't technical. I want to hear that they made the case, lost, shipped it well anyway, and can still describe the tradeoff accurately. Someone who has never disagreed with a decision hasn't been close enough to one. Someone who is still angry about a decision from three jobs ago will be angry about mine.

## "What's in your app that you'd delete if nobody would notice?"

This tells me whether they read the codebase they work in or only the parts they were assigned. Engineers who know where the dead abstractions are have been paying attention, and the specificity is impossible to fake.

## What I've stopped asking

Anything with a right answer I could look up. Trivia about the JS event loop, the difference between two lifecycle methods that were deprecated years ago, reverse a linked list. None of it predicted anything about how someone worked once they joined. The candidates who did well on that material and the candidates who did well on the job were different sets of people.

## The thing that isn't a question

Give them the actual codebase for an hour, or something shaped like it, and pair on a small real change. It's the only part of the process that tests the job. It's also the only part where the candidate learns something true about working with you, which matters more than most hiring processes admit.

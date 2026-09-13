---
title: The center of a document federation should be a phone book, not a bus
date: 2026-09-13
summary: We specified one operator of Colombia's citizen folder network in 65 functional requirements, and one asymmetry holds them all up: the ministry gets identifiers, other operators get documents.
tags: architecture, process
---

Colombia's Carpeta Ciudadana gives every citizen a digital folder. You sign up with an operator, a company that keeps folders on its own infrastructure, and institutions like the education ministry, notaries and embassies send signed documents into yours. The ministry of ICT runs the centralizer, GovCarpeta, which knows which operator holds which citizen. That's how a diploma issued at one operator reaches a citizen who lives at another.

Three of us wrote [the requirements specification](https://sjunka.github.io/carpeta-ciudadana/) for one operator, in the IEEE 830 structure our architecture course uses: 65 functional requirements in nine domains, 30 non-functional ones, 55 pages. Most of it leans on a single sentence.

## The centralizer answers one question

The question is always the same: which operator holds this ID number? The answer comes with that operator's transfer address, we cache it, and the document goes straight from our servers to theirs. The centralizer never sees it.

Identifiers go to the ministry and documents go to other operators. That asymmetry is the architecture, and the rest of the spec defends it.

<figure>
<video src="/blog/carpeta-transfer.en.mp4" poster="/blog/carpeta-transfer.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>The blue messages are the document and its acknowledgement, and they go peer to peer. The centralizer's part ends at step 2, and a cached answer lets the next transfer to the same citizen skip even that.</figcaption>
</figure>

The alternative is a bus in the middle that carries every diploma in the country. It would be the bottleneck of the whole federation, and a single breach there would expose everyone's documents at once. A phone book is consulted once and kept. We wrote that down as two measurable limits: at most four calls to the centralizer over the whole life of an affiliation, and zero bytes of document content, ever.

The cache also covers for the centralizer itself, which has no availability commitment and went down on the same day we [verified its contract](/blog/call-the-api-first). With the directory cached, an outage delays new lookups instead of stopping the operator.

## Adjectives are not requirements

The case study describes quality in adjectives: availability "practically total", latency "as low as possible", usability as the top priority. None of those can fail a test, so none of them can pass one.

We replaced each with a number and tagged where every number came from, the case or us. Read availability of 99.95% a month, 2 seconds at the 95th percentile to browse a folder, 50 million folders: all ours, all marked as assumptions. The mark turns each figure into a question the client can settle in one line, either confirming it or handing us the real one. A figure nobody marked tends to reach production as if someone had decided it.

## Every tactic has a price

The table I'd defend first maps each quality attribute to a metric, a threshold, the tactic that holds it up, and one more column: what the tactic costs.

A mandatory second factor to share a document protects the folder. It's also the biggest usability obstacle for citizens with little digital experience, who are exactly the people the case puts first, and the table says so next to the tactic instead of leaving it for a usability test to discover. The same column records that retrying deliveries asynchronously makes it harder to tell a citizen what happened to their diploma, and that partitioning by ID number slows down the analytics the state asked for.

If we couldn't say what a tactic costs, we hadn't chosen it yet. We had only listed it.

## Some requirements are things the system must never do

The spec has a section of eight inverse requirements. The ones that shaped the design most: no document content through the centralizer, no citizen affiliated to two operators even for a moment during a move, and no document handed to anyone without the holder's authorization for that specific request. A limit written down stops the engineer who would cross it believing they were improving the product.

The document life cycle follows the same logic: the way a document arrives decides what anyone can do with it later.

<figure>
<video src="/blog/carpeta-states.en.mp4" poster="/blog/carpeta-states.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>Perpetual retention and the right to erasure pull in opposite directions here. The spec assumes retention wins for certificates, and marks that as a legal call rather than a technical one.</figcaption>
</figure>

A certificate signed by an institution is kept forever, can't be edited and uses no quota. Only the retention policy can retire it, never the holder. A document the citizen uploads is theirs: it counts against a quota of 20 files and 200 MB, and they can delete it whenever they want.

## Fifty five pages for a system that doesn't exist

That's the fair objection, and what the pages bought is a next step that started from verdicts instead of opinions. We ran the nine domains through the five granularity drivers from class: scope, code volatility, scalability, fault tolerance and extensibility. Each domain came out with a verdict, split in two, isolate or keep together, and [the architecture](/blog/carpeta-ciudadana-architecture) took its service count straight from that table.

The spec is 55 pages. The architecture fits in the sentence all of them defend: the ministry gets identifiers, the operators get documents.

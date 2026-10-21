---
title: An event published after the commit is an event you can lose
date: 2026-10-21
summary: Writing the event in the same transaction as the change it reports, and letting a relay publish it later, trades a silent loss for a duplicate that consumers can ignore.
tags: architecture, process
---

Commit a row, then call `producer.send`, and you have made two writes with nothing around them. If the process dies between them, the row exists and the event never will. Nothing is logged, because the process that would have logged it is gone.

In Mi Carpeta Segura, our Carpeta Ciudadana operator ([architecture post](/blog/carpeta-ciudadana-architecture)), that event is the notice that a diploma reached a citizen's folder.

## Write the event down, send it later

The fix is to take the send out of the request. The event goes into an outbox table in the same transaction as the business fact, so both rows exist or neither does, and a relay sends the unpublished rows to Kafka.

Affiliation does it in one SQL statement whose outbox insert selects from the update's `RETURNING`: no BEGIN to forget, and a second call that matches no row adds no event.

The relay keeps nothing. Pending means a null `publicado_en`, read 50 rows at a time and once a second when idle, so a crash mid-batch leaves the same rows for the next process.

<figure>
<svg viewBox="0 0 640 154" role="img" aria-label="Fact and outbox rows share one transaction; a stateless relay feeds Kafka; consumers dedupe. A dashed route shows commit then send.">
  <defs>
    <marker id="tx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="0" width="212" height="84" rx="10" class="dg-plate"/>
  <text x="12" y="14" class="dg-m">one transaction</text>
  <rect x="8" y="24" width="92" height="48" rx="6" class="dg-node"/>
  <text x="54" y="52" text-anchor="middle" class="dg-t">Fact row</text>
  <rect x="112" y="24" width="92" height="48" rx="6" class="dg-node-accent"/>
  <text x="158" y="52" text-anchor="middle" class="dg-t">Outbox row</text>
  <path d="M206 48 H248" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="252" y="24" width="120" height="48" rx="8" class="dg-node"/>
  <text x="312" y="52" text-anchor="middle" class="dg-t">Stateless relay</text>
  <path d="M374 48 H408" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="412" y="24" width="76" height="48" rx="8" class="dg-node"/>
  <text x="450" y="52" text-anchor="middle" class="dg-t">Kafka</text>
  <path d="M490 48 H528" class="dg-flow" marker-end="url(#tx-head)"/>
  <rect x="532" y="24" width="108" height="48" rx="8" class="dg-node"/>
  <text x="586" y="44" text-anchor="middle" class="dg-t">Consumers</text>
  <text x="586" y="59" text-anchor="middle" class="dg-s">dedupe by id</text>
  <path d="M106 86 V126 H140" class="dg-flow-dashed" marker-end="url(#tx-head)"/>
  <rect x="144" y="102" width="204" height="48" rx="8" class="dg-node-warn"/>
  <text x="246" y="122" text-anchor="middle" class="dg-t">Commit, then send</text>
  <text x="246" y="137" text-anchor="middle" class="dg-s">a crash in between loses the event</text>
  <path d="M350 126 H450 V76" class="dg-flow-dashed" marker-end="url(#tx-head)"/>
</svg>
<figcaption>The relay is a loop inside the producing service with no queue in memory. The dashed route is what the table replaces.</figcaption>
</figure>

## Delivery is at least once, so consumers dedupe

A batch is marked only after every send succeeds, and if one fails the whole batch goes again, so rows that already left leave twice. Each event is encoded against its registered schema before it is sent, and a test with a rejecting registry asserts that nothing leaves.

The event id is minted at insert, so every retry carries the same `ce_id`, and each consumer guards against the repeat: notifications looks up the event id first (one test, same event twice, one email), audit has a unique index on it, the folder index overwrites by document id.

## A fact in another service can't join your transaction

When an issuer confirms a certificate, custody, which has its own database, records it as valid, so interoperability has no transaction covering both writes and can only make its own safe to repeat.

It enqueues `documento.recibido` on every confirmation, with a unique dedupe key built from the document id. If an attempt died after custody committed and before the enqueue, the issuer's retry fills the gap, and a unit test pins that half. It is weaker: the repair happens only if somebody calls again, and nothing sweeps for valid certificates with no event behind them.

## What the decision record compared

ADR-0018 scores three options on fault tolerance, interoperability and cost. Publishing straight after the commit fails the first, JSON without a registered schema the second. The outbox fails neither and pays with a table and a relay per producer. Its claim that Kafka down loses no events is the design's: no test stops the broker.

## The objection: polling is old and the window small

Change data capture reads the database log with no loop, Kafka has transactions, and a gap of milliseconds rarely opens. Fair, within a scope: a prototype on one Kafka node, with managed Kafka as the documented target (ADR-0015). The decision record never weighed CDC or Kafka transactions, so these reasons are mine: a Kafka transaction can't include a Postgres row, and CDC swaps the loop for a connector to run.

The loop has a price: services that run a relay or a consumer stay on with CPU always allocated, the largest line in the deployment notes' estimate, about 1.6 USD a day for seven of them plus Keycloak, at list prices, not measured.

I can't say how often the window opens and won't invent a number. The shape of the loss decides it: no error, no row, a notice that never arrives. A stuck outbox row is one query away.

## The checklist

Check any publishing service:

- Insert the event into an outbox table in the same transaction as the change it reports.
- Create the event id on that insert, never at send time.
- If the change happens elsewhere, enqueue on every retry with a dedupe key from the thing that changed.
- Keep nothing in the relay's memory: pending means a row with no published timestamp.
- Validate every payload against a registered schema before it leaves.
- Make every consumer safe to run twice.

A duplicate leaves an id to ignore. A lost event leaves nothing to look for.

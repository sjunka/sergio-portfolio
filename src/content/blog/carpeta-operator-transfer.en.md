---
title: When a citizen changes operator, delete last
date: 2026-09-26
summary: Moving a citizen and their documents between two operators that share no database comes down to the order of four idempotent steps, and the delete is the only step you can't take back.
tags: architecture, process
---

A citizen in the Carpeta Ciudadana federation can leave their operator and take every document with them to another one. Our operator, Mi Carpeta Segura, had to do both sides of that: receive a citizen from another team's operator, and hand one over. The two operators share no database, no transaction and no message bus. All they have is the centralizer, GovCarpeta, which records who belongs where, and a contract the teams of the course agreed between themselves.

With no transaction available, the order of the steps has to do the job a transaction would. The rule we ended up with is short: anything you can undo goes first, and the delete goes last.

## Four steps, all safe to repeat

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Outgoing transfer: freeze the folder, unregister in GovCarpeta, send transferCitizen with presigned URLs, wait for confirmation, then either delete after a verified confirmation or re-register on a rejection">
  <defs>
    <marker id="tr-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tr-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="72" y="33" text-anchor="middle" class="dg-t">1. Freeze folder</text>
  <text x="72" y="50" text-anchor="middle" class="dg-s">custody: read-only</text>
  <path d="M147 37 H161" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="165" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="237" y="33" text-anchor="middle" class="dg-t">2. Unregister</text>
  <text x="237" y="50" text-anchor="middle" class="dg-s">GovCarpeta write</text>
  <path d="M312 37 H326" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="330" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="402" y="33" text-anchor="middle" class="dg-t">3. transferCitizen</text>
  <text x="402" y="50" text-anchor="middle" class="dg-s">presigned URLs, 24 h</text>
  <path d="M477 37 H491" class="dg-flow" marker-end="url(#tr-head)"/>
  <rect x="495" y="10" width="145" height="54" rx="8" class="dg-node"/>
  <text x="567" y="33" text-anchor="middle" class="dg-t">4. Wait</text>
  <text x="567" y="50" text-anchor="middle" class="dg-s">transferCitizenConfirm</text>
  <path d="M567 66 V112" class="dg-flow" marker-end="url(#tr-head)"/>
  <path d="M567 88 H155 V112" class="dg-flow-accent" marker-end="url(#tr-head-a)"/>
  <rect x="0" y="118" width="310" height="86" rx="8" class="dg-node-accent"/>
  <text x="16" y="140" class="dg-t">req_status 1, verified</text>
  <text x="16" y="158" class="dg-s">The HMAC link matches and GovCarpeta shows</text>
  <text x="16" y="172" class="dg-s">the citizen under the new operator.</text>
  <text x="16" y="190" class="dg-m">delete documents, then account</text>
  <rect x="330" y="118" width="310" height="86" rx="8" class="dg-node-warn"/>
  <text x="346" y="140" class="dg-t">req_status 0</text>
  <text x="346" y="158" class="dg-s">Affiliation registers the citizen again</text>
  <text x="346" y="172" class="dg-s">and custody reopens the folder.</text>
  <text x="346" y="190" class="dg-m">nothing is deleted</text>
</svg>
<figcaption>Every box above the line can be repeated or reversed. The left box is the only one that can't, which is why it sits at the end and needs two independent proofs.</figcaption>
</figure>

The state of each transfer lives in the interoperability service's own table, not in memory, so a restart picks up exactly where the process stopped. Every step is idempotent: freezing a frozen folder does nothing, and the presigned URLs are requested fresh on each attempt and never stored. They last 24 hours, against 60 seconds for a normal download, because the receiving operator might take a while to pull a hundred files.

Freezing comes before anything leaves. A citizen who uploads a document halfway through a transfer would otherwise arrive at the new operator without it, and nobody would notice until they went looking.

## One confirmation is not enough

The obvious version deletes as soon as the destination answers `req_status: 1`. We didn't trust that alone, for a plain reason: the confirm endpoint is a public URL, and anything can POST to it.

So a confirmation has to pass two checks before we delete a byte. It must arrive on the link we gave that destination, which carries the transfer id and an HMAC only we can produce. And GovCarpeta must already show the citizen under another operator. Without both, the answer is a 409 and the folder stays as it is. The first check proves who is talking. The second proves the thing they claim actually happened, at the one place the whole federation agrees on.

## A rejection should leave the citizen somewhere

Our own design document said that on `req_status: 0` we keep the folder and escalate to a human. Read literally, that leaves the citizen with no operator at all, because step 2 already unregistered them. The federation's one hard rule is one operator per citizen at any time, and an orphan breaks it in the other direction.

We changed it. A rejection registers the citizen back with us and reopens the folder. If that fails five times in a row, the transfer moves to an `atencion` state for a person to look at, and the folder stays read-only. Escalation survived, but only as the last resort.

## Trust GovCarpeta, not a signature

The incoming side started out strict. Our first version demanded a JWS signature from the sending operator, the SHA-256 and size of each document, and the citizen's address and phone. It was secure and nobody could use it, because no other team sent any of that. Interoperating in a federation means accepting the format the federation actually speaks.

So we accept the course format, `{ id, citizenName, citizenEmail, urlDocuments, confirmAPI }`, and take trust from the centralizer instead of a key. A transfer is accepted only if GovCarpeta shows the citizen with no operator, which can only be true if the sender already let them go. Our custody service downloads each file and computes the type, size and hash itself rather than believing what it was told.

The fair objection is that anyone can start a transfer for any free citizen. True, and that's why the citizen isn't affiliated with us until they click an activation link sent to their institutional email and set a password. An attacker can create a pending transfer. They can't finish one.

## What's still open

A destination that never confirms leaves the folder read-only forever. That's deliberate for now, and marked in the code as the first thing to add a deadline to. It's an annoying failure, but nothing gets lost. The opposite mistake, deleting first and confirming later, would lose someone's diplomas, and no retry policy gets those back.

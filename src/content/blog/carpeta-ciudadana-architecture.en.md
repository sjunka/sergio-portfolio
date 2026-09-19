---
title: We didn't choose eleven microservices, the requirements did
date: 2026-09-18
summary: The architecture of our Carpeta Ciudadana operator took every service boundary from the requirements spec, and four operations running against the real government API show where each boundary is enforced.
tags: architecture, process
---

The second half of the Carpeta Ciudadana project asked for the architecture of our operator and for proof that it works: register a citizen, log in, upload a document and have the ministry's centralizer authenticate it, all four end to end against the real GovCarpeta. Our operator is called Mi Carpeta Segura, and it has been registered in GovCarpeta since 14 September.

Most of the design was already sitting in [the requirements spec](/blog/carpeta-ciudadana-requirements).

## The spec already knew how many services

The spec ran its nine domains through five granularity drivers and left a verdict on each. The architecture only had to read them. Split in two became two services: document storage apart from the folder index, because the index is read thousands of times per write, and identity apart from audit, because one sits on every request and the other only writes. Isolate became one service. Keep together also meant one: email and SMS are two ways of saying the same thing, so notifications is a single service. The centralizer was out of scope, so it gets no service of ours, only a gateway.

That adds up to eleven, and none of the boundaries came out of a whiteboard argument.

## Only one service talks to the government

GovCarpeta answers in Spanish prose and promises no availability. Only the gateway has to know that. It turns prose into a status, gives up after 8 seconds, retries reads and nothing else, and opens a circuit after five failures in a row.

It also enforces the rule the whole spec leans on, that no document content ever reaches the centralizer:

```js
// RI-01: the gateway carries URLs, never documents.
app.use(express.json({ limit: '2kb' }))
```

It's one line of Express, and it means a PDF sent there by mistake gets a 413 instead of a copy on a government server. Any URL the gateway forwards also has to be https.

## A user is born disabled

Registration needs strong consistency, since nobody may end up affiliated to two operators. GovCarpeta has no transactions and no idempotency, so there is nothing to run a two-phase commit against. We ordered the steps instead.

<figure>
<video src="/blog/carpeta-register.en.mp4" poster="/blog/carpeta-register.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>If the centralizer is down at step 2, the registration waits as pending. The operator never decides a citizen is free just because it couldn't ask.</figcaption>
</figure>

The account exists before the affiliation does, but disabled, so a failure halfway through leaves nothing anyone can log into. If GovCarpeta refuses, the affiliation service deletes the account.

## The service signs, the browser carries

Uploads keep the services out of the byte path. Custody validates the file and the citizen's quota of 20 documents, then signs an upload URL that expires in five minutes, without even calling storage. The browser sends the file straight to the bucket.

<figure>
<video src="/blog/carpeta-upload.en.mp4" poster="/blog/carpeta-upload.en.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>Custody reads the object back once, as a stream, to record its SHA-256. That is the only time the bytes pass through a service.</figcaption>
</figure>

A service that never buffers uploads scales with requests, not megabytes. Authentication runs the trick in reverse: the centralizer receives a read URL valid for 15 minutes, never the file. The portal then labels the document "authenticated by the centralizer" and never "certified", because nobody in the federation issues certificates yet. Getting that word right mattered as much as the URL: "certified" would promise a guarantee the system can't give.

## Decisions compare, they don't score

Twelve decisions follow the UAM architectural decision template. The criteria come only from the spec's quality attributes, cost and regulation, and each option gets meets, partial or doesn't meet, with a reason. We skipped weighted scores on purpose, because a 7.4 against a 6.9 hides the argument inside arithmetic.

Region is the clearest example. São Paulo is closer to Colombian citizens, but GovCarpeta runs on Heroku in the US, so from São Paulo every registration and authentication would travel north and back. We chose us-east1 and wrote the dissent down next to the decision.

## Eleven services for four operations

Eleven microservices for four working operations would be over-engineering if all eleven were running. Four are: three small Node services and Keycloak for identity. The other seven are designed and not deployed. The folder index stays inside custody until reads pass 100 per write or folder p95 goes above 2 seconds, a threshold written next to the service instead of a feeling.

What runs is tested: 17 unit tests and 7 end-to-end scenarios against the real GovCarpeta, all green, with zero violations from axe. Today it runs on Docker Compose. Cloud Run is next, with the same images.

The spec said the centralizer must never see a document. In the code that sentence became a 2 KB body limit, and it's the requirement I trust most, because nobody has to remember it.

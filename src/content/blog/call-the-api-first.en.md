---
title: Call the API before you draw the architecture
date: 2026-09-08
summary: A government API that every team on the project was designing against turned out to be a directory of 70 operators where 54 have no address, and one afternoon of curl found it.
tags: architecture, process
---

A brief handed to a class of teams described a national system for citizen documents. Every citizen gets a digital folder. Institutions push documents into it. A central service run by the ministry knows which citizen belongs to which operator, so operators can find each other and move a diploma from one to another without the citizen carrying paper around.

The brief came with a link to the central service's API docs. Everyone read the docs. Nobody called the API.

I spent an afternoon with curl instead of drawing boxes. The architecture changed.

## What the directory actually contains

`GET /apis/getOperators` returns 70 registered operators. Each one has an id, a name, a participant list, and a `transferAPIURL`, which is the address you send a citizen's folder to when they switch providers.

Sixteen of the seventy have that field. The other 54 are unreachable. They exist in the directory and there is no way to hand them anything. The field is optional and nobody checks it, so 77% of the federation is a name with no door.

That is not a bug I can route around. It is the shape of the world my system lives in. Every design that assumed "look up the operator, then call it" needs a branch for the operator that cannot be called, and that branch is most of the traffic.

## The endpoint that authenticates nothing

`PUT /apis/authenticateDocument` is the piece the whole trust model rests on. A signed diploma is worth something because a citizen cannot forge it, and the central service is what does the signing.

It takes a presigned S3 URL. Not the document. It never downloads the bytes it claims to authenticate, so at best it stamps a reference to a file that can change after the stamp. The non-repudiation the brief promises has no support underneath it.

The directory also publishes no public keys. Name, id, participants, and that is all. To verify a signature from another operator I need its key material, and there is nowhere to get it. Federated trust is not something I forgot to build. It is not buildable against this contract.

## Small things that decide your code

`validateCitizen` answers in prose: `El ciudadano con id: 1234567890 se encuentra registrado en el operador: Operador Ciudadano ` with a trailing space. To learn which operator holds a citizen you parse a Spanish sentence, and the name you pull out is your only join key against a directory that does not guarantee unique names.

`getOperators` answers 200 with no credential at all. The Swagger declares no security definitions, and `DELETE /apis/unregisterCitizen` is equally open, so anyone on the internet can unregister anyone. CORS is an allowlist that throws: no `Origin` gets 200, an unknown origin gets 500, because the middleware raises and nothing catches it.

None of this is in the docs. All of it is in the responses.

## The point

The requirements document is a description of a system somebody intends to exist. The running service is the system that does exist. When they disagree, the running one wins, and you find out either in an afternoon of curl or in week six of implementation.

Testing it first also changes what you write down. Half of my open questions to the professor are now specific: what do we do with the 54 operators with no endpoint, and who issues the certificates. Those are answerable. "How does federation work" is not.

Read the docs to know what to call. Call it to know what you are building.

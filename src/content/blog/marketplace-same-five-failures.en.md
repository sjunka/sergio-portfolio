---
title: Silk Road and Coupang failed in the same five places
date: 2026-10-17
summary: A darknet market in 2013 and a large e-commerce company in 2025 broke at the same five points, and mapping those five beats starting from a modelling tool's list of 74 threats.
tags: security, architecture
---

Silk Road and Coupang have almost nothing in common. One was a criminal market on Tor, shut down in 2013. The other is a large, legitimate South Korean e-commerce company, fined a record sum in 2026. They broke in the same five places, twelve years apart, and nobody broke an algorithm in either case.

I read both for my security course, in court filings, regulators' findings and press reports. Where sources disagree or I could not verify a figure, I say so.

## Draw the boundary, then number the breaks

<figure>
<svg viewBox="0 0 640 170" role="img" aria-label="Trust boundary map: buyers, sellers and staff outside; login, payments, servers and logs inside; five numbered failure points, with 1 on both login and payments">
  <defs>
    <marker id="mf-h" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0L7,3L0,6z" class="dg-head"/></marker>
  </defs>
  <rect x="124" y="4" width="392" height="162" rx="12" class="dg-plate"/>
  <text x="136" y="20" class="dg-m">TRUST BOUNDARY</text>
  <rect x="0" y="28" width="96" height="126" rx="8" class="dg-node"/>
  <text x="48" y="80" text-anchor="middle" class="dg-t">2. Buyers</text>
  <text x="48" y="98" text-anchor="middle" class="dg-s">and sellers</text>
  <rect x="544" y="28" width="96" height="126" rx="8" class="dg-node"/>
  <text x="592" y="80" text-anchor="middle" class="dg-t">4. Staff</text>
  <rect x="136" y="28" width="172" height="56" rx="8" class="dg-node-accent"/>
  <text x="148" y="52" class="dg-t">1. Login and tokens</text>
  <rect x="136" y="98" width="172" height="56" rx="8" class="dg-node-accent"/>
  <text x="148" y="122" class="dg-t">1. Payments</text>
  <rect x="332" y="28" width="172" height="56" rx="8" class="dg-node"/>
  <text x="344" y="52" class="dg-t">3. Servers and keys</text>
  <rect x="332" y="98" width="172" height="56" rx="8" class="dg-node"/>
  <text x="344" y="122" class="dg-t">5. Logs and alerts</text>
  <path d="M98,56H132" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M98,126H132" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M542,56H508" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M508,126H542" class="dg-flow" marker-end="url(#mf-h)"/>
</svg>
<figcaption>The two 1s are one cause in two places: a single check carrying all the trust.</figcaption>
</figure>

A threat model starts as a map of what sits inside, what sits outside and which flows cross the trust boundary.

## Where both of them broke

One check carried all the trust (1). In September 2012, as Bitcoin Magazine retold the Justice Department's case, a user with at least nine fake accounts sent more than 140 transactions in rapid succession, the withdrawal system lost count of what it had paid, and more than 50,000 BTC left. I could not download the department's release, so those figures are the magazine's, and the exact mechanism is not public. Coupang had the same flaw in its login: per Seoul Economic Daily, a token was accepted on its signature alone, so the signing key opened any account.

Anyone could walk in (2). Silk Road had open registration. At Coupang, the science ministry says, a former employee forged login tokens and entered customer accounts.

Secrets and configuration (3) failed twice. Silk Road's server was reachable outside Tor. How the FBI found it is disputed: its court declaration blames the login CAPTCHA, critics an exposed PHPMyAdmin page. At Coupang, the signing key of an engineer who built part of the authentication outlived his departure in November 2024.

The weak point can be a person (4). NBC News, on the court documents: Silk Road's operator promoted the site under an alias but used a Gmail address and a Stack Overflow account in his real name. Reuters: Coupang's former employee knew the flaws of the authentication he helped build.

Nobody noticed in time (5). Silk Road's operator learned of an IP leak after a DDoS in March 2013. At Coupang the unauthorised access ran from April to November 2025, by the ministry's dates, and customers who got threatening emails raised the alarm. Coupang told the authorities more than 53 hours after telling its security chief, against a 24-hour deadline, per Reuters, and the fine cites about five months of logs deleted despite a preservation order.

## A count of threats is not triage

Microsoft's Threat Modeling Tool turned the same diagram, seven elements and 13 flows, into 74 STRIDE threats: 28 generic threat types repeated across the flows, all marked High, none mentioning revocation, rotation, a rate limit or concurrency. A data-flow diagram records that a flow exists, not how often it fires or how long a key outlives its author. (Validated with the tool's own loading code, not its Windows interface.)

My instructor said a complete analysis can produce 500,000 to a million risk scenarios and that the job is to concentrate on the critical ones. I would rather choose them from two incidents than from a list where everything is High.

## The objection: a criminal market is not a retailer

A criminal market and a legitimate company, the objection goes, are not comparable. The adversaries do differ: Silk Road's was the police, Coupang's a former employee and then a regulator. But the business, the decade and the attacker changed and the kind of failure did not, which points at the cause, not the context. What differs is the bill: an arrest and a shutdown, against a fine of about US$409 million, which may change if Coupang contests it, and 37.5 million people exposed by the regulator's count. Coupang disputes the scope of the leak. Two cases are not a law, and the split into five places is my own classification.

## The checklist

For the design review of anything that holds other people's money or data. Each line is a place both cases broke.

1. Make the debit atomic, test concurrent requests, check tokens against a session. Price: latency.
2. Rate-limit by account and IP, cap new accounts, require MFA. Price: friction.
3. Keep admin panels off the internet, rotate secrets, revoke keys the day someone leaves. Price: automation.
4. Apply least privilege, split duties, verify offboarding. Price: process.
5. Alert on volume per token, keep immutable logs, plan the notification. Price: false positives.

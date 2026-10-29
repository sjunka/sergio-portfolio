---
title: A decision nobody can disagree with is just a description
date: 2026-10-29
summary: How to write an architecture decision a reviewer can disagree with, shown on an AWS design that costs 173 dollars a month, or 292 in a campaign, with a template to copy.
tags: cloud, architecture
---

"I used Auto Scaling because it improves scalability" is a sentence nobody can disagree with, which is why it tells a reviewer nothing. Compare: "Two instances in two availability zones and no second region, because I assume the business accepts 99.9% and a second region would almost double the fixed bill." Someone can dispute the assumption, the doubling, or the claim that two zones are enough. Every objection has somewhere to land.

I wrote the second kind for the closing assignment of my cloud computing course, a two-page brief for a case study: a coffee retailer moving its web shop to AWS before a national campaign. My instructor said the grade rewards the justification and not the service picked, and named "because everything is Kubernetes now" and "for portability" as answers that earn nothing. I'd hold any architecture review to that. The access decision has [its own post](/blog/reachable-is-not-authorized); these are about failure and money.

## The 99.9% was my own number

The case gave no availability target, so I assumed one and wrote down who has to confirm it: the business accepts 99.9% in the campaign, about 43 minutes of downtime a month. Two zones cover that, by my argument and not by measurement. The load balancer drops a dead instance, Auto Scaling replaces it, and a synchronous database standby in the second zone costs 26 dollars a month more than a single-zone one.

A warm standby in a second region would almost double the fixed cost, 147 of the 173 dollars in a normal month (my estimate, never priced), so I turned it down. If a region fails I restore from backups and templates elsewhere: four hours to sell again, up to an hour of data lost, both targets I set and neither measured. If the business asks for regional recovery in under an hour and pays for it, the decision flips.

The evidence is one run. In my lab I terminated an instance: the load balancer dropped it after 35 seconds, a replacement was serving at 2 minutes 40, and the page never stopped answering. The group used the EC2 health check, which would have ignored a hung app, so the design uses the balancer's check. The database failover I never ran, and the brief names the test.

## One NAT gateway, and what it stands on

A single NAT gateway instead of one per zone saves 37 dollars a month at list price, the gateway hours plus its public address. It stands on premises a reviewer can attack one at a time. The instances boot from a prebuilt image and download nothing. Payment is a hosted checkout that confirms through an inbound webhook, so nothing calls the provider. Only patches and Session Manager go out through the NAT, so if its zone fails the other keeps selling and loses both until the gateway is recreated.

If the payment provider turns out to need outbound calls, selling depends on the NAT and I buy the second one. Like the failover, this is untested, since my labs never touched a NAT. The planned test removes its route from an app subnet and places an order.

## Price the month the design exists for

My first draft priced a normal month from memory, 150 to 200 dollars against 173 checked. It had no campaign month. The final numbers come from the AWS Price List API, queried on 21 and 23 October: on-demand list prices, 730-hour months, CloudFront at the South America rate, no free tier. A campaign month comes to 292, a ceiling on purpose, built on 600 GB and 150,000 orders, about double what ten times the traffic for five days gives.

In a normal month 85% of the bill is fixed, so elasticity can't touch most of it. In the campaign month the four extra instances cost 10 dollars, CPU burst credits 22 and CloudFront 88. Holding six instances all month would cost 61 more than two, so I scale and treat six as the ceiling.

## The objection: real teams have no grader

The fair objection is that I write reasons because someone marks them, and a real team has no marker. But the grader is a stand-in. Every real decision gets a reader eventually: the engineer who inherits the system after its author has left, or whoever asks why the bill doubled. A diagram survives the author. The reasons survive only if someone wrote them down, and they let that reader reopen one decision when its premise breaks, instead of keeping the whole design or throwing it out. And the parts that matter resist padding, because a price has to match the list and a test has to pass.

## The decision record

Each decision in the brief followed this shape; one line is filled in from mine.

```text
Decision:       what we do, in one sentence
Because:        the constraint, its number, who confirms it
Rejected:       each alternative, and why it loses
Cost:           per month at list price, with the date checked
Risk I accept:  what breaks if I am wrong, and what tells me
Evidence:       what I ran, or "untested" and the test
Revisit when:   the premise that, if false, reverses it

Example, Revisit when: the payment provider needs outbound calls,
because then selling depends on the NAT.
```

A diagram says what I picked. The record says where to push.

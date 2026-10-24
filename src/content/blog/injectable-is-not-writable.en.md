---
title: Injectable does not mean writable
date: 2026-10-24
summary: A SQL injection that can read a database may not be able to write to it, and the bug that zeroed a cart order was a negative quantity the server never checked.
tags: security, process
---

What an injection can do depends on the statement it lands in and the driver that runs it, and the label SQL injection tells you nothing about either. My security course set a blunt task: get a shopping cart order to confirm with its total at zero, against a shared Juice Shop instance, version 20.3.0, on SQLite. My instructor's hint was SQL injection plus an UPDATE, meaning something like a stacked UPDATE on a product's price. It is a sensible hint. I tested it before building anything on top of it.

## The two injectable endpoints only ever read

Two places on the instance are injectable. The product search, `/rest/products/search?q=`, is one: a bare quote in the search term, `q=test'`, comes back as `SQLITE_ERROR`. The login form is the other, and the classic `' OR 1=1--` hands back an admin token. Both are real findings, and both run as SELECT statements. Neither writes anything. A UNION can widen what you read through either point. It cannot change what is stored.

## The stacked UPDATE changed nothing

The obvious next move is to chain a second statement after the first: close the string, add `;UPDATE Products SET price=1.23 WHERE id=1;--`, and let the database run both. It did not run. That payload returned `SQLITE_ERROR: near ";": syntax error`, and so did any bare semicolon. A second variant, aimed at setting every price to zero, had no effect. Product 1 cost 1.99 before and after both attempts. My best guess, since neither response proves it: the driver prepares a single statement per call, so whatever follows the first semicolon is refused or ignored.

## The real bug was a quantity field with no floor

The bug that worked was not an injection. Juice Shop computes an order's total on the server as the sum of price times quantity, and `PUT /api/BasketItems/:id` accepts a negative quantity with no lower bound.

Two products at 1.99 each, Apple Juice and Banana Juice, start a basket at a normal total of 3.98. A direct PUT of -1 to the second item turns its line into -1.99, and the server adds 1.99 and -1.99 to get 0.

```js
await fetch('/api/BasketItems/21', {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ quantity: -1 }) // the UI stops at 1, the API does not
})
// 200 OK, and the basket now totals 0.00
```

Checkout with Standard Delivery, which costs nothing, accepts the 0.00 order and returns a confirmation number. Juice Shop files this challenge, Payback Time, under Improper Input Validation. My write-up tags it insecure design, OWASP A04, rather than injection, A03, which is where the hint pointed.

<figure>
<svg viewBox="0 0 640 74" role="img" aria-label="Three attempts and results: injection in search and login only reads, a stacked UPDATE changes nothing, a negative quantity confirms an order at 0.00">
  <rect x="5" y="10" width="200" height="54" rx="8" class="dg-node"/>
  <text x="105" y="33" text-anchor="middle" class="dg-t">Search + login</text>
  <text x="105" y="50" text-anchor="middle" class="dg-s">works, SELECT only</text>
  <rect x="220" y="10" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="33" text-anchor="middle" class="dg-t">Stacked UPDATE</text>
  <text x="320" y="50" text-anchor="middle" class="dg-s">error or no-op, price 1.99</text>
  <rect x="435" y="10" width="200" height="54" rx="8" class="dg-node-accent"/>
  <text x="535" y="33" text-anchor="middle" class="dg-t">Negative quantity</text>
  <text x="535" y="50" text-anchor="middle" class="dg-s">order confirmed at 0.00</text>
</svg>
<figcaption>Two attempts needed a quote mark. The one that worked needed a minus sign.</figcaption>
</figure>

## The hint was reasonable and still wrong here

The fair pushback is that stacked queries are a real technique, not folklore. Several databases and drivers do run a semicolon-separated batch, and on those, chaining an UPDATE after a vulnerable SELECT is a known way to turn a read into a write. I did not disprove stacked queries. I disproved one claim about one driver on one instance, and I could not have known which way it would go until I ran it. An attack path someone hands you is a hypothesis about a particular database and driver, and the way to settle it is to run it against the ones in front of you.

## What closes the injection does not close the cart bug

Parameterised queries remove the whole class, reads and writes alike, because both come from one root cause: input reaching the SQL engine as code instead of as data. A database account that cannot update Products is the second line of defence, and on a driver where stacked queries do work it is the control that would have stopped the hint's route. Neither touches the cart bug. That one needed the server to enforce a quantity between 1 and the stock on hand: the total was already computed on the server, from a number the client could set.

## The checklist

Before you build on an injection, whether you found the path yourself or someone handed it to you, run it through these against the actual target:

- Prove the input changes what comes back, before calling it a read.
- Prove the same input changes a stored value, before calling it a write.
- Send a batch and prove more than the first statement runs, before counting on stacked queries.
- Trace what the application does with the changed value, before calling the path complete.

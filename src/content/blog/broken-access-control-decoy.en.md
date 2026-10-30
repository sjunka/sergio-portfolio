---
title: The cookie was a decoy, the missing check was the bug
date: 2026-10-09
summary: In a training app that is vulnerable on purpose, the cookie that begged to be edited did nothing, and a leftover file plus a missing ownership check did the damage.
tags: security, architecture
---

An editable cookie is a hypothesis about what the server trusts. The evidence is what the server does when the value changes, and sometimes the answer is nothing.

I got that answer in my security course, on challenge 7 of OWASP's Hackademic Challenges, a CMS that is vulnerable on purpose and that my instructor assigned. The page asks for a student's name and returns that student's marks. It also sets a cookie with a taunting name.

Of the six challenges in my write-up, five fell to the same two moves: read what the page shipped to the browser, or edit what the browser sends back. A set like that trains a reflex, and a cookie with a taunting name sets it off.

Finding out takes a diff: send the request, change one value, send it again, compare. Changing the cookie did nothing. That line is from my notes, and everything I say about the app is behavior seen from outside, so "the server ignores it" and "nothing checks" are inferences, not code I read.

## What did the server actually enforce?

Two things mattered, and neither was the cookie. First, a text file sat in a directory the server refused to list. The folder answered 403, but the file inside answered anyone who asked for it by path, and it recorded the last user to log in. That was a valid name.

Second, the page handed that student's private marks to whoever sent the name. Nothing compared the person asking with the person asked about. Knowing a name worked as permission.

<figure>
<svg viewBox="0 0 640 132" role="img" aria-label="A leftover file feeds a name to a marks endpoint with no check on who asks. The cookie is a dashed dead end.">
  <defs>
    <marker id="bd-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="2" y="2" width="168" height="54" rx="8" class="dg-node"/>
  <text x="86" y="24" text-anchor="middle" class="dg-t">A leftover file</text>
  <text x="86" y="42" text-anchor="middle" class="dg-s">Folder: 403. File: served.</text>
  <path d="M172 29 H232" class="dg-flow-accent" marker-end="url(#bd-head)"/>
  <text x="203" y="22" text-anchor="middle" class="dg-m">A NAME</text>
  <rect x="236" y="2" width="168" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="24" text-anchor="middle" class="dg-t">Marks endpoint</text>
  <text x="320" y="42" text-anchor="middle" class="dg-m">NO CHECK ON WHO ASKS</text>
  <path d="M408 29 H466" class="dg-flow-accent" marker-end="url(#bd-head)"/>
  <rect x="470" y="2" width="168" height="54" rx="8" class="dg-node"/>
  <text x="554" y="33" text-anchor="middle" class="dg-t">Marks to whoever asks</text>
  <path d="M320 86 V56" class="dg-flow-dashed"/>
  <text x="332" y="76" class="dg-m">EDIT IT: NOTHING CHANGES</text>
  <rect x="236" y="86" width="168" height="44" rx="8" class="dg-node"/>
  <text x="320" y="105" text-anchor="middle" class="dg-t">The cookie</text>
  <text x="320" y="120" text-anchor="middle" class="dg-m">A DECOY</text>
</svg>
<figcaption>The one rule enforced, no listing, protected the folder and not the file in it. Only a check on the asker closes the hole.</figcaption>
</figure>

The file saved me a search. My write-up lists dictionary guessing as another route, but I solved the exercise through the file, so that route stays a hypothesis. This is information disclosure feeding broken access control: the leak supplied the identifier and the missing check honored it.

## Authorize on the server, against the session

The fix is a decision the server makes on every request: who is asking, and may they read this record? The answer comes from the session, never from an identifier the client supplies and never from the hope that nobody knows a name. Deny by default, so a route with no rule answers 403 instead of 200.

```js
function canReadMarks(session, studentId) {
  if (!session) return false // deny by default
  return session.studentId === studentId // ownership comes from the session
}
```

The test that would have caught this is one request: sign in as one user, ask for another user's record, expect a 403. Then take the file out of the deploy. A 403 on the folder protects nothing inside it, and reachable is not allowed, the split from [my AWS post](/blog/reachable-is-not-authorized). Every path under the web root is attack surface, because the server will serve whatever you forgot.

## The objection: an editable cookie is already a design flaw

The strongest objection is that a cookie the user can edit is a design flaw on its own, whatever the server does with it. Half of that is right. If the server had read the cookie to decide something, editing it would have been the exploit. Another challenge in the same set is exactly that: a hidden form field holding a yes or no, believed by the server, and flipping it was the whole bug. Here the cookie did nothing, so there was no trust in it to exploit. The client-supplied value the server did believe was the plainest field on the page, the name. The cookie looked like trust and wasn't. The name looked like input and worked as a key.

Both can be true in one app: a cookie can be a smell while the finding sits somewhere else. An inert cookie is still worth deleting, because the next maintainer will read it as a control. But a smell only tells you where to look. What the server enforces tells you what you found.

## Where to read more

[OWASP A01:2025 Broken Access Control](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/) is first on OWASP's 2025 Top 10, and its prevention list covers both halves of this bug: deny by default and record ownership on one side, directory listing off and no backups or `.git` folders in the web root on the other.

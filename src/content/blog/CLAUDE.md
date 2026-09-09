# Writing a post for this blog

Read this before writing or editing anything in this directory. It is not a style
suggestion, it is the spec. The first draft of the August 2026 posts ignored every
rule below and had to be thrown away and rewritten from scratch.

This file is not a post. Only `<slug>.<lang>.md` is loaded by `src/lib/posts.ts`.

---

## 1. The one rule that matters

**A post explains a problem and its solution. It is not a diary of how the work went.**

The failure mode is writing the story of your week: I built X, then I hit bug Y, then
I fixed it, here is the script I used. Nobody outside the repo wants that. What they
want is the thing you now know.

When the work was research, a talk, or a document, the post is about **the content you
produced**, not about producing it. A deck about cyber-physical systems becomes a post
about cyber-physical systems, never a post about `python-pptx`. If the interesting part
of the work was a build script, the post is still about the domain problem that script
was serving.

Test each section against: *would this help a reader who has never heard of my project?*
If the answer depends on caring about my week, cut it.

A bug is allowed in a post when it teaches a general lesson, told solution-first: the
rule, then the bug as evidence. Not the chronology.

## 2. Voice

Read `flatlist-jank.en.md`, `boring-releases.en.md` and `hiring-mobile-engineers.en.md`
before drafting. They are the reference. What they do:

- First person, opinionated, willing to say something is wrong.
- Open on the reader's situation or a claim, never on "recently I was working on".
- Specific over general. Real numbers, real API names, real failure modes.
- Sentence length varies. Some short. Some that take their time.
- Sentence-case headings. Headings state a claim or ask a question.
- Closers land flat and declarative. No inspirational summary, no call to action.
- British-ish spelling appears (`memoisation`, `behaviour`). Fine either way, be consistent within a post.

Length: 700 to 900 words of body text. The originals are shorter; the newer ones run
longer because they carry diagrams. Do not pad to hit a number.

### Numbers carry their provenance

A number with no setup is decoration. Say what was measured, over what, how many times.
"Two real runs landed at 59s and 115s" survives a sceptical reader; "roughly a minute"
does not. A target is not a measurement, and if the only honest figure is one you were
told rather than saw, say who told you.

### Say which claims you watched and which you are guessing

Opinionated does not mean everything gets asserted flat. An observation and a hypothesis
are different objects, and a post that mixes them spends the credit of the first on the
second. Mark the guess as a guess, in one clause, and keep it in the same confident
voice. This is not hedging: hedging is refusing to commit at all.

### Answer the strongest objection inside the post

Whatever a reader with the opposite experience would say, say it yourself, in the body,
before the closing section. A post that only holds inside the writer's own conditions
should name those conditions. The objection goes in as a real paragraph, not as a
concession clause bolted onto a sentence that then rolls straight over it.

Note what does not get borrowed from good posts elsewhere: the closing invitation to try
it yourself, and bullet lists standing in for the paragraph the writer did not want to
write. Both are still banned here, section 3.

## 3. Banned, mechanically

Run these checks before shipping. Each one is a grep.

- **No em dashes or en dashes.** `—` `–` do not appear anywhere. Use a period, a comma, a colon, or restructure. This is the single most reliable tell.
- **No curly quotes.** Straight `"` and `'` only.
- **No AI vocabulary**: delve, crucial, pivotal, showcase, tapestry, testament, underscore, vibrant, landscape (figurative), foster, garner, intricate, leverage, robust, seamless, holistic, realm, embark, myriad.
- **No bold-header bullet lists** (`- **Thing:** explanation`). Write prose or a real table.
- **No rule-of-three parallel blocks** — three one-word paragraph openers in a row reads as generated.
- **No "not just X, it's Y"** as a rhetorical move. Once per post at most, and only when true.
- **No generic upbeat conclusion.** No "the future is bright", no "exciting times ahead".
- **No signposting.** No "let's dive in", "here's what you need to know", "the real question is".
- **No emoji.**

```sh
grep -nE "—|–|[“”‘’]" src/content/blog/*.md
grep -niE "\b(delve|crucial|pivotal|showcas|tapestry|testament|underscore|vibrant|foster|garner|intricate|leverage|robust|seamless|holistic|realm|embark|myriad)\b" src/content/blog/*.md
grep -nE "^\s*[-*] \*\*" src/content/blog/*.md
```

If the `humanizer` skill is available, run it on the draft as a second pass.

## 4. Code

Code earns its place only when four to eight lines is the sharpest possible statement of
the point, usually the wrong pattern next to the right one. Never paste source out of a
repo because it exists. A reader cannot learn anything from thirty lines of Swift.

`flatlist-jank.en.md` is the model: three snippets, each showing a mistake, each under
ten lines. `hiring-mobile-engineers.en.md` has none and is not worse for it.

### Every fence carries a language

Code blocks render through `highlight.js` in the Monokai palette, wired up in
`src/pages/BlogPost.tsx`. Colour is what lets a reader find the one wrong line without
reading the whole snippet, so a fence with no language is a snippet the reader has to
parse by hand. Registered: `js`, `ts`, `tsx`, `sh`, `yaml`. Fencing anything else falls
back to `highlightAuto`, which guesses; add the grammar in `BlogPost.tsx` instead.

Monokai is dark in both themes, deliberately. A token colour that changes meaning between
light and dark is a token colour nobody learns.

### The snippet has to be valid in the language you fenced it as

The highlighter tokenises what you wrote, not what you meant. A fragment that is not a
statement gets coloured as garbage, and the reader ends up decoding two things at once.
This shipped and was wrong:

```js
// The guess. Reads fine, compiles, matches the test.
const url = status.images[0]

// What the provider sends.
{ images: [{ url: "https://..." }], video: { url: "https://..." } }
```

Two problems. The second block is a bare object literal, which is a block statement with
a label in real JavaScript, so it highlights as nonsense. And the pair is ordered wrong:
the guess comes first, so the reader holds a wrong model in their head until the last
line takes it away. Bind the fragment to a name and put the truth first:

```js
// What the provider sends.
const status = { images: [{ url: 'https://...' }], video: { url: 'https://...' } }

const guess = status.images[0] // an object, not a URL
const url = status.images[0].url // what it had to be
```

Two `const url` lines would have been the same mistake again: a redeclaration is a
syntax error, so name the wrong one something else. Same rule as prose: solution first, then the mistake as evidence. Comments inside a
snippet are part of the argument, not decoration, so they carry the claim and stay to one
line.

If a thing is better shown than quoted, draw it. See below.

## 5. Diagrams

Diagrams are inline SVG in the markdown, wrapped in `<figure>`, using the `.dg-*` class
vocabulary defined in `src/styles/globals.css`. They are inline rather than image files
so one drawing is correct in both light and dark instead of shipping two of everything.

### The trap that will bite you

`marked` ends an HTML block at the first blank line. **A blank line anywhere inside
`<figure>` breaks the SVG**: everything after it escapes the `<svg>` element and renders
as an empty box. No error, no warning, it just silently comes out blank.

Write the whole figure with no blank lines inside it.

### The class vocabulary

Use only these. Do not add inline `fill` or `stroke` attributes, they will not follow the theme.

| Class | Use |
| --- | --- |
| `dg-node` | a normal box |
| `dg-node-accent` | the box the post is about |
| `dg-node-warn` | a box that carries risk or a caveat |
| `dg-plate` | dashed grouping container |
| `dg-flow` | a connector |
| `dg-flow-accent` | the connector the post is about |
| `dg-flow-dashed` | a weak or optional relationship, or a lifeline |
| `dg-head` / `dg-head-accent` | arrowhead `<path>` inside a `<marker>` |
| `dg-t` | box title, 11.5px semibold |
| `dg-s` | secondary text, 9.5px |
| `dg-m` | uppercase mono label, 8.5px, accent colour |

### Conventions

- `viewBox="0 0 640 H"`. 640 units wide always, so every diagram in the blog shares a scale.
- Give every `<svg>` `role="img"` and an `aria-label` that describes what it shows.
- Marker ids must be prefixed per post (`wv-head`, `mk-head`) because several diagrams share a page.
- Nothing at `y` less than 0. A label above the top box needs headroom: use `viewBox="0 -14 640 H+14"`.
- Text is not measured for you. `dg-s` is roughly 5.3px per character, `dg-m` roughly 5.5px. Check that a label ends before the thing to its right starts.
- Every figure gets a `<figcaption>` that says something the drawing cannot, not a restatement of the title.

### Verify before shipping, always

```sh
node scripts/preview-figures.mjs /tmp/figs.png src/content/blog/your-post.en.md
```

Then look at the PNG. It renders every figure in both themes side by side. This exists
because four separate geometry defects shipped past a read-through: an arrow landing off
centre, a label crossing a connector, a connector crossing a box, and a title clipped
above the viewBox. None were visible in the markdown.

## 6. Images

Real screenshots beat a drawing when the point is what something actually looks like.

- Put them in `public/blog/`, referenced as `/blog/name.png`.
- Crop dead space first. A phone screenshot is usually half empty below the content.
- Two side by side use `<figure class="shots">` with two `<img>`. Good for the same thing on two platforms.
- Every `<img>` needs a real `alt`.

## 7. Frontmatter

```yaml
---
title: Sentence case, states a claim, no trailing punctuation
date: 2026-08-15
summary: One sentence. Specific. What the reader gets, not what the post covers.
tags: two, tags
---
```

Two tags. Reuse an existing tag before inventing one; check `getTags` output. Current set:
architecture, career, cyber-physical, hiring, mobile, native-modules, performance, process,
react-native.

Filename is `<slug>.en.md`. The slug is the URL forever, so name it for the subject and
not for the phrasing of the title. Spanish translation, when there is one, is
`<slug>.es.md` with the same slug.

Posts are numbered automatically by date, oldest is 001. Dates spread out across the
calendar; do not date six posts the same day.

## 8. Translations

A translation is `<slug>.es.md` next to the English file, same slug and same `date`.
`hiring-mobile-engineers.es.md` is the reference for register.

What gets translated:

- `title` and `summary`.
- **`tags`.** They render as the filter pills in the Spanish index, so they are Spanish: `carrera`, `contratación`, `rendimiento`, `proceso`, `arquitectura`, `ciberfísicos`, `módulos-nativos`. `react-native` and `mobile` stay as they are, they are names.
- **Every string inside a diagram**, and every `aria-label`, `alt` and `<figcaption>`. A Spanish post with English diagrams is a half-translated post.

What does not:

- Code blocks, identifiers, message type names, API names, error strings.
- Terms the reader uses in English anyway: bug, fix, deploy, runtime, store, handshake, listener, safety case, tradeoff.

Write Spanish that sounds written rather than translated. Reach for the natural
phrasing over the parallel one, and prefer the informal register the English uses.

### Spanish text is roughly 20% longer

That is a geometry problem, not a prose problem. A label that fit at 640 units in
English can overrun its box or collide with the next element. Rework the wording to fit
before moving coordinates, and **run `scripts/preview-figures.mjs` on the `.es.md` file
too**. Rough widths at the sizes in use: `dg-t` about 6.5px per character, `dg-s` about
4.7px, `dg-m` about 5.5px.

Adding a translation changes what the fallback tests can assert. `posts.test.ts` and
`e2e/fixtures.ts` read the content directory to decide which slugs are untranslated, so
they adjust on their own. Do not pin a slug in those tests.

## 9. The share card

Every post ships a 1200x630 card at `public/blog/og/<slug>.jpg`. It is what LinkedIn,
X and WhatsApp show when the URL is pasted, and it is generated, never drawn by hand:

```sh
npm run og
```

That renders `scripts/og-post.html` once per `.en.md` file, filling in the title, the
summary and the date, and rewrites the site card too. One card per slug, English titles,
shared by both languages. Commit the jpg.

`scripts/postbuild.mjs` writes those values into each post's static `index.html`. Social
crawlers do not run JavaScript, so the tags `SEOHead` sets at runtime never reach them;
the file as served is the preview. The build throws if a post has no card, which is the
only reminder that `npm run og` exists.

A card is cached by its URL for weeks. Changing the design of an already shared post
means changing the filename too, or the old preview keeps showing.

## 10. Before opening the PR

1. `npm run og`, then look at `public/blog/og/<slug>.jpg`. A title that overruns the card is a title the length steps in `scripts/og.mjs` did not cover.
2. `e2e/fixtures.ts` — add the post to the `posts` array, newest first, slug and exact title. The e2e suite counts and orders against this.
3. `node scripts/preview-figures.mjs` on the post and actually look at it.
4. `npm run build && npx vite preview --port 4173`, open the post, check it at desktop width and at 390px. Every code block should come out coloured; one that renders grey on the dark plate was fenced with a language nothing is registered for.
5. `npm run test:all` — lint, typecheck, unit, e2e. All of it.
6. Commit with `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` set to the post's date, so the history matches the publication dates.

The sitemap, the prerendered route and the reading time are all generated. Nothing to
update by hand.

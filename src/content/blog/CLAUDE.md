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

## 8. Before opening the PR

1. `e2e/fixtures.ts` — add the post to the `posts` array, newest first, slug and exact title. The e2e suite counts and orders against this.
2. `node scripts/preview-figures.mjs` on the post and actually look at it.
3. `npm run build && npx vite preview --port 4173`, open the post, check it at desktop width and at 390px.
4. `npm run test:all` — lint, typecheck, unit, e2e. All of it.
5. Commit with `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` set to the post's date, so the history matches the publication dates.

The sitemap, the prerendered route and the reading time are all generated. Nothing to
update by hand.

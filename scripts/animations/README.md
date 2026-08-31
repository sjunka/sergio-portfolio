# Post animations

Source for the videos in `public/blog/*.mp4`, kept here for the same reason as
`scripts/og-card.html`: a generated binary that nobody can diff is a binary
nobody will ever update.

Remotion is not a dependency of this site. Render in a throwaway project:

```sh
npx create-video@latest --yes --blank --no-tailwind spem-anim
cd spem-anim && npm i
cp /path/to/this/repo/scripts/animations/*.tsx /path/to/this/repo/scripts/animations/*.ts src/
npx remotion render ModelViews-en out/ModelViews-en.mp4 --codec=h264 --crf=26
npx remotion still ModelViews-en out/poster.png --frame=240
```

Four compositions, one per post per language. Each takes a `lang` prop, because
a Spanish post with an English animation is a half-translated post. Copy the
`.mp4` to `public/blog/<name>.<lang>.mp4` and the poster, converted to jpeg, to
`public/blog/<name>.<lang>.jpg`.

| Composition | Post |
| --- | --- |
| `ModelViews-en` / `ModelViews-es` | `process-diagrams-are-views` |
| `Gates-en` / `Gates-es` | `domain-expert-as-a-role` |

The palette is copied from the SPEM playground's own stylesheet so the videos sit
next to the exported figures without looking like a different project. The videos
are light in both themes, deliberately, for the same reason the code blocks are
dark in both.

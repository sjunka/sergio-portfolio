import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexMono";
import { carpeta, cc, stepOf, type CarpetaId, type Head, type Kind, type Lang, type Legend, type Seq, type States } from "./carpetaCopy";

// The Carpeta Ciudadana site sets Inter and IBM Plex Mono; so do its videos.
const sans = loadInter("normal", { weights: ["400", "600", "700"], subsets: ["latin"] }).fontFamily;
const mono = loadPlex("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily;

// The rhythm of the site's own sequence videos: an intro over the bare
// diagram, 3.5 s per step, then the whole drawing again with the closing line.
export const FPS = 30;
const INTRO = 2.5 * FPS;
const STEP = 3.5 * FPS;
const OUTRO = 4.5 * FPS;
const STEPS = 5;
export const DURATION = INTRO + STEPS * STEP + OUTRO;

const AREA = { x: 40, y: 112, w: 1200, h: 456 };
// A post column shows the video at about half size, so a step zooms further in
// than the site's 1.6 to keep the arrow labels readable there.
const MAX_ZOOM = 2;
const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Box = { x: number; y: number; w: number; h: number };
type Cam = { s: number; x: number; y: number };
type Timeline = ReturnType<typeof useTimeline>;

/** Camera that frames a box inside the panel, leaving `top` px free for the lifeline names. */
function fit(b: Box, top = 0): Cam {
  const h = AREA.h - top;
  const s = Math.min(MAX_ZOOM, AREA.w / b.w, h / b.h);
  return { s, x: AREA.w / 2 - (b.x + b.w / 2) * s, y: top + h / 2 - (b.y + b.h / 2) * s };
}

function useTimeline() {
  const frame = useCurrentFrame();
  const t = frame - INTRO;
  const active = t < 0 ? 0 : Math.min(STEPS, Math.floor(t / STEP) + 1);
  const outro = t >= STEPS * STEP;
  const start = outro ? INTRO + STEPS * STEP : active === 0 ? 0 : INTRO + (active - 1) * STEP;
  const k = active === 0 ? 1 : interpolate(frame, [start, start + 0.8 * FPS], [0, 1], { ...clamp, easing: EASE });
  return {
    frame,
    active,
    outro,
    start,
    k,
    /** Each step fades in when its turn comes; earlier steps stay drawn. */
    shown: (step: number) => interpolate(frame, [INTRO + (step - 1) * STEP, INTRO + (step - 1) * STEP + 0.6 * FPS], [0, 1], clamp),
    /** The site's "by steps" mode: the running step's arrows march toward their
     * head, thicker, and the drawing settles once the sequence is over. */
    flow: (step: number) =>
      !outro && step === active
        ? { strokeWidth: 2.6, strokeDasharray: "0.06 0.04", strokeDashoffset: 0.2 - 0.2 * ((frame % 42) / 42) }
        : {},
  };
}

function camera(tl: Timeline, steps: Box[], full: Box, top: number): Cam {
  const at = (i: number) => (i === 0 ? fit(full) : fit(steps[i - 1], top));
  const to = tl.outro ? fit(full) : at(tl.active);
  const from = tl.outro ? at(STEPS) : at(Math.max(0, tl.active - 1));
  const mix = (a: number, b: number) => a + (b - a) * tl.k;
  return { s: mix(from.s, to.s), x: mix(from.x, to.x), y: mix(from.y, to.y) };
}

const Markers = () => (
  <defs>
    <marker id="cc-m" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill={cc.faint} />
    </marker>
    <marker id="cc-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill={cc.primary} />
    </marker>
  </defs>
);

const line = (accent?: boolean) => ({
  pathLength: 1,
  fill: "none",
  stroke: accent ? cc.primary : cc.faint,
  strokeWidth: accent ? 1.6 : 1.2,
  markerEnd: `url(#cc-${accent ? "a" : "m"})`,
});

/** Arrow label on its own background, so it reads over lifelines. */
function Label({ x, y, lines, accent, align = "middle", size = 10.5 }: { x: number; y: number; lines: string[]; accent?: boolean; align?: "middle" | "start"; size?: number }) {
  const w = Math.max(lines[0].length * size * 0.64, (lines[1]?.length ?? 0) * (size - 1) * 0.6) + 12;
  const h = lines.length * 13 + 6;
  const rx = align === "middle" ? x - w / 2 : x;
  const tx = align === "middle" ? x : x + 6;
  return (
    <>
      <rect x={rx} y={y} width={w} height={h} rx="2" fill={cc.surface} />
      <text x={tx} y={y + 13} textAnchor={align} fontFamily={mono} fontSize={size} letterSpacing={size * 0.04} fontWeight={accent ? 600 : 400} fill={accent ? cc.primaryText : cc.muted}>
        {lines[0]}
      </text>
      {lines[1] && (
        <text x={tx} y={y + 26} textAnchor={align} fontFamily={mono} fontSize={size - 1} fill={cc.faintText}>
          {lines[1]}
        </text>
      )}
    </>
  );
}

function Swatch({ kind, x, y }: { kind: Legend[number][0]; x: number; y: number }) {
  if (kind === "m" || kind === "a") return <line x1={x} y1={y - 4} x2={x + 32} y2={y - 4} {...line(kind === "a")} markerEnd={undefined} />;
  if (kind === "ext") return <rect x={x} y={y - 10} width="32" height="12" rx="2" fill={cc.surface} stroke={cc.faint} strokeDasharray="5 4" />;
  if (kind === "dot") return <circle cx={x + 6} cy={y - 4} r="6" fill={cc.faint} />;
  return <rect x={x} y={y - 10} width="14" height="10" rx="3" fill={kind === "sut" ? cc.sut : cc.canvas} stroke={kind === "sut" ? cc.ink : cc.hairline} />;
}

function LegendRow({ y, w, items, label }: { y: number; w: number; items: Legend; label: string }) {
  let x = 128;
  return (
    <>
      <line x1="40" y1={y} x2={w - 40} y2={y} stroke={cc.hairline} strokeWidth=".8" />
      <text x="40" y={y + 18} fontFamily={sans} fontSize="10" fontWeight="600" letterSpacing=".125" fill={cc.faintText}>
        {label}
      </text>
      {items.map(([kind, text]) => {
        const x0 = x;
        const sw = kind === "m" || kind === "a" || kind === "ext" ? 32 : 14;
        x += sw + 8 + text.length * 5.6 + 32;
        return (
          <g key={text}>
            <Swatch kind={kind} x={x0} y={y + 18} />
            <text x={x0 + sw + 8} y={y + 18} fontFamily={sans} fontSize="10" fill={cc.muted}>
              {text}
            </text>
          </g>
        );
      })}
    </>
  );
}

// ---- Sequence diagrams: the architecture's renderer, with the SRS's heads ----

const SEQ = { col: 216, x0: 40, headY: 40, headH: 60, y0: 168, dy: 60 };
const seqX = (i: number) => SEQ.x0 + i * SEQ.col + 88;
const seqSize = (d: Seq) => ({ x: 0, y: 0, w: SEQ.x0 * 2 + d.heads.length * SEQ.col - 40, h: SEQ.y0 + d.msgs.length * SEQ.dy + 60 });
const STICKY = 64;

/** What the camera frames on each step: that step's messages and their labels. */
function seqSteps(d: Seq): Box[] {
  return Array.from({ length: STEPS }, (_, i) => {
    const ks = d.msgs.flatMap((m, k) => (m.step === i + 1 ? [{ m, k }] : []));
    const xs = ks.flatMap(({ m }) => (m.from === m.to ? [seqX(m.from), seqX(m.from) + 230] : [seqX(m.from), seqX(m.to)]));
    const x0 = Math.min(...xs) - 110;
    const y0 = SEQ.y0 + ks[0].k * SEQ.dy - 50;
    return { x: x0, y: y0, w: Math.max(...xs) + 110 - x0, h: ks[ks.length - 1].k * SEQ.dy - ks[0].k * SEQ.dy + 76 };
  });
}

const headStyle = (kind: Kind) =>
  kind === "sut"
    ? { fill: cc.sut, stroke: cc.ink }
    : kind === "ext"
      ? { fill: cc.surface, stroke: cc.faint, strokeDasharray: "5 4" }
      : { fill: cc.canvas, stroke: cc.hairline };

function HeadBox({ h, x }: { h: Head; x: number }) {
  const y = SEQ.headY;
  return (
    <g>
      <rect x={x - 88} y={y} width="176" height={SEQ.headH} rx="4" {...headStyle(h.kind)} />
      {h.kind === "person" ? (
        <>
          <circle cx={x} cy={y + 19} r="10" fill={cc.faint} />
          <path d={`M ${x - 15},${y + 42} a 15,12 0 0 1 30,0 z`} fill={cc.faint} />
          <text x={x} y={y + 55} textAnchor="middle" fontFamily={sans} fontSize="11.5" fill={cc.muted}>
            {h.name}
          </text>
        </>
      ) : h.kind === "sut" ? (
        <>
          <text x={x} y={y + 29} textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="#ffffff">
            {h.name}
          </text>
          <text x={x} y={y + 46} textAnchor="middle" fontFamily={sans} fontSize="9.5" fontWeight="600" letterSpacing=".3" fill="rgba(255,255,255,.82)">
            {h.sub}
          </text>
        </>
      ) : (
        <>
          <text x={x} y={y + 27} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill={cc.ink}>
            {h.name}
          </text>
          <text x={x} y={y + 45} textAnchor="middle" fontFamily={sans} fontSize="11.5" fill={cc.muted}>
            {h.sub}
          </text>
        </>
      )}
    </g>
  );
}

function SeqSvg({ d, tl, heads, legend }: { d: Seq; tl: Timeline; heads: number; legend: string }) {
  const { w, h } = seqSize(d);
  const bottom = h - 64;
  const z = d.zone && seqX(d.zone.col);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%">
      <Markers />
      <rect width={w} height={h} fill={cc.surface} />
      {z !== undefined && d.zone && (
        <>
          <rect x={z - 104} y={SEQ.headY - 14} width="208" height={bottom - SEQ.headY + 30} rx="8" fill={cc.canvas} stroke={cc.hairline} strokeWidth=".8" />
          <rect x={z - 88} y={SEQ.headY - 22} width="176" height="16" rx="2" fill={cc.surface} opacity={heads} />
          <text x={z} y={SEQ.headY - 10} textAnchor="middle" fontFamily={sans} fontSize="9" fontWeight="600" letterSpacing=".125" fill={cc.faintText} opacity={heads}>
            {d.zone.label}
          </text>
        </>
      )}
      {d.heads.map((_, i) => (
        <line key={i} x1={seqX(i)} y1={SEQ.headY + 10} x2={seqX(i)} y2={bottom} stroke={cc.hairline} strokeWidth="1" />
      ))}
      <g opacity={heads}>
        {d.heads.map((head, i) => (
          <HeadBox key={i} h={head} x={seqX(i)} />
        ))}
      </g>
      {d.msgs.map((m, k) => {
        const y = SEQ.y0 + k * SEQ.dy;
        const x1 = seqX(m.from);
        const lines = m.op ? [m.label, m.op] : [m.label];
        if (m.from === m.to) {
          return (
            <g key={k} opacity={tl.shown(m.step)}>
              <path d={`M ${x1},${y - 14} H ${x1 + 44} V ${y + 10} H ${x1 + 8}`} {...line(m.accent)} {...tl.flow(m.step)} />
              <Label x={x1 + 52} y={y - 2 - (lines.length * 13 + 6) / 2} lines={lines} accent={m.accent} align="start" />
              <text x={x1 - 14} y={y + 3} textAnchor="middle" fontFamily={mono} fontSize="9" fill={cc.faintText}>
                {k + 1}
              </text>
            </g>
          );
        }
        const x2 = seqX(m.to);
        const s = Math.sign(x2 - x1);
        return (
          <g key={k} opacity={tl.shown(m.step)}>
            <path d={`M ${x1},${y} H ${x2 - 8 * s}`} {...line(m.accent)} {...tl.flow(m.step)} />
            <Label x={(x1 + x2) / 2} y={y - 8 - (lines.length * 13 + 6)} lines={lines} accent={m.accent} />
            <circle cx={x1 + 13 * s} cy={y} r="9" fill={cc.canvas} stroke={cc.hairline} />
            <text x={x1 + 13 * s} y={y + 3} textAnchor="middle" fontFamily={mono} fontSize="9" fill={cc.faintText}>
              {k + 1}
            </text>
          </g>
        );
      })}
      <LegendRow y={h - 44} w={w} items={d.legend} label={legend} />
    </svg>
  );
}

/** Lifeline names pinned to the top of the panel while the camera is zoomed
 * into the messages, which by then are far below the real heads. */
function StickyHeads({ d, cam, opacity }: { d: Seq; cam: Cam; opacity: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: STICKY + 8, background: `linear-gradient(${cc.surface} 75%, rgba(255,255,255,0))` }} />
      {d.heads.map((h, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 14,
            left: cam.x + seqX(i) * cam.s,
            transform: "translateX(-50%)",
            padding: "7px 16px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            fontSize: 19,
            fontWeight: 600,
            color: h.kind === "sut" ? "#ffffff" : cc.ink,
            background: h.kind === "sut" ? cc.sut : h.kind === "ext" ? cc.surface : cc.canvas,
            border: `1.5px ${h.kind === "ext" ? "dashed" : "solid"} ${h.kind === "sut" ? cc.ink : h.kind === "ext" ? cc.faint : cc.hairline}`,
          }}
        >
          {h.name}
        </div>
      ))}
    </div>
  );
}

// ---- The document life cycle: the SRS state diagram, geometry unchanged ----

const STATES_FULL = { x: 0, y: 0, w: 1120, h: 616 };
const STATES_STEPS: Box[] = [
  { x: 56, y: 88, w: 552, h: 80 },
  { x: 392, y: 84, w: 504, h: 84 },
  { x: 120, y: 88, w: 480, h: 176 },
  { x: 56, y: 332, w: 544, h: 180 },
  { x: 392, y: 88, w: 560, h: 328 },
];

function Tag({ cx, top, lines, accent }: { cx: number; top: number; lines: string[]; accent?: boolean }) {
  const w = Math.max(...lines.map((l) => l.length)) * 5.8 + 10;
  return (
    <>
      <rect x={cx - w / 2} y={top} width={w} height={7 + 13 * lines.length} rx="2" fill={cc.surface} />
      {lines.map((l, i) => (
        <text key={l} x={cx} y={top + 13 + 13 * i} textAnchor="middle" fontFamily={mono} fontSize="9" letterSpacing=".36" fontWeight={accent ? 600 : 400} fill={accent ? cc.primaryText : cc.muted}>
          {l}
        </text>
      ))}
    </>
  );
}

function State({ x, y, w = 192, label: [name, sub], sut }: { x: number; y: number; w?: number; label: [string, string]; sut?: boolean }) {
  return (
    <>
      <rect x={x} y={y} width={w} height="64" rx="12" fill={cc.surface} />
      <rect x={x} y={y} width={w} height="64" rx="12" {...headStyle(sut ? "sut" : "box")} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" fontFamily={sans} fontSize={sut ? 13 : 12} fontWeight={sut ? 700 : 600} fill={sut ? "#ffffff" : cc.ink}>
        {name}
      </text>
      <text
        x={x + w / 2}
        y={y + (sut ? 48 : 46)}
        textAnchor="middle"
        fontFamily={sans}
        fontSize={sut ? 9 : 11}
        fontWeight={sut ? 600 : 400}
        letterSpacing={sut ? ".125" : undefined}
        fill={sut ? "rgba(255,255,255,.82)" : cc.muted}
      >
        {sub}
      </text>
    </>
  );
}

function StatesSvg({ d, tl, legend }: { d: States; tl: Timeline; legend: string }) {
  const st = (n: number, accent?: boolean) => ({ ...line(accent), ...tl.flow(n) });
  return (
    <svg viewBox="0 0 1120 616" width="100%" height="100%">
      <Markers />
      <rect width="1120" height="616" fill={cc.surface} />
      {[80, 320].map((y, i) => (
        <g key={y}>
          <rect x="40" y={y} width="1000" height="184" rx="8" fill={cc.canvas} stroke={cc.hairline} strokeWidth=".8" />
          <rect x="56" y={y - 8} width="344" height="16" rx="2" fill={cc.surface} />
          <text x="228" y={y + 4} textAnchor="middle" fontFamily={sans} fontSize="9" fontWeight="600" letterSpacing=".125" fill={i === 0 ? cc.faintText : cc.orange}>
            {d.zones[i]}
          </text>
        </g>
      ))}
      <circle cx="72" cy="128" r="8" fill={cc.faint} />
      <circle cx="72" cy="376" r="8" fill={cc.faint} />

      <g opacity={tl.shown(1)}>
        <path d="M 80,128 H 120" {...st(1)} />
        <path d="M 320,128 H 400" {...st(1)} />
        <Tag cx={360} top={104} lines={d.valid} />
      </g>
      <g opacity={tl.shown(2)}>
        <path d="M 600,128 H 680" {...st(2, true)} />
        <Tag cx={640} top={90} lines={d.complete} accent />
      </g>
      <g opacity={tl.shown(3)}>
        <path d="M 224,160 V 216 Q 224,224 232,224 H 400" {...st(3)} />
        <Tag cx={304} top={200} lines={d.invalid} />
      </g>
      <g opacity={tl.shown(4)}>
        <path d="M 80,376 H 120" {...st(4)} />
        <path d="M 224,408 V 456 Q 224,464 232,464 H 400" {...st(4)} />
        <Tag cx={310} top={440} lines={d.order} />
        <path d="M 320,376 H 400" {...st(4)} />
        <Tag cx={360} top={342} lines={d.arrives} />
      </g>
      <g opacity={tl.shown(5)}>
        <path d="M 600,376 H 648 Q 656,376 656,368 V 152 Q 656,144 664,144 H 680" {...st(5, true)} />
        <Tag cx={644} top={352} lines={d.traced} accent />
        <path d="M 784,160 V 184" {...st(5)} />
        <Tag cx={870} top={166} lines={d.retention} />
      </g>

      <State x={128} y={96} label={d.received} />
      <State x={400} y={96} label={d.verified} />
      <State x={680} y={96} w={208} label={d.active} sut />
      <State x={400} y={192} label={d.rejected} />
      <State x={680} y={192} w={208} label={d.retired} />
      <State x={128} y={344} label={d.uploaded} />
      <State x={400} y={344} label={d.superseded} />
      <State x={400} y={440} label={d.deleted} />

      <LegendRow y={548} w={1120} items={d.legend} label={legend} />
    </svg>
  );
}

// ---- The frame: title, the panel with its camera, and the step caption ----

export const Carpeta: React.FC<{ id: CarpetaId; lang: Lang }> = ({ id, lang }) => {
  const d = carpeta[id][lang];
  const tl = useTimeline();
  const legend = lang === "es" ? "LEYENDA" : "LEGEND";

  const full = d.kind === "seq" ? seqSize(d) : STATES_FULL;
  const top = d.kind === "seq" ? STICKY : 0;
  const cam = camera(tl, d.kind === "seq" ? seqSteps(d) : STATES_STEPS, full, top);
  // Pinned names fade in as the camera leaves the full view and out as it returns.
  const sticky = d.kind !== "seq" ? 0 : tl.outro ? 1 - tl.k : tl.active === 0 ? 0 : tl.active === 1 ? tl.k : 1;

  const text = tl.outro ? d.outro : tl.active === 0 ? d.intro : d.steps[tl.active - 1];
  const textIn = interpolate(tl.frame, [tl.start, tl.start + 0.5 * FPS], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: cc.canvas, fontFamily: sans, color: cc.ink }}>
      <div style={{ position: "absolute", left: 40, top: 28, right: 40, display: "flex", alignItems: "baseline", gap: 20 }}>
        <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 600, color: cc.primaryText }}>{d.tag}</span>
        <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em" }}>{d.title}</span>
        <span style={{ marginLeft: "auto", fontSize: 22, color: cc.muted }}>
          {tl.outro || tl.active === 0 ? d.brand : stepOf[lang](tl.active, STEPS)}
        </span>
      </div>

      <div style={{ position: "absolute", left: AREA.x, top: AREA.y, width: AREA.w, height: AREA.h, overflow: "hidden", borderRadius: 12, background: cc.surface, border: `1px solid ${cc.hairline}` }}>
        <div style={{ position: "absolute", left: cam.x, top: cam.y, width: full.w * cam.s, height: full.h * cam.s }}>
          {d.kind === "seq" ? <SeqSvg d={d} tl={tl} heads={1 - sticky} legend={legend} /> : <StatesSvg d={d} tl={tl} legend={legend} />}
        </div>
        {d.kind === "seq" && sticky > 0 && <StickyHeads d={d} cam={cam} opacity={sticky} />}
      </div>

      <div style={{ position: "absolute", left: 40, right: 40, top: 592, height: 100, display: "flex", alignItems: "center", opacity: textIn }}>
        <p style={{ margin: 0, fontSize: 30, lineHeight: 1.35, fontWeight: tl.outro ? 600 : 400 }}>{text}</p>
      </div>
    </AbsoluteFill>
  );
};

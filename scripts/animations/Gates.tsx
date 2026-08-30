import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { c, font, mono } from "./palette";

export type Lang = "en" | "es";
export type GatesProps = { lang: Lang };

const copy = {
  en: {
    title: "Where a \"No\" goes",
    phases: ["Vision", "Global spec", "Domains", "Skeleton", "Growth cycle"],
    gate: ["Are the agronomic", "rules valid?"],
    no: "NO",
    who: "The coffee farmer decides",
    ret: "back to the founding agreement",
    caption: "A rule they reject is a specification defect, not a bug in the prototype.",
  },
  es: {
    title: "A dónde va un \"No\"",
    phases: ["Visión", "Nivel cero", "Dominios", "Esqueleto", "Crecimiento"],
    gate: ["¿Las reglas agronómicas", "son válidas?"],
    no: "NO",
    who: "Lo decide el caficultor",
    ret: "de vuelta al acuerdo fundacional",
    caption: "Una regla que el caficultor rechaza es un defecto de especificación, no un bug del prototipo.",
  },
} as const;

const BOX_W = 188;
const BOX_H = 92;
const GAP = 30;
const LEFT = 122;
const ROW_Y = 232;
const boxX = (i: number) => LEFT + i * (BOX_W + GAP);
const cx = (i: number) => boxX(i) + BOX_W / 2;

const GATE_CX = cx(3);
const GATE_CY = 430;
const GATE_RX = 168;
const GATE_RY = 62;

// The token's route: along the chain to phase 3, down into the gate, then the
// long way home. Each leg is one segment of a single 0..1 progress value.
const ROUTE: [number, number][] = [
  [cx(0), ROW_Y + BOX_H / 2],
  [cx(1), ROW_Y + BOX_H / 2],
  [cx(2), ROW_Y + BOX_H / 2],
  [cx(3), ROW_Y + BOX_H / 2],
  [GATE_CX, GATE_CY],
];
const RETURN: [number, number][] = [
  [GATE_CX, GATE_CY + GATE_RY],
  [GATE_CX, 566],
  [cx(1), 566],
  [cx(1), ROW_Y + BOX_H],
];

function along(points: [number, number][], p: number): [number, number] {
  const legs = points.length - 1;
  const s = Math.min(Math.max(p, 0), 1) * legs;
  const i = Math.min(Math.floor(s), legs - 1);
  const f = s - i;
  return [
    points[i][0] + (points[i + 1][0] - points[i][0]) * f,
    points[i][1] + (points[i + 1][1] - points[i][1]) * f,
  ];
}

export const Gates: React.FC<GatesProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = copy[lang];

  const forward = interpolate(frame, [30, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gateIn = spring({ frame: frame - 96, fps, config: { damping: 200 }, durationInFrames: 20 });
  const noIn = interpolate(frame, [124, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const back = interpolate(frame, [148, 214], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const capIn = interpolate(frame, [220, 244], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const rejected = frame >= 124;
  const [tx, ty] = back > 0 ? along(RETURN, back) : along(ROUTE, forward);
  const homeHot = interpolate(frame, [206, 220, 300], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, fontFamily: font, color: c.ink }}>
      <div style={{ position: "absolute", left: 64, top: 44, fontSize: 40, fontWeight: 700, letterSpacing: -0.6 }}>
        {t.title}
      </div>

      <svg viewBox="0 0 1280 720" width="1280" height="720" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <marker id="gt-head" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <path d="M0 0 L8 3.5 L0 7 z" fill={c.muted} />
          </marker>
          <marker id="gt-head-a" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <path d="M0 0 L8 3.5 L0 7 z" fill={c.accent} />
          </marker>
        </defs>

        {t.phases.map((phase, i) => {
          const pop = spring({ frame: frame - i * 4, fps, config: { damping: 200 }, durationInFrames: 18 });
          const hot = i === 1 ? homeHot : 0;
          return (
            <g key={phase} opacity={pop}>
              <rect
                x={boxX(i)} y={ROW_Y} width={BOX_W} height={BOX_H} rx="10"
                fill={hot > 0.05 ? c.accentSoft : c.taskFill}
                stroke={hot > 0.05 ? c.accent : c.taskStroke}
                strokeWidth={hot > 0.05 ? 3 : 1.6}
              />
              <text x={boxX(i) + 18} y={ROW_Y + 32} fontFamily={mono} fontSize="15" letterSpacing="1.6" fill={c.muted}>
                {`FASE ${i}`}
              </text>
              <text x={boxX(i) + 18} y={ROW_Y + 64} fontSize="22" fontWeight="600" fill={hot > 0.05 ? c.accent : c.taskInk}>
                {phase}
              </text>
            </g>
          );
        })}

        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${boxX(i) + BOX_W + 4} ${ROW_Y + BOX_H / 2} h${GAP - 14}`}
            stroke={c.muted} strokeWidth="2" fill="none" markerEnd="url(#gt-head)"
            opacity={interpolate(frame, [8 + i * 4, 22 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
        ))}

        <path
          d={`M${GATE_CX} ${ROW_Y + BOX_H + 4} V${GATE_CY - GATE_RY - 8}`}
          stroke={c.muted} strokeWidth="2" fill="none" markerEnd="url(#gt-head)" opacity={gateIn}
        />

        <g opacity={gateIn}>
          <path
            d={`M${GATE_CX} ${GATE_CY - GATE_RY} L${GATE_CX + GATE_RX} ${GATE_CY} L${GATE_CX} ${GATE_CY + GATE_RY} L${GATE_CX - GATE_RX} ${GATE_CY} z`}
            fill={rejected ? c.accentSoft : c.panel}
            stroke={rejected ? c.accent : c.taskStroke}
            strokeWidth={rejected ? 3 : 1.8}
          />
          <text x={GATE_CX} y={GATE_CY - 4} textAnchor="middle" fontSize="19" fontWeight="600" fill={c.ink}>
            {t.gate[0]}
          </text>
          <text x={GATE_CX} y={GATE_CY + 22} textAnchor="middle" fontSize="19" fontWeight="600" fill={c.ink}>
            {t.gate[1]}
          </text>
          <text x={GATE_CX + 18} y={ROW_Y + BOX_H + 32} fontFamily={mono} fontSize="15" letterSpacing="1.4" fill={c.muted}>
            {t.who.toUpperCase()}
          </text>
        </g>

        <path
          d={`M${GATE_CX} ${GATE_CY + GATE_RY} V566 H${cx(1)} V${ROW_Y + BOX_H + 10}`}
          stroke={c.accent} strokeWidth="3" fill="none" strokeDasharray="1200"
          strokeDashoffset={1200 - back * 1200}
          markerEnd={back > 0.98 ? "url(#gt-head-a)" : undefined}
        />

        <g opacity={noIn}>
          <rect x={GATE_CX - GATE_RX - 74} y={GATE_CY - 20} width="56" height="40" rx="8" fill={c.accent} />
          <text x={GATE_CX - GATE_RX - 46} y={GATE_CY + 8} textAnchor="middle" fontSize="21" fontWeight="700" fill="#ffffff">
            {t.no}
          </text>
        </g>

        <text
          x={(GATE_CX + cx(1)) / 2} y="594" textAnchor="middle" fontFamily={mono} fontSize="15"
          letterSpacing="1.4" fill={c.accent} opacity={interpolate(frame, [196, 216], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          {t.ret.toUpperCase()}
        </text>

        <circle cx={tx} cy={ty} r="13" fill={rejected ? c.accent : c.blue} opacity={frame < 26 ? 0 : 1} />
        <circle cx={tx} cy={ty} r="22" fill="none" stroke={rejected ? c.accent : c.blue} strokeWidth="2" opacity={(frame < 26 ? 0 : 1) * 0.35} />
      </svg>

      <div
        style={{
          position: "absolute", left: 64, right: 64, bottom: 34, fontSize: 25, fontWeight: 600,
          color: c.accent, opacity: capIn, transform: `translateY(${(1 - capIn) * 10}px)`,
        }}
      >
        {t.caption}
      </div>
    </AbsoluteFill>
  );
};

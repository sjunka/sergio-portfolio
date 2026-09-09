import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { c, font, mono } from "./palette";

export type Lang = "en" | "es";
export type ModelViewsProps = { lang: Lang };

const copy = {
  en: {
    title: "One model, five views",
    modelLabel: "THE MODEL",
    fieldLabel: "Role",
    before: "Platform engineer",
    after: "Mechatronics engineer",
    taskLabel: "Tasks",
    tasks: ["Set up SIL, HIL and the digital twins", "Plan the calibration strategy", "Design the sensor electronics"],
    views: ["Summary", "Flow", "Roles", "Breakdown", "EPF detail"],
    viewsLabel: "THE FIGURES",
    caption: "One field edited. Twenty five figures redrawn.",
  },
  es: {
    title: "Un modelo, cinco Vistas",
    modelLabel: "EL MODELO",
    fieldLabel: "Rol",
    before: "Ingeniero de plataforma",
    after: "Ingeniero de mecatrónica",
    taskLabel: "Tareas",
    tasks: ["Configurar los entornos SIL, HIL y los gemelos", "Planificar la estrategia de calibración", "Diseñar la electrónica de sensores"],
    views: ["Resumen", "Flujo", "Roles", "Descomposición", "Detalle EPF"],
    viewsLabel: "LAS FIGURAS",
    caption: "Un campo editado. Veinticinco figuras redibujadas.",
  },
} as const;

const RENAME = 96;
const FLASH = 116;

/** Each thumbnail is a different arrangement of the same three parts: roles,
 * tasks and work products. That difference is the whole point of the drawing. */
const Thumb: React.FC<{ kind: number; hot: number }> = ({ kind, hot }) => {
  const fill = c.taskFill;
  const stroke = hot > 0 ? c.accent : c.taskStroke;
  const w = hot > 0 ? 2.4 : 1.2;
  const box = (x: number, y: number, bw: number, bh: number, key: string) => (
    <rect key={key} x={x} y={y} width={bw} height={bh} rx="3" fill={fill} stroke={stroke} strokeWidth={w} />
  );
  const line = (d: string, key: string) => (
    <path key={key} d={d} fill="none" stroke={c.muted} strokeWidth="1.2" />
  );
  const dot = (x: number, y: number, key: string) => (
    <circle key={key} cx={x} cy={y} r="5" fill={hot > 0 ? c.accentSoft : c.panel} stroke={stroke} strokeWidth={w} />
  );

  const parts: React.ReactNode[] = [];
  if (kind === 0) {
    parts.push(<rect key="hdr" x="14" y="12" width="120" height="10" rx="3" fill={c.border} />);
    [0, 1, 2].forEach((i) => parts.push(dot(24 + i * 26, 40, `d${i}`)));
    [0, 1, 2].forEach((i) => parts.push(box(14, 60 + i * 26, 120, 18, `b${i}`)));
    parts.push(box(148, 60, 52, 44, "out"));
  } else if (kind === 1) {
    [0, 1, 2].forEach((i) => parts.push(box(58, 14 + i * 34, 100, 22, `b${i}`)));
    [0, 1].forEach((i) => parts.push(line(`M108 ${36 + i * 34} v12`, `l${i}`)));
    [0, 1, 2].forEach((i) => parts.push(line(`M158 ${25 + i * 34} h26`, `r${i}`)));
    [0, 1, 2].forEach((i) => parts.push(<rect key={`p${i}`} x="186" y={19 + i * 34} width="14" height="12" rx="2" fill={c.blueSoft} stroke={c.blue} strokeWidth="1" />));
  } else if (kind === 2) {
    [0, 1, 2].forEach((i) => parts.push(dot(24, 26 + i * 34, `d${i}`)));
    [0, 1, 2].forEach((i) => parts.push(box(64, 14 + i * 34, 92, 22, `b${i}`)));
    [0, 1, 2].forEach((i) => parts.push(line(`M34 ${26 + i * 34} h26`, `l${i}`)));
    [0, 2].forEach((i) => parts.push(dot(184, 26 + i * 34, `e${i}`)));
    [0, 2].forEach((i) => parts.push(line(`M158 ${26 + i * 34} h18`, `m${i}`)));
  } else if (kind === 3) {
    parts.push(box(66, 10, 84, 22, "root"));
    parts.push(line("M108 32 v14 M34 46 h148 M34 46 v12 M108 46 v12 M182 46 v12", "tree"));
    [0, 1, 2].forEach((i) => parts.push(box(8 + i * 74, 58, 52, 22, `b${i}`)));
  } else {
    parts.push(<rect key="band" x="6" y="6" width="196" height="126" rx="6" fill="none" stroke={c.border} strokeWidth="1" strokeDasharray="4 4" />);
    [0, 1, 2].forEach((i) => parts.push(dot(28, 32 + i * 36, `d${i}`)));
    [0, 1, 2].forEach((i) => parts.push(box(58, 22 + i * 36, 82, 20, `b${i}`)));
    [0, 1, 2].forEach((i) => parts.push(line(`M38 ${32 + i * 36} h14 M140 ${32 + i * 36} h14`, `l${i}`)));
    [0, 1, 2].forEach((i) => parts.push(<rect key={`p${i}`} x="156" y={26 + i * 36} width="14" height="12" rx="2" fill={c.blueSoft} stroke={c.blue} strokeWidth="1" />));
  }
  // Each layout is drawn from its own origin, so one nudge per kind centres it.
  const dy = [4, 16, 16, 28, 2][kind];
  return (
    <svg viewBox="0 0 208 138" width="208" height="138">
      <g transform={`translate(0 ${dy})`}>{parts}</g>
    </svg>
  );
};

export const ModelViews: React.FC<ModelViewsProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = copy[lang];

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 24 });
  const renamed = frame >= RENAME;
  // The field stays lit for a beat after the swap, so the eye lands on it
  // before the thumbnails start moving.
  const fieldHot = interpolate(frame, [RENAME - 6, RENAME, RENAME + 34], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capIn = interpolate(frame, [FLASH + 56, FLASH + 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, fontFamily: font, color: c.ink }}>
      <div style={{ position: "absolute", left: 64, top: 44, fontSize: 40, fontWeight: 700, letterSpacing: -0.6, opacity: enter }}>
        {t.title}
      </div>

      <div
        style={{
          position: "absolute", left: 64, top: 132, width: 420,
          background: c.panel, border: `1px solid ${c.border}`, borderRadius: 14, padding: 22,
          transform: `translateY(${(1 - enter) * 18}px)`, opacity: enter,
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, color: c.muted }}>{t.modelLabel}</div>
        <div style={{ fontSize: 17, color: c.muted, marginTop: 20 }}>{t.fieldLabel}</div>
        <div
          style={{
            marginTop: 8, padding: "12px 14px", borderRadius: 8, fontSize: 22, fontWeight: 600,
            border: `2px solid ${fieldHot > 0.05 ? c.accent : c.border}`,
            background: fieldHot > 0.05 ? c.accentSoft : c.panel,
            color: renamed ? c.accent : c.ink,
          }}
        >
          {renamed ? t.after : t.before}
        </div>
        <div style={{ fontSize: 17, color: c.muted, marginTop: 22 }}>{t.taskLabel}</div>
        {t.tasks.map((task, i) => (
          <div
            key={task}
            style={{
              marginTop: 8, padding: "10px 14px", borderRadius: 8, fontSize: 16,
              border: `1px solid ${c.taskStroke}`, background: c.taskFill, color: c.taskInk,
              opacity: interpolate(frame, [10 + i * 5, 26 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            {task}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 540, top: 132, width: 676 }}>
        <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, color: c.muted, opacity: enter }}>{t.viewsLabel}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 18 }}>
          {t.views.map((view, i) => {
            const pop = spring({ frame: frame - 18 - i * 5, fps, config: { damping: 200 }, durationInFrames: 20 });
            const hot = interpolate(frame, [FLASH + i * 6, FLASH + 8 + i * 6, FLASH + 34 + i * 6], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={view}
                style={{
                  width: 212, opacity: pop, transform: `scale(${0.94 + pop * 0.06 + hot * 0.03})`,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: hot > 0.05 ? c.accent : c.ink }}>{view}</div>
                <div
                  style={{
                    background: c.panel, borderRadius: 10, padding: 2,
                    border: `1.5px solid ${hot > 0.05 ? c.accent : c.border}`,
                  }}
                >
                  <Thumb kind={i} hot={hot} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute", left: 64, bottom: 44, fontSize: 26, fontWeight: 600,
          color: c.accent, opacity: capIn, transform: `translateY(${(1 - capIn) * 10}px)`,
        }}
      >
        {t.caption}
      </div>
    </AbsoluteFill>
  );
};

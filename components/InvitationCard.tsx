"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MAP_URL = "https://maps.app.goo.gl/xgmK8u5MJ6WbeM7R7";

type Phase = "closed" | "opening" | "open";

// 32 sparkles distributed along the loop path
const SPARKLES: { left: string; top: string; delay: string; size: number; color: string }[] = [
  // entry
  { left: "86%", top: "45%", delay: "0.26s", size: 6,  color: "#c9a96e" },
  { left: "81%", top: "44%", delay: "0.35s", size: 8,  color: "#f4a7b9" },
  { left: "77%", top: "45%", delay: "0.44s", size: 5,  color: "#ffffff" },
  { left: "73%", top: "44%", delay: "0.52s", size: 7,  color: "#e8d5b0" },
  { left: "69%", top: "43%", delay: "0.60s", size: 5,  color: "#f4a7b9" },
  { left: "65%", top: "43%", delay: "0.68s", size: 8,  color: "#c9a96e" },
  // pre-loop ascending
  { left: "62%", top: "42%", delay: "0.78s", size: 5,  color: "#ffffff" },
  { left: "59%", top: "39%", delay: "0.90s", size: 7,  color: "#f4a7b9" },
  { left: "57%", top: "36%", delay: "1.02s", size: 5,  color: "#c9a96e" },
  { left: "55%", top: "32%", delay: "1.14s", size: 8,  color: "#ffffff" },
  { left: "54%", top: "28%", delay: "1.26s", size: 6,  color: "#e8d5b0" },
  // loop top — highest sparkles
  { left: "55%", top: "25%", delay: "1.37s", size: 10, color: "#f4a7b9" },
  { left: "57%", top: "23%", delay: "1.46s", size: 7,  color: "#c9a96e" },
  { left: "60%", top: "22%", delay: "1.55s", size: 10, color: "#ffffff" },
  { left: "63%", top: "22%", delay: "1.64s", size: 7,  color: "#f4a7b9" },
  { left: "64%", top: "23%", delay: "1.72s", size: 8,  color: "#e8d5b0" },
  // loop descending
  { left: "63%", top: "27%", delay: "1.82s", size: 6,  color: "#c9a96e" },
  { left: "61%", top: "32%", delay: "1.92s", size: 7,  color: "#f4a7b9" },
  { left: "58%", top: "37%", delay: "2.02s", size: 5,  color: "#ffffff" },
  { left: "55%", top: "41%", delay: "2.12s", size: 8,  color: "#c9a96e" },
  { left: "52%", top: "45%", delay: "2.22s", size: 5,  color: "#e8d5b0" },
  // bottom of loop
  { left: "49%", top: "48%", delay: "2.35s", size: 7,  color: "#f4a7b9" },
  { left: "46%", top: "50%", delay: "2.47s", size: 5,  color: "#c9a96e" },
  { left: "42%", top: "51%", delay: "2.59s", size: 8,  color: "#ffffff" },
  { left: "39%", top: "50%", delay: "2.70s", size: 5,  color: "#f4a7b9" },
  // exit
  { left: "36%", top: "47%", delay: "2.82s", size: 7,  color: "#c9a96e" },
  { left: "32%", top: "44%", delay: "2.94s", size: 5,  color: "#e8d5b0" },
  { left: "28%", top: "43%", delay: "3.06s", size: 8,  color: "#f4a7b9" },
  { left: "24%", top: "44%", delay: "3.18s", size: 5,  color: "#c9a96e" },
  { left: "20%", top: "43%", delay: "3.30s", size: 7,  color: "#ffffff" },
  { left: "16%", top: "44%", delay: "3.42s", size: 5,  color: "#f4a7b9" },
  { left: "11%", top: "43%", delay: "3.52s", size: 6,  color: "#c9a96e" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function InvitationCard() {
  const [phase, setPhase] = useState<Phase>("closed");

  function handleOpen() {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), 3800);
  }

  if (phase === "open") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ animation: "card-reveal 0.7s ease-out forwards" }}
      >
        <OpenCard />
      </div>
    );
  }

  return (
    <ClosedCard isOpening={phase === "opening"} onClick={handleOpen} />
  );
}

// ─── Closed card (full screen) ────────────────────────────────────────────────

function ClosedCard({ isOpening, onClick }: { isOpening: boolean; onClick: () => void }) {
  function handleTouchEnd(e: React.TouchEvent) {
    if (isOpening) return;
    e.preventDefault();
    onClick();
  }

  return (
    <div
      className="fixed inset-0 z-10 cursor-pointer select-none"
      onClick={isOpening ? undefined : onClick}
      onTouchEnd={handleTouchEnd}
      aria-label="Abrir convite"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{ touchAction: "manipulation" }}
    >
      {/* ── Top half ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 flex flex-col items-center justify-end pb-10 overflow-hidden"
        style={{
          height: "50%",
          background: "linear-gradient(180deg, #fdf8f2 0%, #f9e8ee 70%, #f5e0e8 100%)",
          animation: isOpening ? "unfold-top 1.0s ease-in forwards" : "none",
          animationDelay: isOpening ? "0.25s" : "0s",
        }}
      >
        {/* Corner ornaments */}
        <CornerOrnament pos="top-left" />
        <CornerOrnament pos="top-right" />

        {/* Top border frame */}
        <div className="absolute inset-x-6 top-6 bottom-0 pointer-events-none"
          style={{ border: "1px solid #e8d5b0", borderBottom: "none", opacity: 0.5 }} />

        <div className="flex flex-col items-center gap-3 px-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <span style={{ color: "#c9a96e", fontSize: 13 }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>

          <p className="font-script text-xl tracking-wide text-center" style={{ color: "#a07060" }}>
            você está convidada
          </p>

          <div className="flex gap-3 items-center" style={{ color: "#e8d5b0", fontSize: 18 }}>
            <span>✿</span>
            <span style={{ color: "#f4a7b9", fontSize: 22 }}>✿</span>
            <span>✿</span>
          </div>
        </div>

        {/* Fold shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(180,120,120,0.07))" }} />
      </div>

      {/* ── Bottom half ───────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-start pt-10 overflow-hidden"
        style={{
          height: "50%",
          background: "linear-gradient(0deg, #fdf8f2 0%, #f5e8e0 70%, #f5e0e8 100%)",
          animation: isOpening ? "unfold-bottom 1.0s ease-in forwards" : "none",
          animationDelay: isOpening ? "0.25s" : "0s",
        }}
      >
        {/* Bottom border frame */}
        <div className="absolute inset-x-6 top-0 bottom-6 pointer-events-none"
          style={{ border: "1px solid #e8d5b0", borderTop: "none", opacity: 0.5 }} />

        <CornerOrnament pos="bottom-left" />
        <CornerOrnament pos="bottom-right" />

        <div className="flex flex-col items-center gap-3 px-8 relative z-10">
          <p className="font-heading font-light tracking-widest uppercase text-sm" style={{ color: "#a07060", letterSpacing: "0.25em" }}>
            para os 15 anos de
          </p>

          <h1 className="font-script leading-none" style={{ fontSize: "clamp(2.8rem, 10vw, 5rem)", color: "#e07a99" }}>
            Vanessa
          </h1>

          <p className="font-heading tracking-widest text-sm" style={{ color: "#c9a96e", letterSpacing: "0.3em" }}>
            06 · 09 · 2026
          </p>

          <p className="font-heading text-xs tracking-widest uppercase" style={{ color: "#a07060", letterSpacing: "0.2em" }}>
            Jardim Encantado
          </p>

          {!isOpening && (
            <p className="font-script text-sm mt-2 animate-gentle-pulse" style={{ color: "#c9a96e" }}>
              toque para abrir ✨
            </p>
          )}
        </div>

        {/* Fold shadow */}
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, transparent, rgba(180,120,120,0.07))" }} />
      </div>

      {/* ── Fold line ─────────────────────────── */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: "50%",
          background: "linear-gradient(to right, transparent 5%, #c9a96e50 30%, #c9a96e70 50%, #c9a96e50 70%, transparent 95%)",
          zIndex: 5,
        }}
      />

      {/* ── Wax seal ──────────────────────────── */}
      <WaxSeal isBreaking={isOpening} />
    </div>
  );
}

// ─── Wax seal ─────────────────────────────────────────────────────────────────

function WaxSeal({ isBreaking }: { isBreaking: boolean }) {
  const pts = [0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => {
    const r = (angle * Math.PI) / 180;
    return {
      x: Math.round((45 + 31 * Math.cos(r)) * 100) / 100,
      y: Math.round((45 + 31 * Math.sin(r)) * 100) / 100,
    };
  });

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        zIndex: 15,
        animation: isBreaking ? "seal-break 0.45s ease-out forwards" : "none",
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg width="92" height="92" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="seal-grad" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#e8849c" />
            <stop offset="60%" stopColor="#c0496b" />
            <stop offset="100%" stopColor="#9e3255" />
          </radialGradient>
          <filter id="seal-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle cx="45" cy="45" r="44" fill="none" stroke="#c9a96e" strokeWidth="0.6" opacity="0.35" />

        {/* Main seal */}
        <circle cx="45" cy="45" r="38" fill="url(#seal-grad)" />

        {/* Scalloped / dashed border */}
        <circle cx="45" cy="45" r="35" fill="none" stroke="#e8d5b0" strokeWidth="1.4" strokeDasharray="5,2.8" opacity="0.7" />

        {/* Inner ring */}
        <circle cx="45" cy="45" r="27" fill="none" stroke="#e8d5b0" strokeWidth="0.7" opacity="0.4" />

        {/* Decorative dots on the inner border */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="#e8d5b0" opacity="0.55" />
        ))}

        {/* Small fleur ornaments */}
        <text x="45" y="20" textAnchor="middle" fontSize="7" fill="#e8d5b0" opacity="0.5" fontFamily="serif">✿</text>
        <text x="45" y="74" textAnchor="middle" fontSize="7" fill="#e8d5b0" opacity="0.5" fontFamily="serif">✿</text>

        {/* Monogram */}
        <text x="45" y="53" textAnchor="middle" fontSize="28" fontFamily="Georgia, 'Cormorant Garamond', serif" fill="#fdf8f2" opacity="0.92">
          V
        </text>
      </svg>
    </div>
  );
}

// ─── Flying butterfly + sparkle trail ────────────────────────────────────────

// Side-profile butterfly SVG (facing left, wings flap up/down)
function SideButterfly() {
  const wingStyle = (origin: string): React.CSSProperties => ({
    transformBox: "fill-box",
    transformOrigin: origin,
    animation: "wing-flap-side 0.65s ease-in-out infinite",
  });

  return (
    <svg width="96" height="67" viewBox="0 0 80 56" fill="none" aria-hidden="true">
      {/* Upper wing (above body) — folds downward toward body */}
      <g style={wingStyle("center bottom")}>
        <path
          d="M20,27 C18,18 22,8 34,4 C46,1 58,8 62,19 C64,25 62,27 52,27 Z"
          fill="#e07a99" opacity="0.88"
        />
        {/* inner lighter */}
        <path
          d="M22,27 C21,20 26,12 36,9 C46,7 56,12 59,21 C60,25 58,27 50,27 Z"
          fill="#f9b8cc" opacity="0.35"
        />
        <circle cx="34" cy="16" r="3.5" fill="white" opacity="0.2" />
        <circle cx="46" cy="10" r="2" fill="white" opacity="0.15" />
        {/* vein */}
        <path d="M22,27 C28,20 38,10 46,6" stroke="#e07a99" strokeWidth="0.4" fill="none" opacity="0.22" />
      </g>

      {/* Lower wing (below body) — smaller, folds upward toward body */}
      <g style={wingStyle("center top")}>
        <path
          d="M23,30 C21,38 24,46 34,50 C42,52 54,48 58,40 C60,36 58,30 48,30 Z"
          fill="#e07a99" opacity="0.72"
        />
        <path
          d="M26,30 C25,36 28,43 36,46 C43,48 52,44 55,38 C56,35 55,30 47,30 Z"
          fill="#f9b8cc" opacity="0.28"
        />
        <circle cx="36" cy="43" r="2.2" fill="white" opacity="0.15" />
      </g>

      {/* Body */}
      <ellipse cx="38" cy="29" rx="22" ry="4" fill="#8B6F6F" opacity="0.82" />
      {/* Head */}
      <circle cx="16" cy="29" r="5" fill="#8B6F6F" opacity="0.78" />
      {/* Eye */}
      <circle cx="13" cy="28" r="1.4" fill="white" opacity="0.5" />

      {/* Antennae (facing left — going forward-up) */}
      <path d="M17,24 C14,17 11,11 7,7" stroke="#9a7a6a" strokeWidth="0.9" fill="none" opacity="0.65" strokeLinecap="round" />
      <path d="M20,24 C18,17 16,11 14,7" stroke="#9a7a6a" strokeWidth="0.9" fill="none" opacity="0.65" strokeLinecap="round" />
      <circle cx="7"  cy="7"  r="1.5" fill="#9a7a6a" opacity="0.65" />
      <circle cx="14" cy="7"  r="1.5" fill="#9a7a6a" opacity="0.65" />
    </svg>
  );
}

function FlyingButterflyAnim() {
  // 12 keyframes for a fluid organic loop: enters right → flies in → ascends into loop → curves over top → descends → exits left
  const ts = [0, 0.07, 0.16, 0.26, 0.35, 0.44, 0.52, 0.61, 0.70, 0.80, 0.90, 1.0];

  const xPath = [
    "calc(110vw + 80px)", "90vw",  "76vw",  "63vw",
    "58vw",               "64vw",  "62vw",  "54vw",
    "45vw",               "34vw",  "19vw",  "calc(-110vw - 80px)",
  ];
  const yPath = [
    "0vh",   "-1vh",  "-3vh",  "-7vh",
    "-17vh", "-27vh", "-25vh", "-14vh",
    "3vh",   "-2vh",  "-1vh",  "0vh",
  ];
  // banking: nose-up while ascending, nose-down over loop top, levels on exit
  const rot = [-5, -5, -9, -16, -24, -2, 17, 13, -2, -8, -7, -5];
  const ops = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0.6, 0];

  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {/* Butterfly */}
      <motion.div
        style={{ position: "absolute", top: "45%" }}
        initial={{ x: "calc(110vw + 80px)", y: "0vh", rotate: -5, opacity: 0 }}
        animate={{ x: xPath, y: yPath, rotate: rot, opacity: ops }}
        transition={{
          x:       { duration: 3.6, ease: [0.25, 0.1, 0.25, 1.0], times: ts },
          y:       { duration: 3.6, ease: [0.42, 0, 0.58, 1],     times: ts },
          rotate:  { duration: 3.6, ease: [0.42, 0, 0.58, 1],     times: ts },
          opacity: { duration: 3.6, ease: "linear",                times: ts },
        }}
      >
        <SideButterfly />
      </motion.div>

      {/* Sparkle trail */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size}px ${s.color}, 0 0 ${s.size * 3}px ${s.color}, 0 0 ${s.size * 6}px ${s.color}60`,
            opacity: 0,
            animation: "sparkle-trail 1.0s ease-in-out forwards",
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

// ─── Corner ornament ──────────────────────────────────────────────────────────

type CornerPos = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerOrnament({ pos }: { pos: CornerPos }) {
  const style: React.CSSProperties = {
    position: "absolute",
    color: "#c9a96e",
    opacity: 0.45,
    fontSize: 18,
    lineHeight: 1,
    ...(pos === "top-left"     && { top: 10, left: 12 }),
    ...(pos === "top-right"    && { top: 10, right: 12 }),
    ...(pos === "bottom-left"  && { bottom: 10, left: 12 }),
    ...(pos === "bottom-right" && { bottom: 10, right: 12 }),
  };
  return <span style={style} aria-hidden="true">✦</span>;
}

// ─── Open card (revealed after animation) ────────────────────────────────────

function OpenCard() {
  return (
    <div
      className="invitation-shadow rounded-2xl overflow-hidden"
      style={{
        width: "min(480px, 95vw)",
        background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 40%, #fdf8f2 70%, #f5e6d3 100%)",
        border: "1px solid #e8d5b0",
      }}
    >
      <div className="h-2" style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }} />

      <div className="px-8 py-10 text-center">
        <Ornament />

        <p className="font-script text-base mb-2" style={{ color: "#a07060" }}>com muito amor, convidamos</p>
        <p className="font-script text-base mb-6" style={{ color: "#c9a96e" }}>você para celebrar</p>

        <p className="font-heading font-light tracking-widest uppercase mb-1"
          style={{ fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)", color: "#a07060", letterSpacing: "0.35em" }}>
          o aniversário de
        </p>

        <h2 className="font-script mb-1"
          style={{ fontSize: "clamp(3rem, 12vw, 4.5rem)", color: "#e07a99", lineHeight: 1.1 }}>
          Vanessa
        </h2>

        <div className="shimmer-text font-heading font-semibold text-4xl mb-6">15</div>

        <Divider />

        <div className="space-y-3 my-6 font-heading">
          <DetailRow icon="🌸" label="Tema"    value="Jardim Encantado" />
          <DetailRow icon="📅" label="Data"    value="06 de setembro de 2026" />
          <DetailRow icon="🕗" label="Horário" value="20h" />
          <DetailRow icon="🏛️" label="Local"   value="Salão Festa Lumaki" />
          <DetailRow icon="📍" label="Endereço" value="Vicentina Maria Fidélis, 387 · Vicentina" />
        </div>

        <Divider />

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #c9a96e, #e8d5b0)", color: "#3d2c1e", border: "1px solid #c9a96e" }}
          >
            <span>📍</span><span>Ver no Mapa</span>
          </a>

          <Link
            href="/presentes"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "transparent", color: "#e07a99", border: "1px solid #f4a7b9" }}
          >
            <span>🎁</span><span>Lista de Presentes</span>
          </Link>

          <Link
            href="/confirmar"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f4a7b9, #e07a99)", color: "white" }}
          >
            <span>✓</span><span>Confirmar Presença</span>
          </Link>
        </div>

        <div className="mt-8">
          <Ornament />
          <p className="font-script text-sm mt-3" style={{ color: "#c9a96e" }}>te esperamos lá ✨</p>
        </div>
      </div>

      <div className="h-2" style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }} />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "#c9a96e" }}>
        {icon} {label}
      </span>
      <span className="text-base font-light" style={{ color: "#6b4c3b" }}>{value}</span>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #e8d5b0)" }} />
      <span style={{ color: "#c9a96e" }}>✦</span>
      <span style={{ color: "#e07a99", fontSize: 10 }}>✿</span>
      <span style={{ color: "#c9a96e" }}>✦</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #e8d5b0)" }} />
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <span style={{ color: "#e8d5b0", fontSize: 12 }}>✦</span>
      <span style={{ color: "#f4a7b9", fontSize: 16 }}>✿</span>
      <span style={{ color: "#e8d5b0", fontSize: 12 }}>✦</span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface ButterflyShapeProps {
  size: number;
  color: string;
  accentColor: string;
  flapDuration: string;
  flapDelay: string;
}

function ButterflyShape({ size, color, accentColor, flapDuration, flapDelay }: ButterflyShapeProps) {
  const h = size * 0.72;

  const leftWingStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "right center",
    animation: `wing-flap ${flapDuration} ease-in-out infinite`,
    animationDelay: flapDelay,
  };

  const rightWingStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "left center",
    animation: `wing-flap ${flapDuration} ease-in-out infinite`,
    animationDelay: flapDelay,
  };

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 100 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      overflow="visible"
    >
      {/* ── Left wings ─────────────────────────────── */}
      <g style={leftWingStyle}>
        {/* Upper left wing */}
        <path
          d="M50,34 C46,22 36,9 21,7 C9,6 1,16 3,27 C5,37 20,43 50,44"
          fill={color}
          opacity="0.88"
        />
        {/* Upper left wing — lighter inner highlight */}
        <path
          d="M50,34 C44,26 34,18 24,16 C16,15 10,20 12,28 C14,35 30,42 50,44"
          fill={accentColor}
          opacity="0.35"
        />
        {/* Lower left wing */}
        <path
          d="M50,44 C36,46 17,50 13,59 C10,66 19,72 31,68 C41,64 48,55 50,50"
          fill={color}
          opacity="0.72"
        />
        {/* Lower left — inner highlight */}
        <path
          d="M50,44 C40,47 24,52 22,60 C20,65 28,69 36,65 C44,61 49,53 50,50"
          fill={accentColor}
          opacity="0.28"
        />

        {/* Wing spot — upper */}
        <circle cx="19" cy="23" r="3.8" fill="white" opacity="0.22" />
        <circle cx="31" cy="14" r="2.2" fill="white" opacity="0.18" />
        {/* Wing spot — lower */}
        <circle cx="20" cy="58" r="2.4" fill="white" opacity="0.18" />

        {/* Vein lines — upper left */}
        <path d="M50,40 C40,34 28,20 20,14" stroke={color} strokeWidth="0.4" opacity="0.25" fill="none" />
        <path d="M50,42 C38,40 22,38 10,30" stroke={color} strokeWidth="0.4" opacity="0.2" fill="none" />
        {/* Vein — lower */}
        <path d="M50,46 C40,50 26,54 16,62" stroke={color} strokeWidth="0.35" opacity="0.2" fill="none" />
      </g>

      {/* ── Right wings ────────────────────────────── */}
      <g style={rightWingStyle}>
        {/* Upper right wing */}
        <path
          d="M50,34 C54,22 64,9 79,7 C91,6 99,16 97,27 C95,37 80,43 50,44"
          fill={color}
          opacity="0.88"
        />
        {/* Upper right wing — lighter inner highlight */}
        <path
          d="M50,34 C56,26 66,18 76,16 C84,15 90,20 88,28 C86,35 70,42 50,44"
          fill={accentColor}
          opacity="0.35"
        />
        {/* Lower right wing */}
        <path
          d="M50,44 C64,46 83,50 87,59 C90,66 81,72 69,68 C59,64 52,55 50,50"
          fill={color}
          opacity="0.72"
        />
        {/* Lower right — inner highlight */}
        <path
          d="M50,44 C60,47 76,52 78,60 C80,65 72,69 64,65 C56,61 51,53 50,50"
          fill={accentColor}
          opacity="0.28"
        />

        {/* Wing spot — upper */}
        <circle cx="81" cy="23" r="3.8" fill="white" opacity="0.22" />
        <circle cx="69" cy="14" r="2.2" fill="white" opacity="0.18" />
        {/* Wing spot — lower */}
        <circle cx="80" cy="58" r="2.4" fill="white" opacity="0.18" />

        {/* Vein lines — upper right */}
        <path d="M50,40 C60,34 72,20 80,14" stroke={color} strokeWidth="0.4" opacity="0.25" fill="none" />
        <path d="M50,42 C62,40 78,38 90,30" stroke={color} strokeWidth="0.4" opacity="0.2" fill="none" />
        {/* Vein — lower */}
        <path d="M50,46 C60,50 74,54 84,62" stroke={color} strokeWidth="0.35" opacity="0.2" fill="none" />
      </g>

      {/* ── Body ───────────────────────────────────── */}
      <ellipse cx="50" cy="42" rx="2.4" ry="10" fill="#8B6F6F" opacity="0.75" />
      <ellipse cx="50" cy="34" rx="1.8" ry="2.8" fill="#9a7a6a" opacity="0.65" />

      {/* ── Antennae ───────────────────────────────── */}
      <path d="M49,32 C47,25 43,18 37,13" stroke="#9a7a6a" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M51,32 C53,25 57,18 63,13" stroke="#9a7a6a" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round" />
      <circle cx="37" cy="13" r="1.8" fill="#9a7a6a" opacity="0.6" />
      <circle cx="63" cy="13" r="1.8" fill="#9a7a6a" opacity="0.6" />
    </svg>
  );
}

// ── Layer with all butterflies ──────────────────────────────────────────────

interface ButterflyConfig {
  top: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  accentColor: string;
  floatDuration: string;
  floatDelay: string;
  flapDuration: string;
  flapDelay: string;
}

const BUTTERFLY_CONFIGS: ButterflyConfig[] = [
  {
    top: "7%", left: "4%",
    size: 54, color: "#e07a99", accentColor: "#f9b8cc",
    floatDuration: "4.6s", floatDelay: "0s",
    flapDuration: "1.8s", flapDelay: "0s",
  },
  {
    top: "10%", right: "5%",
    size: 46, color: "#c9a96e", accentColor: "#eeddb0",
    floatDuration: "5.4s", floatDelay: "1.4s",
    flapDuration: "2.1s", flapDelay: "0.5s",
  },
  {
    top: "55%", left: "2%",
    size: 40, color: "#f4a7b9", accentColor: "#fce4ec",
    floatDuration: "6.2s", floatDelay: "2.2s",
    flapDuration: "1.6s", flapDelay: "0.9s",
  },
  {
    top: "65%", right: "3%",
    size: 48, color: "#d4829a", accentColor: "#f4a7b9",
    floatDuration: "4.4s", floatDelay: "0.8s",
    flapDuration: "2.3s", flapDelay: "0.3s",
  },
  {
    top: "32%", right: "2%",
    size: 36, color: "#c9a96e", accentColor: "#e8d5b0",
    floatDuration: "5.8s", floatDelay: "3.1s",
    flapDuration: "2.0s", flapDelay: "1.2s",
  },
];

export function ButterflyLayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {BUTTERFLY_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          className="absolute animate-float animate-drift"
          style={{
            top: cfg.top,
            left: cfg.left,
            right: cfg.right,
            animationDuration: cfg.floatDuration,
            animationDelay: cfg.floatDelay,
          }}
        >
          <ButterflyShape
            size={cfg.size}
            color={cfg.color}
            accentColor={cfg.accentColor}
            flapDuration={cfg.flapDuration}
            flapDelay={cfg.flapDelay}
          />
        </div>
      ))}
    </div>
  );
}

export default ButterflyLayer;

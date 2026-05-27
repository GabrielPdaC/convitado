"use client";

import { useEffect, useState } from "react";

interface ButterflyProps {
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

function ButterflyShape({ size = 28, color = "#e07a99" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left wings */}
      <ellipse cx="10" cy="10" rx="10" ry="8" fill={color} opacity="0.7" />
      <ellipse cx="8" cy="18" rx="7" ry="5" fill={color} opacity="0.5" />
      {/* Right wings */}
      <ellipse cx="30" cy="10" rx="10" ry="8" fill={color} opacity="0.7" />
      <ellipse cx="32" cy="18" rx="7" ry="5" fill={color} opacity="0.5" />
      {/* Body */}
      <ellipse cx="20" cy="14" rx="2" ry="7" fill="#a07060" opacity="0.8" />
      {/* Antennae */}
      <line x1="20" y1="7" x2="14" y2="2" stroke="#a07060" strokeWidth="0.8" opacity="0.6" />
      <line x1="20" y1="7" x2="26" y2="2" stroke="#a07060" strokeWidth="0.8" opacity="0.6" />
      <circle cx="13" cy="1.5" r="1" fill="#a07060" opacity="0.6" />
      <circle cx="27" cy="1.5" r="1" fill="#a07060" opacity="0.6" />
    </svg>
  );
}

export default function Butterfly({ style, size, color }: ButterflyProps) {
  return (
    <div
      className="absolute pointer-events-none select-none animate-float animate-drift"
      style={style}
    >
      <ButterflyShape size={size} color={color} />
    </div>
  );
}

const BUTTERFLY_CONFIGS = [
  { top: "8%", left: "6%", size: 24, color: "#e07a99", delay: "0s", duration: "4.5s" },
  { top: "15%", right: "8%", size: 20, color: "#c9a96e", delay: "1.2s", duration: "5s" },
  { top: "55%", left: "3%", size: 18, color: "#f4a7b9", delay: "2s", duration: "6s" },
  { top: "70%", right: "5%", size: 22, color: "#e07a99", delay: "0.7s", duration: "4s" },
  { top: "35%", left: "88%", size: 16, color: "#c9a96e", delay: "3s", duration: "5.5s" },
];

export function ButterflyLayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {BUTTERFLY_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          className="absolute animate-float animate-drift"
          style={{
            top: cfg.top,
            left: "left" in cfg ? cfg.left : undefined,
            right: "right" in cfg ? cfg.right : undefined,
            animationDelay: cfg.delay,
            animationDuration: cfg.duration,
          }}
        >
          <ButterflyShape size={cfg.size} color={cfg.color} />
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  rotate: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = ["#f4a7b9", "#fce4ec", "#e8d5b0", "#f9e4ec", "#f0d0c0"];

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 10,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 15}s`,
    rotate: Math.random() * 360,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    opacity: 0.5 + Math.random() * 0.4,
  }));
}

function PetalShape({ size, color, rotate }: { size: number; color: string; rotate: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <ellipse cx="5" cy="6.5" rx="4.5" ry="6" fill={color} />
    </svg>
  );
}

export default function FallingPetals({ count = 12 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(generatePetals(count));
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: p.left,
            top: "-20px",
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          <PetalShape size={p.size} color={p.color} rotate={p.rotate} />
        </div>
      ))}
    </div>
  );
}

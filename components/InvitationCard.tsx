"use client";

import { useState } from "react";
import Link from "next/link";

const MAP_URL = "https://maps.app.goo.gl/xgmK8u5MJ6WbeM7R7";

export default function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      {!isOpen ? (
        <ClosedEnvelope onOpen={() => setIsOpen(true)} />
      ) : (
        <OpenCard />
      )}
    </div>
  );
}

function ClosedEnvelope({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative cursor-pointer focus:outline-none"
      aria-label="Abrir convite"
    >
      <div
        className="relative invitation-shadow rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
        style={{
          width: "min(340px, 90vw)",
          background: "linear-gradient(145deg, #fdf8f2 0%, #f9e4ec 50%, #f5e6d3 100%)",
          border: "1px solid #e8d5b0",
        }}
      >
        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 right-0 h-24 overflow-hidden"
          style={{ zIndex: 2 }}
        >
          <svg viewBox="0 0 340 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 0 L170 80 L340 0 Z"
              fill="url(#flap-gradient)"
              stroke="#e8d5b0"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="flap-gradient" x1="0" y1="0" x2="340" y2="96">
                <stop offset="0%" stopColor="#f5e6d3" />
                <stop offset="100%" stopColor="#f9e4ec" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Card body */}
        <div className="relative px-8 pt-28 pb-10 text-center" style={{ zIndex: 1 }}>
          {/* Decorative line */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <span style={{ color: "#c9a96e", fontSize: 14 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>

          <p className="font-script text-lg mb-1" style={{ color: "#a07060" }}>
            você está convidada para os
          </p>

          <h1
            className="font-script leading-tight mb-1"
            style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", color: "#e07a99" }}
          >
            15 anos
          </h1>

          <h2
            className="font-heading font-light tracking-widest uppercase mb-4"
            style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", color: "#6b4c3b", letterSpacing: "0.3em" }}
          >
            Vanessa
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <span style={{ color: "#c9a96e", fontSize: 14 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>

          <p
            className="font-heading text-sm tracking-wider"
            style={{ color: "#a07060" }}
          >
            clique para abrir
          </p>

          {/* Wax seal decoration */}
          <div className="absolute bottom-4 right-4 opacity-20">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#c9a96e" />
              <text x="20" y="25" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif">V</text>
            </svg>
          </div>
        </div>
      </div>

      <p
        className="mt-4 font-script text-sm animate-gentle-pulse"
        style={{ color: "#c9a96e" }}
      >
        toque para abrir ✨
      </p>
    </button>
  );
}

function OpenCard() {
  return (
    <div
      className="invitation-shadow rounded-2xl overflow-hidden"
      style={{
        width: "min(480px, 95vw)",
        background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 40%, #fdf8f2 70%, #f5e6d3 100%)",
        border: "1px solid #e8d5b0",
        animation: "card-reveal 0.6s ease-out forwards",
      }}
    >
      {/* Top ribbon */}
      <div
        className="h-2 w-full"
        style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }}
      />

      <div className="px-8 py-10 text-center">
        {/* Top ornament */}
        <Ornament />

        <p className="font-script text-base mb-2" style={{ color: "#a07060" }}>
          com muito amor, convidamos
        </p>
        <p className="font-script text-base mb-6" style={{ color: "#c9a96e" }}>
          você para celebrar
        </p>

        <h1
          className="font-heading font-light tracking-widest uppercase mb-1"
          style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", color: "#a07060", letterSpacing: "0.35em" }}
        >
          o aniversário de
        </h1>

        <h2
          className="font-script mb-1"
          style={{ fontSize: "clamp(3rem, 12vw, 4.5rem)", color: "#e07a99", lineHeight: 1.1 }}
        >
          Vanessa
        </h2>

        <div className="shimmer-text font-heading font-semibold text-4xl mb-6">15</div>

        {/* Divider */}
        <Divider />

        {/* Event details */}
        <div className="space-y-3 my-6 font-heading">
          <DetailRow icon="🌸" label="Tema" value="Jardim Encantado" />
          <DetailRow icon="📅" label="Data" value="06 de setembro de 2026" />
          <DetailRow icon="🕗" label="Horário" value="20h" />
          <DetailRow icon="🏛️" label="Local" value="Salão Festa Lumaki" />
          <DetailRow icon="📍" label="Endereço" value="Vicentina Maria Fidélis, 387 · Vicentina" />
        </div>

        <Divider />

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #e8d5b0)",
              color: "#3d2c1e",
              border: "1px solid #c9a96e",
            }}
          >
            <span>📍</span>
            <span>Ver no Mapa</span>
          </a>

          <Link
            href="/presentes"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "transparent",
              color: "#e07a99",
              border: "1px solid #f4a7b9",
            }}
          >
            <span>🎁</span>
            <span>Lista de Presentes</span>
          </Link>

          <Link
            href="/confirmar"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f4a7b9, #e07a99)",
              color: "white",
            }}
          >
            <span>✓</span>
            <span>Confirmar Presença</span>
          </Link>
        </div>

        {/* Bottom ornament */}
        <div className="mt-8">
          <Ornament />
          <p className="font-script text-sm mt-3" style={{ color: "#c9a96e" }}>
            te esperamos lá ✨
          </p>
        </div>
      </div>

      {/* Bottom ribbon */}
      <div
        className="h-2 w-full"
        style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }}
      />
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "#c9a96e" }}>
        {icon} {label}
      </span>
      <span className="text-base font-light" style={{ color: "#6b4c3b" }}>
        {value}
      </span>
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

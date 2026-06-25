"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, MapPinIcon, GiftIcon } from "@/components/Icons";

const MAP_URL = "https://maps.app.goo.gl/xgmK8u5MJ6WbeM7R7";

const IVORY = "#f2f1e4";
const IVORY_EDGE = "#e7e6d4";
const BURGUNDY = "#a3155f";

type Phase = "closed" | "opening" | "open";

// ─── Main component ───────────────────────────────────────────────────────────

export default function InvitationCard() {
  const [phase, setPhase] = useState<Phase>("closed");

  function handleOpen() {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), 1650);
  }

  if (phase === "open") {
    return (
      <div style={{ animation: "card-reveal 0.7s ease-out forwards" }}>
        <OpenCard />
      </div>
    );
  }

  return <ClosedCard isOpening={phase === "opening"} onClick={handleOpen} />;
}

// ─── Closed card — faithful to page 1 of the PDF ──────────────────────────────

function ClosedCard({ isOpening, onClick }: { isOpening: boolean; onClick: () => void }) {
  function handleTouchEnd(e: React.TouchEvent) {
    if (isOpening) return;
    e.preventDefault();
    onClick();
  }

  const halfBase: React.CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%",
    overflow: "visible",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      className="fixed inset-0 z-10 cursor-pointer select-none"
      onClick={isOpening ? undefined : onClick}
      onTouchEnd={handleTouchEnd}
      aria-label="Abrir convite"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{ touchAction: "manipulation", perspective: "1800px", background: IVORY }}
    >
      {/* ── Left door ─────────────────────────── */}
      <div
        style={{
          ...halfBase,
          left: 0,
          transformOrigin: "left center",
          background: `linear-gradient(100deg, ${IVORY} 0%, #f4f3e8 70%, #eceadb 100%)`,
          animation: isOpening ? "door-left 1.15s cubic-bezier(0.5,0,0.75,0.2) 0.35s forwards" : "none",
          boxShadow: "inset -16px 0 26px -18px rgba(120,110,90,0.35)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/corner-tl.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", top: -4, left: -8, width: "clamp(175px, 54vw, 235px)" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/corner-bl.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", bottom: -6, left: -8, width: "clamp(160px, 50vw, 215px)" }}
        />
      </div>

      {/* ── Right door ────────────────────────── */}
      <div
        style={{
          ...halfBase,
          right: 0,
          transformOrigin: "right center",
          background: `linear-gradient(260deg, ${IVORY} 0%, #f4f3e8 70%, #eceadb 100%)`,
          animation: isOpening ? "door-right 1.15s cubic-bezier(0.5,0,0.75,0.2) 0.35s forwards" : "none",
          boxShadow: "inset 16px 0 26px -18px rgba(120,110,90,0.35)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/bouquet-2.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", top: -8, right: -10, width: "clamp(185px, 58vw, 245px)" }}
        />
        {/* ramo cascading from the top bouquet toward the seal */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/ramo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "31vw",
            right: "3%",
            width: "clamp(62px, 21vw, 92px)",
            transform: "rotate(16deg)",
            transformOrigin: "top right",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/bouquet-1.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", bottom: -10, right: -10, width: "clamp(195px, 60vw, 255px)" }}
        />
      </div>

      {/* ── Center fold line ──────────────────── */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: "50%",
          width: 2,
          transform: "translateX(-1px)",
          background:
            "linear-gradient(to bottom, transparent 3%, rgba(150,135,110,0.18) 20%, rgba(150,135,110,0.28) 50%, rgba(150,135,110,0.18) 80%, transparent 97%)",
          zIndex: 12,
          opacity: isOpening ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Wax seal ──────────────────────────── */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          zIndex: 20,
          transform: "translate(-50%, -50%)",
          animation: isOpening
            ? "seal-break 0.6s ease-out forwards"
            : "seal-pulse 2.8s ease-in-out infinite",
          width: "clamp(190px, 54vw, 280px)",
        }}
      >
        <WaxSeal />
      </div>
    </div>
  );
}

// ─── Wax seal (white melted wax with V monogram) ──────────────────────────────

const SEAL_BLOB =
  "M 100.00 14.00 C 111.79 14.45, 123.24 22.73, 134.71 27.92 C 146.18 33.11, 161.26 36.16, 168.80 45.13 C 176.34 54.10, 176.79 69.27, 179.94 81.75 C 183.10 94.24, 190.25 108.36, 187.74 120.03 C 185.23 131.69, 173.22 142.02, 164.89 151.75 C 156.56 161.48, 148.56 173.51, 137.75 178.38 C 126.93 183.26, 112.73 180.70, 100.00 181.00 C 87.27 181.30, 72.33 184.96, 61.38 180.19 C 50.44 175.42, 41.86 162.55, 34.33 152.37 C 26.79 142.20, 18.53 130.91, 16.16 119.14 C 13.78 107.37, 17.81 94.30, 20.06 81.75 C 22.30 69.21, 22.31 53.31, 29.64 43.89 C 36.96 34.46, 52.26 30.20, 63.99 25.22 C 75.72 20.24, 88.21 13.55, 100.00 14.00 Z";

const SEAL_FLOWER =
  "M 80.0 106.0 Q 85.0 97.5 80.0 89.0 Q 75.0 97.5 80.0 106.0 Z M 80.0 106.0 Q 87.5 101.5 87.0 92.8 Q 79.5 97.3 80.0 106.0 Z M 80.0 106.0 Q 80.5 97.3 73.0 92.8 Q 72.5 101.5 80.0 106.0 Z M 80.0 106.0 Q 87.2 105.5 89.5 98.6 Q 82.3 99.2 80.0 106.0 Z M 80.0 106.0 Q 77.7 99.2 70.5 98.6 Q 72.8 105.5 80.0 106.0 Z";

function WaxSeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      aria-label="clique para abrir"
      role="img"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="wax" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="38%" stopColor="#f2f1ef" />
          <stop offset="72%" stopColor="#dadade" />
          <stop offset="100%" stopColor="#bdbdc6" />
        </radialGradient>
        <radialGradient id="disc" cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#fbfbfa" />
          <stop offset="70%" stopColor="#eceaea" />
          <stop offset="100%" stopColor="#d6d6db" />
        </radialGradient>
        <filter id="sealShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#7a6a70" floodOpacity="0.35" />
        </filter>
        <path id="sealArc" d="M 21.2 170.9 A 106 106 0 0 1 21.2 29.1" fill="none" />
      </defs>

      {/* melted wax body */}
      <g filter="url(#sealShadow)">
        <path d={SEAL_BLOB} fill="url(#wax)" stroke="#b9b9c0" strokeWidth="0.6" />
      </g>

      {/* stamped rings */}
      <circle cx="100" cy="100" r="72" fill="none" stroke="#c4c4cb" strokeWidth="2.4" opacity="0.7" />
      <circle cx="100" cy="100" r="66" fill="url(#disc)" stroke="#cdcdd2" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#c9c9d0" strokeWidth="1.2" opacity="0.6" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="#d8d8dd" strokeWidth="0.8" opacity="0.6" />

      {/* V monogram */}
      <text
        x="104"
        y="138"
        textAnchor="middle"
        fontFamily="Georgia, 'Cormorant Garamond', serif"
        fontSize="92"
        fontWeight="500"
        fill={BURGUNDY}
      >
        V
      </text>

      {/* lotus flower entwined */}
      <path d={SEAL_FLOWER} fill={BURGUNDY} opacity="0.9" />
      <path d="M 80 106 q -2 10 -8 15" fill="none" stroke={BURGUNDY} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

      {/* curved text */}
      <text
        fontFamily="Georgia, 'Cormorant Garamond', serif"
        fontSize="12"
        letterSpacing="1.2"
        fontStyle="italic"
        fill={BURGUNDY}
      >
        <textPath href="#sealArc" startOffset="8%">
          clique para abrir
        </textPath>
      </text>
    </svg>
  );
}

// ─── Open card — faithful to page 2 of the PDF ────────────────────────────────

const PINK = "#c41e63";
const PINK_DEEP = "#a3155f";
const WINE = "#8e1b4d";

function OpenCard() {
  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #fff6f9 0%, #fdeaf1 45%, #fff4f8 100%)",
      }}
    >
      {/* Floral top border */}
      <div className="relative h-px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/bouquet-1.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", top: -14, left: -18, width: "48%", transform: "scaleX(-1)" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florals/bouquet-2.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", top: -14, right: -18, width: "50%" }}
        />
      </div>

      <div
        className="px-7 pb-10 text-center relative z-10 max-w-md mx-auto"
        style={{ paddingTop: "calc(36vw + 16px)" }}
      >
        {/* Monogram */}
        <Monogram />

        <h1
          className="font-script leading-none mt-2"
          style={{ fontSize: "clamp(3rem, 13vw, 4.6rem)", color: PINK }}
        >
          Vanessa
        </h1>
        <p
          className="font-script -mt-1"
          style={{ fontSize: "clamp(1.4rem, 6vw, 2rem)", color: "#cf6f95" }}
        >
          15 anos
        </p>

        <SparkleRow />

        {/* Message */}
        <p
          className="font-heading mx-auto mt-3 mb-7"
          style={{
            maxWidth: 340,
            fontSize: "clamp(1rem, 4.2vw, 1.18rem)",
            lineHeight: 1.5,
            color: WINE,
          }}
        >
          Celebrar com as pessoas que amamos é a melhor coisa da vida, por isso, quero muito que
          você esteja presente na minha festa de 15 anos. Será um momento único, em que guardarei
          todas as lembranças pelo resto de minha vida.
        </p>

        {/* Date block */}
        <DateBlock />

        {/* Location */}
        <div className="mt-6 font-heading" style={{ color: WINE }}>
          <p className="text-base font-medium">Lumaki festas e eventos</p>
          <p className="text-sm" style={{ color: "#a85278" }}>
            Rua Vicentina Maria Fidélis, 387, no bairro
          </p>
          <p className="text-sm" style={{ color: "#a85278" }}>
            Vicentina, em São Leopoldo (RS)
          </p>
        </div>

        {/* Interactive icons */}
        <div className="mt-8 grid grid-cols-3 gap-2">
          <IconAction
            href="/confirmar"
            label="Confirme sua presença"
            icon={<CheckIcon size={26} />}
          />
          <IconAction
            href={MAP_URL}
            external
            label="Localização"
            icon={<MapPinIcon size={24} />}
          />
          <IconAction
            href="/presentes"
            label="Ideias de presentes"
            icon={<GiftIcon size={24} />}
          />
        </div>

        <p className="mt-7 font-heading text-sm font-semibold underline" style={{ color: PINK }}>
          Clique nos ícones para interagir.
        </p>
      </div>
    </div>
  );
}

function Monogram() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <svg width="76" height="60" viewBox="0 0 100 80">
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontFamily="'Dancing Script', cursive"
          fontSize="52"
          fontWeight="700"
          fill={PINK_DEEP}
        >
        </text>
        {/* little leaf sprig */}
        <path
          d="M50 20 q 8 -6 16 -3 q -6 5 -16 3 Z"
          fill="#cf6f95"
          opacity="0.8"
        />
        <path d="M50 20 q -2 -8 -2 -14" stroke="#cf6f95" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SparkleRow() {
  return (
    <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
      <Sparkle size={9} />
      <Sparkle size={13} />
      <Sparkle size={9} />
    </div>
  );
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={PINK}>
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
    </svg>
  );
}

function DateBlock() {
  return (
    <div
      className="mx-auto flex items-stretch rounded-xl overflow-hidden"
      style={{ maxWidth: 360, border: `2px solid ${PINK}` }}
    >
      <div className="flex-1 flex flex-col items-center justify-center py-4 px-2">
        <span className="font-heading text-lg font-bold tracking-widest uppercase" style={{ color: PINK_DEEP }}>
          Domingo
        </span>
        <span className="font-heading text-base font-semibold" style={{ color: "#a85278" }}>
          20:00
        </span>
      </div>

      <div className="flex items-center justify-center px-1" style={{ borderLeft: `2px solid ${PINK}`, borderRight: `2px solid ${PINK}` }}>
        <div className="flex items-center justify-center rounded-full m-2.5" style={{ width: 60, height: 60, border: `2px solid ${PINK}` }}>
          <span className="font-heading text-4xl font-bold leading-none" style={{ color: PINK_DEEP }}>
            06
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4 px-2">
        <span className="font-heading text-lg font-bold tracking-widest uppercase" style={{ color: PINK_DEEP }}>
          Setembro
        </span>
        <span className="font-heading text-base font-semibold" style={{ color: "#a85278" }}>
          2026
        </span>
      </div>
    </div>
  );
}

function IconAction({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      <span
        className="flex items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 group-active:scale-95"
        style={{
          width: 56,
          height: 56,
          color: "white",
          background: "linear-gradient(135deg, #e0508a, #b3155a)",
          boxShadow: "0 6px 16px rgba(179,21,90,0.28)",
        }}
      >
        {icon}
      </span>
      <span className="font-heading text-xs leading-tight font-medium" style={{ color: WINE }}>
        {label}
      </span>
    </>
  );

  const cls = "group flex flex-col items-center gap-2 text-center";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

"use client";

import { useState } from "react";
import { COLORS } from "@/components/theme";
import { ChevronDownIcon, CopyIcon, CheckIcon, HeartIcon } from "@/components/Icons";

const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? "";
const PIX_NAME = process.env.NEXT_PUBLIC_PIX_NAME ?? "Vanessa";

export default function PixSection() {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      className="rounded-2xl px-6 pt-4 pb-4"
      style={{
        background: "linear-gradient(135deg, #fff5f8 0%, #fff8fb 100%)",
        border: `1px solid ${COLORS.petal}`,
        boxShadow: "0 4px 24px rgba(196,30,99,0.08)",
      }}
    >
      {/* Header — always visible */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-script text-2xl" style={{ color: COLORS.pink }}>
          Se preferir, você pode fazer o Pix
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Recolher Pix" : "Expandir Pix"}
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #e0508a, #b3155a)",
            color: "white",
            border: "none",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <ChevronDownIcon size={16} />
        </button>
      </div>

      {/* Expandable content */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: expanded ? 500 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <div className="pt-5 text-center">
          <p className="flex items-center justify-center gap-1.5 font-heading text-sm tracking-wider mb-5" style={{ color: COLORS.mauve }}>
            sua contribuição já é um presente enorme
            <HeartIcon size={15} style={{ color: COLORS.pink }} />
          </p>

          {/* QR Code placeholder */}
          <div className="flex justify-center mb-5">
            <div
              className="rounded-xl flex flex-col items-center justify-center"
              style={{
                width: 160,
                height: 160,
                background: "white",
                border: `2px dashed ${COLORS.petal}`,
              }}
            >
              <PixQRIcon />
              <span className="font-heading text-xs mt-2" style={{ color: COLORS.rose }}>
                QR Code Pix
              </span>
            </div>
          </div>

          {/* Pix key display */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-2"
            style={{ background: "#fff8fb", border: `1px solid ${COLORS.petal}` }}
          >
            <span className="font-heading text-xs" style={{ color: COLORS.mauve }}>Chave:</span>
            <span className="font-heading text-sm font-medium" style={{ color: COLORS.wine, letterSpacing: "0.05em" }}>
              {PIX_KEY}
            </span>
          </div>

          <p className="font-heading text-xs mb-5" style={{ color: COLORS.rose }}>{PIX_NAME}</p>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 mx-auto py-3 px-7 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: copied
                ? "linear-gradient(135deg, #6dbb8a, #4caf70)"
                : "linear-gradient(135deg, #e0508a, #b3155a)",
              color: "white",
              border: "none",
              minWidth: 200,
            }}
          >
            {copied ? (
              <><CheckIcon size={18} /><span>Copiado!</span></>
            ) : (
              <><CopyIcon size={18} /><span>Copiar chave Pix</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function PixQRIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Top-left finder pattern */}
      <rect x="8" y="8" width="20" height="20" rx="3" fill="none" stroke="#f4a7b9" strokeWidth="2.5" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#e07a99" />
      {/* Top-right finder pattern */}
      <rect x="44" y="8" width="20" height="20" rx="3" fill="none" stroke="#f4a7b9" strokeWidth="2.5" />
      <rect x="49" y="13" width="10" height="10" rx="1.5" fill="#e07a99" />
      {/* Bottom-left finder pattern */}
      <rect x="8" y="44" width="20" height="20" rx="3" fill="none" stroke="#f4a7b9" strokeWidth="2.5" />
      <rect x="13" y="49" width="10" height="10" rx="1.5" fill="#e07a99" />
      {/* Data modules (decorative) */}
      <rect x="36" y="36" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="42" y="36" width="4" height="4" rx="0.5" fill="#c9a96e" />
      <rect x="48" y="36" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="54" y="36" width="4" height="4" rx="0.5" fill="#e07a99" />
      <rect x="60" y="36" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="36" y="42" width="4" height="4" rx="0.5" fill="#c9a96e" />
      <rect x="48" y="42" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="60" y="42" width="4" height="4" rx="0.5" fill="#c9a96e" />
      <rect x="36" y="48" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="42" y="48" width="4" height="4" rx="0.5" fill="#e07a99" />
      <rect x="54" y="48" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="36" y="54" width="4" height="4" rx="0.5" fill="#c9a96e" />
      <rect x="42" y="54" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="48" y="54" width="4" height="4" rx="0.5" fill="#e07a99" />
      <rect x="60" y="54" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="36" y="60" width="4" height="4" rx="0.5" fill="#f4a7b9" />
      <rect x="48" y="60" width="4" height="4" rx="0.5" fill="#c9a96e" />
      <rect x="54" y="60" width="4" height="4" rx="0.5" fill="#f4a7b9" />
    </svg>
  );
}

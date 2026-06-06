"use client";

import { useState } from "react";

const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? "";
const PIX_NAME = process.env.NEXT_PUBLIC_PIX_NAME ?? "Vanessa";

export default function PixSection() {
  const [expanded, setExpanded] = useState(false);
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
        background: "linear-gradient(135deg, #fff5f8 0%, #fdf8f2 100%)",
        border: "1px solid #f4a7b9",
        boxShadow: "0 4px 24px rgba(224,122,153,0.08)",
      }}
    >
      {/* Header — always visible */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-script text-2xl" style={{ color: "#e07a99" }}>
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
            background: "linear-gradient(135deg, #f4a7b9, #e07a99)",
            color: "white",
            border: "none",
            fontSize: 14,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
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
          <p className="font-heading text-xs tracking-wider mb-5" style={{ color: "#a07060" }}>
            sua contribuição já é um presente enorme 💛
          </p>

          {/* QR Code placeholder */}
          <div className="flex justify-center mb-5">
            <div
              className="rounded-xl flex flex-col items-center justify-center"
              style={{
                width: 160,
                height: 160,
                background: "white",
                border: "2px dashed #f4a7b9",
              }}
            >
              <PixQRIcon />
              <span className="font-heading text-xs mt-2" style={{ color: "#c9a96e" }}>
                QR Code Pix
              </span>
            </div>
          </div>

          {/* Pix key display */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-2"
            style={{ background: "#fdf8f2", border: "1px solid #e8d5b0" }}
          >
            <span className="font-heading text-xs" style={{ color: "#a07060" }}>Chave:</span>
            <span className="font-heading text-sm font-medium" style={{ color: "#6b4c3b", letterSpacing: "0.05em" }}>
              {PIX_KEY}
            </span>
          </div>

          <p className="font-heading text-xs mb-5" style={{ color: "#b09090" }}>{PIX_NAME}</p>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 mx-auto py-3 px-7 rounded-full font-heading tracking-wider text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: copied
                ? "linear-gradient(135deg, #6dbb8a, #4caf70)"
                : "linear-gradient(135deg, #f4a7b9, #e07a99)",
              color: "white",
              border: "none",
              minWidth: 200,
            }}
          >
            {copied ? <><span>✓</span><span>Copiado!</span></> : <><span>📋</span><span>Copiar chave Pix</span></>}
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

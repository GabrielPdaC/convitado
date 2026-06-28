"use client";

import { useState } from "react";
import { COLORS } from "@/components/theme";
import { ChevronDownIcon, CopyIcon, CheckIcon, HeartIcon } from "@/components/Icons";

const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? "";
const PIX_NAME = process.env.NEXT_PUBLIC_PIX_NAME ?? "Vanessa";

// Copia para a área de transferência. A Clipboard API só funciona em contexto
// seguro (HTTPS/localhost); no celular via HTTP cai no fallback com textarea.
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // segue para o fallback
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function PixSection() {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(PIX_KEY);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
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

          {/* QR Code */}
          <div className="flex justify-center mb-5">
            <div
              className="rounded-xl p-3"
              style={{
                background: "white",
                border: `1px solid ${COLORS.petal}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qrcode.png"
                alt="QR Code Pix"
                width={160}
                height={160}
                style={{ display: "block", width: 160, height: 160, objectFit: "contain" }}
              />
            </div>
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

"use client";

import { useState } from "react";
import { COLORS } from "@/components/theme";
import {
  ShirtIcon,
  ShoeIcon,
  LipstickIcon,
  PaletteIcon,
  GemIcon,
  ChevronDownIcon,
} from "@/components/Icons";

interface HintGroup {
  Icon: typeof ShirtIcon;
  title: string;
  items: { label: string; value: string }[];
}

// Preferências da aniversariante — fáceis de editar aqui.
const HINT_GROUPS: HintGroup[] = [
  {
    Icon: ShirtIcon,
    title: "Roupas",
    items: [
      { label: "Camisetas", value: "P / M" },
      { label: "Shorts / calças", value: "38" },
    ],
  },
  {
    Icon: ShoeIcon,
    title: "Calçados",
    items: [
      { label: "Tamanho", value: "37" },
      { label: "Preferência", value: "tênis" },
    ],
  },
  {
    Icon: GemIcon,
    title: "Acessórios",
    items: [
      { label: "Brincos, colares, anéis, pulseiras", value: "prata" },
    ],
  },
  {
    Icon: PaletteIcon,
    title: "Cosméticos",
    items: [
      { label: "Perfume, creme corporal, body splash etc.", value: "doce e floral" },
    ],
  },
  {
    Icon: LipstickIcon,
    title: "Maquiagem",
    items: [
      { label: "Ideias", value: "máscara de cílios, blush, gloss" },
    ],
  },
];

export default function GiftHintsSection() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="mt-6 rounded-2xl px-6 pt-4 pb-4"
      style={{
        background: "linear-gradient(135deg, #fff8fb 0%, #fff4f8 100%)",
        border: `1px solid ${COLORS.petal}`,
        boxShadow: "0 4px 24px rgba(196,30,99,0.07)",
      }}
    >
      {/* Header — always visible */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-script text-2xl" style={{ color: COLORS.pink }}>
          Ideias de presente para a Vanessa
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Recolher ideias" : "Expandir ideias"}
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
          maxHeight: expanded ? 2000 : 0,
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.5s ease, opacity 0.3s ease",
        }}
      >
        <p className="font-heading text-sm mt-3 mb-5" style={{ color: COLORS.mauve }}>
          se quiser dar um presentinho, aqui vão algumas das minhas sugestões
        </p>

        <div className="space-y-3">
          {HINT_GROUPS.map(({ Icon, title, items }) => (
            <div
              key={title}
              className="rounded-xl px-4 py-3"
              style={{ background: "white", border: `1px solid ${COLORS.petal}` }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: COLORS.pink }}>
                <Icon size={20} />
                <h3 className="font-heading text-sm font-semibold tracking-wide" style={{ color: COLORS.wine }}>
                  {title}
                </h3>
              </div>
              <div className="space-y-1.5 pl-1">
                {items.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-3">
                    <span className="font-body text-xs" style={{ color: COLORS.mauve }}>
                      {item.label}
                    </span>
                    <span className="font-body text-xs text-right font-semibold" style={{ color: COLORS.wine }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

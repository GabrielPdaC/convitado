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
      { label: "Blusas / vestidos", value: "M" },
      { label: "Calças / shorts", value: "38" },
      { label: "Estilo", value: "casual, fofo e delicado" },
    ],
  },
  {
    Icon: ShoeIcon,
    title: "Calçados",
    items: [
      { label: "Tamanho", value: "36" },
      { label: "Preferência", value: "tênis e sandálias" },
    ],
  },
  {
    Icon: LipstickIcon,
    title: "Maquiagem",
    items: [
      { label: "Paleta de sombras", value: "tons neutros e rosados" },
      { label: "Batom", value: "nude / rosé" },
      { label: "Base", value: "tom claro" },
      { label: "Itens", value: "máscara de cílios, blush, iluminador" },
    ],
  },
  {
    Icon: PaletteIcon,
    title: "Cores favoritas",
    items: [{ label: "Preferidas", value: "rosa, lilás, off-white e dourado" }],
  },
  {
    Icon: GemIcon,
    title: "Acessórios & cuidados",
    items: [
      { label: "Acessórios", value: "brincos e colares delicados (prata)" },
      { label: "Perfumes", value: "florais e adocicados" },
      { label: "Skincare", value: "hidratante, protetor solar, lip balm" },
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
          se quiser dar um presentinho, aqui vão algumas preferências dela
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
                    <span className="font-heading text-xs text-right font-medium" style={{ color: COLORS.wine }}>
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

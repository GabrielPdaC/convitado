// Static metadata for every positionable image. The editable values
// (x / y / scale / flipX / rotate) live in data/layout.json.

export type Anchor = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface LayoutDef {
  src: string;
  anchor: Anchor;
  /** Reference width in px at scale = 1. */
  baseWidth: number;
  opacity?: number;
  transformOrigin?: string;
  label: string;
}

export interface LayoutPos {
  x: number;
  y: number;
  scale: number;
  flipX: boolean;
  rotate: number;
}

export const DEFAULT_POS: LayoutPos = { x: 0, y: 0, scale: 1, flipX: false, rotate: 0 };

export const REGISTRY: Record<string, LayoutDef> = {
  // ── Convite fechado (página 1) ──
  "closed.cornerTL": { src: "/florals/corner-tl.png", anchor: "top-left", baseWidth: 210, label: "Convite · Borboletas sup. esquerda" },
  "closed.cornerBL": { src: "/florals/corner-bl.png", anchor: "bottom-left", baseWidth: 195, label: "Convite · Borboletas inf. esquerda" },
  "closed.bouquetTR": { src: "/florals/bouquet-2.png", anchor: "top-right", baseWidth: 226, label: "Convite · Buquê sup. direita" },
  "closed.ramo": { src: "/florals/ramo.png", anchor: "top-right", baseWidth: 82, transformOrigin: "top right", label: "Convite · Ramo" },
  "closed.bouquetBR": { src: "/florals/bouquet-1.png", anchor: "bottom-right", baseWidth: 234, label: "Convite · Buquê inf. direita" },

  // ── Convite aberto (página 2) ──
  "open.bouquetL": { src: "/florals/bouquet-1.png", anchor: "top-left", baseWidth: 187, label: "Aberto · Buquê esquerda" },
  "open.bouquetR": { src: "/florals/bouquet-2.png", anchor: "top-right", baseWidth: 195, label: "Aberto · Buquê direita" },

  // ── Páginas internas (presentes / confirmar) ──
  "shell.bouquetL": { src: "/florals/bouquet-1.png", anchor: "top-left", baseWidth: 164, label: "Página · Buquê esquerda" },
  "shell.bouquetR": { src: "/florals/bouquet-2.png", anchor: "top-right", baseWidth: 172, label: "Página · Buquê direita" },
  "shell.butterfly1": { src: "/florals/butterfly-1.png", anchor: "bottom-left", baseWidth: 62, opacity: 0.7, label: "Página · Borboleta 1" },
  "shell.butterfly2": { src: "/florals/butterfly-2.png", anchor: "bottom-right", baseWidth: 58, opacity: 0.7, label: "Página · Borboleta 2" },
  "shell.butterfly3": { src: "/florals/butterfly-3.png", anchor: "bottom-left", baseWidth: 47, opacity: 0.55, label: "Página · Borboleta 3" },
};

"use client";

import { useLayout } from "@/components/layout/LayoutContext";
import { REGISTRY, type LayoutPos } from "@/components/layout/registry";

export default function LayoutEditor() {
  const { editMode, registeredIds, selectedId, select, positions, update, save, copyJson, saveState } = useLayout();

  if (!editMode) return null;

  const pos = selectedId ? positions[selectedId] : null;
  const items = registeredIds.slice().sort((a, b) => REGISTRY[a].label.localeCompare(REGISTRY[b].label));

  return (
    <div
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 1000,
        background: "rgba(20,18,24,0.92)",
        color: "#fff",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        fontFamily: "system-ui, sans-serif",
        maxWidth: 460,
        margin: "0 auto",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <strong style={{ fontSize: 13, letterSpacing: 0.4 }}>Editor de layout</strong>
        <span style={{ fontSize: 11, opacity: 0.6 }}>{items.length} imagens</span>
      </div>

      <label style={labelStyle}>Imagem</label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => select(e.target.value || null)}
        style={selectStyle}
      >
        <option value="">— selecione (ou clique numa imagem) —</option>
        {items.map((id) => (
          <option key={id} value={id}>
            {REGISTRY[id].label}
          </option>
        ))}
      </select>

      {selectedId && pos ? (
        <div style={{ marginTop: 12 }}>
          <Field label="X (horizontal)" value={pos.x} min={-400} max={400} step={1}
            onChange={(v) => update(selectedId, { x: v })} />
          <Field label="Y (vertical)" value={pos.y} min={-400} max={600} step={1}
            onChange={(v) => update(selectedId, { y: v })} />
          <Field label="Escala" value={pos.scale} min={0.2} max={3} step={0.01}
            onChange={(v) => update(selectedId, { scale: v })} />
          <Field label="Rotação (°)" value={pos.rotate} min={-180} max={180} step={1}
            onChange={(v) => update(selectedId, { rotate: v })} />

          <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <input
              type="checkbox"
              checked={pos.flipX}
              onChange={(e) => update(selectedId, { flipX: e.target.checked })}
            />
            Espelhar horizontalmente
          </label>
        </div>
      ) : (
        <p style={{ fontSize: 12, opacity: 0.7, marginTop: 10 }}>
          Toque numa imagem na tela ou escolha acima para ajustar.
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={save} style={btnPrimary}>
          {saveState === "saving"
            ? "Salvando..."
            : saveState === "saved"
            ? "Salvo ✓"
            : saveState === "error"
            ? "Erro ✕"
            : "Salvar no JSON"}
        </button>
        <button onClick={copyJson} style={btnGhost}>
          Copiar JSON
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={labelStyle}>{label}</label>
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={numberStyle}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#e0508a" }}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 11, opacity: 0.85, textTransform: "uppercase", letterSpacing: 0.5 };
const selectStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: 13,
};
const numberStyle: React.CSSProperties = {
  width: 78,
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: 13,
  textAlign: "right",
};
const btnPrimary: React.CSSProperties = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: 9,
  border: "none",
  background: "linear-gradient(135deg, #e0508a, #b3155a)",
  color: "#fff",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 9,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "transparent",
  color: "#fff",
  fontSize: 13,
  cursor: "pointer",
};

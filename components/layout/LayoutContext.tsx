"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import layoutData from "@/data/layout.json";
import { DEFAULT_POS, REGISTRY, type LayoutPos } from "@/components/layout/registry";

type Positions = Record<string, LayoutPos>;

interface LayoutContextValue {
  editMode: boolean;
  positions: Positions;
  selectedId: string | null;
  registeredIds: string[];
  select: (id: string | null) => void;
  update: (id: string, partial: Partial<LayoutPos>) => void;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  save: () => Promise<void>;
  copyJson: () => Promise<void>;
  saveState: "idle" | "saving" | "saved" | "error";
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

function buildInitial(): Positions {
  const out: Positions = {};
  for (const id of Object.keys(REGISTRY)) {
    const saved = (layoutData as Record<string, Partial<LayoutPos>>)[id];
    out[id] = { ...DEFAULT_POS, ...saved };
  }
  return out;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [positions, setPositions] = useState<Positions>(buildInitial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEditMode(params.get("layoutEdit") === "true");
  }, []);

  const select = useCallback((id: string | null) => setSelectedId(id), []);

  const update = useCallback((id: string, partial: Partial<LayoutPos>) => {
    setPositions((prev) => ({ ...prev, [id]: { ...prev[id], ...partial } }));
  }, []);

  const registerItem = useCallback((id: string) => {
    setRegisteredIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setRegisteredIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const save = useCallback(async () => {
    setSaveState("saving");
    try {
      const res = await fetch("/api/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(positions),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 2500);
    }
  }, [positions]);

  const copyJson = useCallback(async () => {
    await navigator.clipboard.writeText(JSON.stringify(positions, null, 2));
  }, [positions]);

  const value = useMemo<LayoutContextValue>(
    () => ({
      editMode,
      positions,
      selectedId,
      registeredIds,
      select,
      update,
      registerItem,
      unregisterItem,
      save,
      copyJson,
      saveState,
    }),
    [editMode, positions, selectedId, registeredIds, select, update, registerItem, unregisterItem, save, copyJson, saveState]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}

"use client";

import { useEffect, useRef } from "react";
import { useLayout } from "@/components/layout/LayoutContext";
import { DEFAULT_POS, REGISTRY } from "@/components/layout/registry";

/* eslint-disable @next/next/no-img-element */

export default function LayoutImage({ id }: { id: string }) {
  const def = REGISTRY[id];
  const { editMode, positions, selectedId, select, update, registerItem, unregisterItem } = useLayout();
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!editMode) return;
    registerItem(id);
    return () => unregisterItem(id);
  }, [editMode, id, registerItem, unregisterItem]);

  if (!def) return null;
  const pos = positions[id] ?? DEFAULT_POS;
  const selected = editMode && selectedId === id;

  const transforms: string[] = [];
  if (pos.flipX) transforms.push("scaleX(-1)");
  if (pos.rotate) transforms.push(`rotate(${pos.rotate}deg)`);

  const style: React.CSSProperties = {
    position: "absolute",
    width: def.baseWidth * pos.scale,
    opacity: def.opacity ?? 1,
    transform: transforms.join(" ") || undefined,
    transformOrigin: def.transformOrigin ?? "center",
    [def.anchor.includes("left") ? "left" : "right"]: pos.x,
    [def.anchor.includes("top") ? "top" : "bottom"]: pos.y,
    pointerEvents: editMode ? "auto" : "none",
    cursor: editMode ? "move" : "default",
    zIndex: editMode ? (selected ? 60 : 41) : undefined,
    outline: selected ? "2px solid #2196f3" : undefined,
    outlineOffset: 2,
    touchAction: editMode ? "none" : undefined,
  };

  function handlePointerDown(e: React.PointerEvent<HTMLImageElement>) {
    if (!editMode) return;
    e.stopPropagation();
    e.preventDefault();
    select(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLImageElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.px;
    const dy = e.clientY - drag.current.py;
    const sx = def.anchor.includes("left") ? 1 : -1;
    const sy = def.anchor.includes("top") ? 1 : -1;
    update(id, {
      x: Math.round(drag.current.x + dx * sx),
      y: Math.round(drag.current.y + dy * sy),
    });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLImageElement>) {
    drag.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  return (
    <img
      src={def.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={style}
      onClick={editMode ? (e) => e.stopPropagation() : undefined}
      onPointerDown={editMode ? handlePointerDown : undefined}
      onPointerMove={editMode ? handlePointerMove : undefined}
      onPointerUp={editMode ? handlePointerUp : undefined}
    />
  );
}

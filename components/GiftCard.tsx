"use client";

import { useState } from "react";
import type { Gift } from "@/types";

interface GiftCardProps {
  gift: Gift;
  onReserved: (giftId: string, reservedBy: string) => void;
}

export default function GiftCard({ gift, onReserved }: GiftCardProps) {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReserve() {
    if (!name.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/gifts/${gift.id}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) throw new Error("Erro");
      onReserved(gift.id, name.trim());
      setShowForm(false);
    } catch {
      // keep form open
    } finally {
      setLoading(false);
    }
  }

  const isReserved = gift.reserved;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: isReserved
          ? "linear-gradient(145deg, #f5f0f0, #ede8e8)"
          : "linear-gradient(145deg, #fdf8f2, #f9e4ec)",
        border: `1px solid ${isReserved ? "#d4c4c4" : "#e8d5b0"}`,
        boxShadow: "0 4px 16px rgba(201,169,110,0.1)",
        opacity: isReserved ? 0.75 : 1,
      }}
    >
      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h3 className="font-heading text-base font-medium" style={{ color: isReserved ? "#9a8080" : "#6b4c3b" }}>
              {gift.name}
            </h3>
            {gift.description && (
              <p className="font-body text-xs mt-0.5" style={{ color: "#a07060" }}>
                {gift.description}
              </p>
            )}
            {gift.price_range && (
              <p className="font-heading text-xs mt-1 tracking-wider" style={{ color: "#c9a96e" }}>
                {gift.price_range}
              </p>
            )}
          </div>

          {isReserved ? (
            <span
              className="shrink-0 text-xs font-heading tracking-wider px-2 py-1 rounded-full"
              style={{ background: "#ede8e8", color: "#9a8080", border: "1px solid #d4c4c4" }}
            >
              reservado
            </span>
          ) : (
            <span className="shrink-0 text-lg">🎁</span>
          )}
        </div>

        {isReserved && gift.reserved_by && (
          <p className="font-body text-xs" style={{ color: "#b09090" }}>
            reservado por {gift.reserved_by}
          </p>
        )}

        {!isReserved && (
          <>
            {gift.store_link && (
              <a
                href={gift.store_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-heading text-xs tracking-wider hover:underline mb-3"
                style={{ color: "#c9a96e" }}
              >
                ver na loja →
              </a>
            )}

            {showForm ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-3 py-2 rounded-lg font-body text-xs outline-none"
                  style={{ background: "#fdf8f2", border: "1px solid #e8d5b0", color: "#6b4c3b" }}
                  onKeyDown={(e) => e.key === "Enter" && handleReserve()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleReserve}
                    disabled={loading || !name.trim()}
                    className="flex-1 py-2 rounded-lg font-heading text-xs tracking-wider text-white transition-all hover:scale-105 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #f4a7b9, #e07a99)" }}
                  >
                    {loading ? "..." : "Confirmar"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-3 py-2 rounded-lg font-heading text-xs tracking-wider"
                    style={{ border: "1px solid #e8d5b0", color: "#a07060" }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 w-full py-2 rounded-full font-heading text-xs tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "transparent",
                  border: "1px solid #f4a7b9",
                  color: "#e07a99",
                }}
              >
                Quero dar este presente
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

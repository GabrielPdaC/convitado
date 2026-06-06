"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GiftCard from "@/components/GiftCard";
import FallingPetals from "@/components/FallingPetals";
import PixSection from "@/components/PixSection";
import type { Gift } from "@/types";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gifts")
      .then((r) => r.json())
      .then((data) => setGifts(data))
      .finally(() => setLoading(false));
  }, []);

  function handleReserved(giftId: string, reservedBy: string) {
    setGifts((prev) =>
      prev.map((g) =>
        g.id === giftId
          ? { ...g, reserved: true, reserved_by: reservedBy, reserved_at: new Date().toISOString() }
          : g
      )
    );
  }

  const available = gifts.filter((g) => !g.reserved);
  const reserved = gifts.filter((g) => g.reserved);

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 35%, #fdf8f2 65%, #f5e6d3 100%)",
      }}
    >
      <FallingPetals count={8} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Ornament />
          <h1 className="font-script text-5xl mb-1" style={{ color: "#e07a99" }}>
            Lista de Presentes
          </h1>
          <p className="font-heading text-sm tracking-wider" style={{ color: "#a07060" }}>
            escolha um presente para a Vanessa 🌸
          </p>
          <Divider />
        </div>

        {/* Pix section */}
        <PixSection />

        {/* Separator */}
        <div className="text-center my-8">
          <p className="font-script text-xl" style={{ color: "#a07060" }}>
            Ou escolher um dos presentes disponíveis abaixo
          </p>
          <Divider />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="font-script text-2xl animate-gentle-pulse" style={{ color: "#e07a99" }}>
              carregando...
            </p>
          </div>
        ) : gifts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {available.length > 0 && (
              <section className="mb-10">
                <h2 className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: "#c9a96e" }}>
                  disponíveis ({available.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {available.map((gift) => (
                    <GiftCard key={gift.id} gift={gift} onReserved={handleReserved} />
                  ))}
                </div>
              </section>
            )}

            {reserved.length > 0 && (
              <section>
                <h2 className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: "#b09090" }}>
                  já reservados ({reserved.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {reserved.map((gift) => (
                    <GiftCard key={gift.id} gift={gift} onReserved={handleReserved} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="font-heading text-xs tracking-wider hover:underline"
            style={{ color: "#c9a96e" }}
          >
            ← Voltar ao convite
          </Link>
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-4">🌸</div>
      <p className="font-heading text-sm" style={{ color: "#a07060" }}>
        A lista de presentes será divulgada em breve!
      </p>
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <span style={{ color: "#e8d5b0", fontSize: 12 }}>✦</span>
      <span style={{ color: "#f4a7b9", fontSize: 16 }}>✿</span>
      <span style={{ color: "#e8d5b0", fontSize: 12 }}>✦</span>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #e8d5b0)" }} />
      <span style={{ color: "#c9a96e" }}>✦</span>
      <span style={{ color: "#e07a99", fontSize: 10 }}>✿</span>
      <span style={{ color: "#c9a96e" }}>✦</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #e8d5b0)" }} />
    </div>
  );
}

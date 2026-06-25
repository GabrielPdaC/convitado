"use client";

import { useEffect, useState } from "react";
import GiftCard from "@/components/GiftCard";
import PixSection from "@/components/PixSection";
import GiftHintsSection from "@/components/GiftHintsSection";
import PageShell from "@/components/PageShell";
import { COLORS } from "@/components/theme";
import { GiftIcon, SparkleIcon } from "@/components/Icons";
import type { Gift } from "@/types";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [giftControlEnabled, setGiftControlEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/settings").then((r) => r.json()),
      fetch("/api/gifts").then((r) => r.json()),
    ])
      .then(([settings, data]) => {
        setGiftControlEnabled(Boolean(settings?.giftControlEnabled));
        setGifts(data);
      })
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
    <PageShell title="Lista de Presentes" subtitle="escolha um presente para a Vanessa">
      <PixSection />

      <GiftHintsSection />

      {loading ? null : giftControlEnabled ? (
        <>
          <Divider label="Ou escolha um dos presentes disponíveis" />

          {gifts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {available.length > 0 && (
                <section className="mb-10">
                  <h2 className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: COLORS.pink }}>
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
                  <h2 className="font-heading text-xs tracking-widest uppercase mb-4" style={{ color: COLORS.mauve }}>
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
        </>
      ) : null}
    </PageShell>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12" style={{ color: COLORS.mauve }}>
      <GiftIcon size={40} className="mx-auto mb-4" style={{ color: COLORS.rose }} />
      <p className="font-heading text-base">A lista de presentes será divulgada em breve!</p>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="text-center my-8">
      <p className="font-script text-2xl" style={{ color: COLORS.mauve }}>
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 mt-3" style={{ color: COLORS.rose }}>
        <span className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${COLORS.petal})` }} />
        <SparkleIcon size={11} />
        <span className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${COLORS.petal})` }} />
      </div>
    </div>
  );
}

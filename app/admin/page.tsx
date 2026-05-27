"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Confirmation, Gift } from "@/types";

type Tab = "confirmacoes" | "presentes";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("confirmacoes");
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/confirmations").then((r) => r.json()),
      fetch("/api/gifts").then((r) => r.json()),
    ])
      .then(([conf, gift]) => {
        setConfirmations(conf);
        setGifts(gift);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalGuests = confirmations.reduce((sum, c) => sum + c.guests + 1, 0);
  const reservedGifts = gifts.filter((g) => g.reserved);

  return (
    <main
      className="min-h-screen px-4 py-10"
      style={{ background: "#fdf8f2" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-heading text-2xl font-semibold" style={{ color: "#6b4c3b" }}>
                Painel Administrativo
              </h1>
              <p className="font-body text-sm" style={{ color: "#a07060" }}>
                Vanessa · 15 Anos · 06/09/2026
              </p>
            </div>
            <Link href="/" className="font-heading text-xs tracking-wider hover:underline" style={{ color: "#c9a96e" }}>
              ← Convite
            </Link>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <SummaryCard label="Confirmações" value={confirmations.length} icon="✓" />
            <SummaryCard label="Total de pessoas" value={totalGuests} icon="👥" />
            <SummaryCard label="Presentes reservados" value={reservedGifts.length} icon="🎁" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "#f5e6d3" }}>
          <TabButton label="Confirmações" active={tab === "confirmacoes"} onClick={() => setTab("confirmacoes")} />
          <TabButton label="Presentes" active={tab === "presentes"} onClick={() => setTab("presentes")} />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="font-script text-2xl animate-gentle-pulse" style={{ color: "#e07a99" }}>
              carregando...
            </p>
          </div>
        ) : tab === "confirmacoes" ? (
          <ConfirmationsTab confirmations={confirmations} />
        ) : (
          <GiftsTab gifts={gifts} />
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ background: "white", border: "1px solid #e8d5b0" }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-heading text-2xl font-semibold" style={{ color: "#e07a99" }}>
        {value}
      </div>
      <div className="font-body text-xs" style={{ color: "#a07060" }}>
        {label}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 px-4 rounded-lg font-heading text-sm tracking-wider transition-all"
      style={{
        background: active ? "white" : "transparent",
        color: active ? "#e07a99" : "#a07060",
        boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function ConfirmationsTab({ confirmations }: { confirmations: Confirmation[] }) {
  if (confirmations.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-sm" style={{ color: "#a07060" }}>
          Nenhuma confirmação ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {confirmations.map((c) => (
        <div
          key={c.id}
          className="rounded-xl p-4"
          style={{ background: "white", border: "1px solid #e8d5b0" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-heading text-base font-medium" style={{ color: "#6b4c3b" }}>
                {c.name}
              </p>
              {c.message && (
                <p className="font-body text-sm mt-1 italic" style={{ color: "#a07060" }}>
                  "{c.message}"
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span
                className="font-body text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#f9e4ec", color: "#e07a99" }}
              >
                {c.guests === 0 ? "só eu" : `+${c.guests} acomp.`}
              </span>
              <p className="font-body text-xs mt-1" style={{ color: "#c9a96e" }}>
                {new Date(c.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GiftsTab({ gifts }: { gifts: Gift[] }) {
  const reserved = gifts.filter((g) => g.reserved);
  const available = gifts.filter((g) => !g.reserved);

  return (
    <div className="space-y-6">
      {reserved.length > 0 && (
        <div>
          <h3 className="font-heading text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
            reservados ({reserved.length})
          </h3>
          <div className="space-y-2">
            {reserved.map((g) => (
              <div
                key={g.id}
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ background: "white", border: "1px solid #e8d5b0" }}
              >
                <div>
                  <p className="font-heading text-sm font-medium" style={{ color: "#6b4c3b" }}>
                    {g.name}
                  </p>
                  <p className="font-body text-xs" style={{ color: "#a07060" }}>
                    reservado por {g.reserved_by}
                  </p>
                </div>
                <p className="font-body text-xs" style={{ color: "#c9a96e" }}>
                  {g.reserved_at ? new Date(g.reserved_at).toLocaleDateString("pt-BR") : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {available.length > 0 && (
        <div>
          <h3 className="font-heading text-xs tracking-widest uppercase mb-3" style={{ color: "#b09090" }}>
            disponíveis ({available.length})
          </h3>
          <div className="space-y-2">
            {available.map((g) => (
              <div
                key={g.id}
                className="rounded-xl p-4"
                style={{ background: "#fdf8f2", border: "1px solid #e8d5b0" }}
              >
                <p className="font-heading text-sm" style={{ color: "#a07060" }}>
                  {g.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {gifts.length === 0 && (
        <div className="text-center py-16">
          <p className="font-heading text-sm" style={{ color: "#a07060" }}>
            Nenhum presente cadastrado ainda.
          </p>
        </div>
      )}
    </div>
  );
}

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

  function handleGiftAdded(gift: Gift) {
    setGifts((prev) => [...prev, gift]);
  }

  const totalGuests = confirmations.reduce((sum, c) => sum + c.guests + 1, 0);
  const reservedGifts = gifts.filter((g) => g.reserved);

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "#fdf8f2" }}>
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
          <GiftsTab gifts={gifts} onGiftAdded={handleGiftAdded} />
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid #e8d5b0" }}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-heading text-2xl font-semibold" style={{ color: "#e07a99" }}>{value}</div>
      <div className="font-body text-xs" style={{ color: "#a07060" }}>{label}</div>
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

// ─── Add Gift Form ────────────────────────────────────────────────────────────

interface AddGiftFormProps {
  onAdded: (gift: Gift) => void;
}

function AddGiftForm({ onAdded }: AddGiftFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          price_range: priceRange.trim(),
          store_link: storeLink.trim(),
        }),
      });

      if (!res.ok) throw new Error("Erro ao salvar");

      const gift = await res.json();
      onAdded(gift);
      setName("");
      setDescription("");
      setPriceRange("");
      setStoreLink("");
      setOpen(false);
    } catch {
      setError("Não foi possível salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 rounded-xl font-heading text-sm tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99]"
        style={{
          border: "1.5px dashed #f4a7b9",
          color: "#e07a99",
          background: "transparent",
        }}
      >
        + Adicionar presente
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-5 space-y-4"
      style={{ background: "white", border: "1px solid #e8d5b0" }}
    >
      <h3 className="font-heading text-base font-medium" style={{ color: "#6b4c3b" }}>
        Novo presente
      </h3>

      <div>
        <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
          Nome *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ex: Kit de Maquiagem"
          className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
          style={{ background: "#fdf8f2", border: "1px solid #e8d5b0", color: "#6b4c3b" }}
        />
      </div>

      <div>
        <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
          Descrição
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Paleta de sombras e batons"
          className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
          style={{ background: "#fdf8f2", border: "1px solid #e8d5b0", color: "#6b4c3b" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
            Faixa de preço
          </label>
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="Ex: R$ 80 – R$ 150"
            className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
            style={{ background: "#fdf8f2", border: "1px solid #e8d5b0", color: "#6b4c3b" }}
          />
        </div>

        <div>
          <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
            Link da loja
          </label>
          <input
            type="url"
            value={storeLink}
            onChange={(e) => setStoreLink(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
            style={{ background: "#fdf8f2", border: "1px solid #e8d5b0", color: "#6b4c3b" }}
          />
        </div>
      </div>

      {error && (
        <p className="font-body text-xs" style={{ color: "#e07a99" }}>{error}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="flex-1 py-2.5 rounded-full font-heading text-sm tracking-wider text-white transition-all hover:scale-105 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #f4a7b9, #e07a99)" }}
        >
          {loading ? "Salvando..." : "Salvar presente"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2.5 rounded-full font-heading text-sm tracking-wider transition-all"
          style={{ border: "1px solid #e8d5b0", color: "#a07060" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

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
        <div key={c.id} className="rounded-xl p-4" style={{ background: "white", border: "1px solid #e8d5b0" }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-heading text-base font-medium" style={{ color: "#6b4c3b" }}>{c.name}</p>
              {c.message && (
                <p className="font-body text-sm mt-1 italic" style={{ color: "#a07060" }}>
                  "{c.message}"
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: "#f9e4ec", color: "#e07a99" }}>
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

function GiftsTab({ gifts, onGiftAdded }: { gifts: Gift[]; onGiftAdded: (g: Gift) => void }) {
  const reserved = gifts.filter((g) => g.reserved);
  const available = gifts.filter((g) => !g.reserved);

  return (
    <div className="space-y-6">
      <AddGiftForm onAdded={onGiftAdded} />

      {reserved.length > 0 && (
        <section>
          <h3 className="font-heading text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a96e" }}>
            reservados ({reserved.length})
          </h3>
          <div className="space-y-2">
            {reserved.map((g) => (
              <div key={g.id} className="rounded-xl p-4 flex items-center justify-between" style={{ background: "white", border: "1px solid #e8d5b0" }}>
                <div>
                  <p className="font-heading text-sm font-medium" style={{ color: "#6b4c3b" }}>{g.name}</p>
                  <p className="font-body text-xs" style={{ color: "#a07060" }}>reservado por {g.reserved_by}</p>
                </div>
                <p className="font-body text-xs" style={{ color: "#c9a96e" }}>
                  {g.reserved_at ? new Date(g.reserved_at).toLocaleDateString("pt-BR") : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {available.length > 0 && (
        <section>
          <h3 className="font-heading text-xs tracking-widest uppercase mb-3" style={{ color: "#b09090" }}>
            disponíveis ({available.length})
          </h3>
          <div className="space-y-2">
            {available.map((g) => (
              <div key={g.id} className="rounded-xl p-4" style={{ background: "#fdf8f2", border: "1px solid #e8d5b0" }}>
                <p className="font-heading text-sm font-medium" style={{ color: "#6b4c3b" }}>{g.name}</p>
                {g.description && (
                  <p className="font-body text-xs mt-0.5" style={{ color: "#a07060" }}>{g.description}</p>
                )}
                {g.price_range && (
                  <p className="font-heading text-xs mt-1 tracking-wider" style={{ color: "#c9a96e" }}>{g.price_range}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {gifts.length === 0 && (
        <div className="text-center py-8">
          <p className="font-heading text-sm" style={{ color: "#a07060" }}>
            Nenhum presente cadastrado ainda.
          </p>
        </div>
      )}
    </div>
  );
}

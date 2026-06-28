"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Confirmation, Gift } from "@/types";
import { COLORS } from "@/components/theme";
import { CheckIcon, UsersIcon, GiftIcon, ArrowLeftIcon, TrashIcon } from "@/components/Icons";

type Tab = "confirmacoes" | "presentes";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("confirmacoes");
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [giftControlEnabled, setGiftControlEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/confirmations").then((r) => r.json()),
      fetch("/api/gifts").then((r) => r.json()),
      fetch("/api/settings").then((r) => r.json()),
    ])
      .then(([conf, gift, settings]) => {
        setConfirmations(conf);
        setGifts(gift);
        setGiftControlEnabled(Boolean(settings?.giftControlEnabled));
      })
      .finally(() => setLoading(false));
  }, []);

  function handleGiftAdded(gift: Gift) {
    setGifts((prev) => [...prev, gift]);
  }

  function handleConfirmationDeleted(id: string) {
    setConfirmations((prev) => prev.filter((c) => c.id !== id));
  }

  const totalGuests = confirmations.reduce((sum, c) => sum + c.guests + 1, 0);
  const reservedGifts = gifts.filter((g) => g.reserved);

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "#fff8fb" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-heading text-2xl font-semibold" style={{ color: "#8e1b4d" }}>
                Painel Administrativo
              </h1>
              <p className="font-body text-sm" style={{ color: "#a85278" }}>
                Vanessa · 15 Anos · 06/09/2026
              </p>
            </div>
            <Link href="/" className="inline-flex items-center gap-1.5 font-heading text-xs tracking-wider hover:underline" style={{ color: COLORS.rose }}>
              <ArrowLeftIcon size={14} />
              Convite
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <SummaryCard label="Confirmações" value={confirmations.length} icon={<CheckIcon size={22} />} />
            <SummaryCard label="Total de pessoas" value={totalGuests} icon={<UsersIcon size={22} />} />
            <SummaryCard label="Presentes reservados" value={reservedGifts.length} icon={<GiftIcon size={22} />} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "#fdeaf1" }}>
          <TabButton label="Confirmações" active={tab === "confirmacoes"} onClick={() => setTab("confirmacoes")} />
          <TabButton label="Presentes" active={tab === "presentes"} onClick={() => setTab("presentes")} />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="font-script text-2xl animate-gentle-pulse" style={{ color: "#c41e63" }}>
              carregando...
            </p>
          </div>
        ) : tab === "confirmacoes" ? (
          <ConfirmationsTab confirmations={confirmations} onDeleted={handleConfirmationDeleted} />
        ) : (
          <GiftsTab
            gifts={gifts}
            onGiftAdded={handleGiftAdded}
            giftControlEnabled={giftControlEnabled}
            onGiftControlChange={setGiftControlEnabled}
          />
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "white", border: `1px solid ${COLORS.petal}` }}>
      <div
        className="mx-auto mb-2 flex items-center justify-center rounded-full"
        style={{ width: 38, height: 38, color: "white", background: "linear-gradient(135deg, #e0508a, #b3155a)" }}
      >
        {icon}
      </div>
      <div className="font-heading text-2xl font-bold" style={{ color: COLORS.pink }}>{value}</div>
      <div className="font-body text-xs" style={{ color: COLORS.mauve }}>{label}</div>
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
        color: active ? "#c41e63" : "#a85278",
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
          border: "1.5px dashed #e0508a",
          color: "#c41e63",
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
      style={{ background: "white", border: "1px solid #f0c6d6" }}
    >
      <h3 className="font-heading text-base font-medium" style={{ color: "#8e1b4d" }}>
        Novo presente
      </h3>

      <div>
        <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#cf6f95" }}>
          Nome *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ex: Kit de Maquiagem"
          className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
          style={{ background: "#fff8fb", border: "1px solid #f0c6d6", color: "#8e1b4d" }}
        />
      </div>

      <div>
        <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#cf6f95" }}>
          Descrição
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Paleta de sombras e batons"
          className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
          style={{ background: "#fff8fb", border: "1px solid #f0c6d6", color: "#8e1b4d" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#cf6f95" }}>
            Faixa de preço
          </label>
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="Ex: R$ 80 – R$ 150"
            className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
            style={{ background: "#fff8fb", border: "1px solid #f0c6d6", color: "#8e1b4d" }}
          />
        </div>

        <div>
          <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#cf6f95" }}>
            Link da loja
          </label>
          <input
            type="url"
            value={storeLink}
            onChange={(e) => setStoreLink(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg font-body text-sm outline-none"
            style={{ background: "#fff8fb", border: "1px solid #f0c6d6", color: "#8e1b4d" }}
          />
        </div>
      </div>

      {error && (
        <p className="font-body text-xs" style={{ color: "#c41e63" }}>{error}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="flex-1 py-2.5 rounded-full font-heading text-sm tracking-wider text-white transition-all hover:scale-105 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #e0508a, #c41e63)" }}
        >
          {loading ? "Salvando..." : "Salvar presente"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2.5 rounded-full font-heading text-sm tracking-wider transition-all"
          style={{ border: "1px solid #f0c6d6", color: "#a85278" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function ConfirmationsTab({
  confirmations,
  onDeleted,
}: {
  confirmations: Confirmation[];
  onDeleted: (id: string) => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(c: Confirmation) {
    if (!window.confirm(`Excluir a confirmação de ${c.name}?`)) return;
    setDeletingId(c.id);
    try {
      const res = await fetch(`/api/confirmations?id=${c.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      onDeleted(c.id);
    } catch {
      window.alert("Não foi possível excluir. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  }

  if (confirmations.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-heading text-sm" style={{ color: "#a85278" }}>
          Nenhuma confirmação ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {confirmations.map((c) => (
        <div key={c.id} className="rounded-xl p-4" style={{ background: "white", border: "1px solid #f0c6d6" }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-heading text-base font-medium" style={{ color: "#8e1b4d" }}>{c.name}</p>
              {c.message && (
                <p className="font-body text-sm mt-1 italic" style={{ color: "#a85278" }}>
                  "{c.message}"
                </p>
              )}
            </div>
            <div className="flex items-start gap-3 shrink-0">
              <div className="text-right">
                <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: "#fff1f6", color: "#c41e63" }}>
                  {c.guests === 0 ? "só eu" : `+${c.guests} acomp.`}
                </span>
                <p className="font-body text-xs mt-1" style={{ color: "#cf6f95" }}>
                  {new Date(c.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(c)}
                disabled={deletingId === c.id}
                aria-label={`Excluir confirmação de ${c.name}`}
                title="Excluir"
                className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                style={{ width: 32, height: 32, color: "#c41e63", background: "#fff1f6", border: "1px solid #f0c6d6" }}
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GiftControlToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  const [saving, setSaving] = useState(false);

  async function handleToggle() {
    const next = !enabled;
    setSaving(true);
    // optimistic update
    onChange(next);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftControlEnabled: next }),
      });
      if (!res.ok) throw new Error("Erro");
    } catch {
      // revert on failure
      onChange(enabled);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="rounded-xl p-4 flex items-center justify-between gap-4"
      style={{ background: "white", border: "1px solid #f0c6d6" }}
    >
      <div>
        <p className="font-heading text-sm font-medium" style={{ color: "#8e1b4d" }}>
          Controle de presentes
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#a85278" }}>
          {enabled
            ? "A lista de presentes está visível para os convidados."
            : "A lista de presentes está oculta para os convidados."}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Ativar controle de presentes"
        disabled={saving}
        onClick={handleToggle}
        className="shrink-0 rounded-full transition-all disabled:opacity-60"
        style={{
          width: 48,
          height: 28,
          padding: 3,
          background: enabled ? "linear-gradient(135deg, #e0508a, #c41e63)" : "#f0c6d6",
        }}
      >
        <span
          className="block rounded-full bg-white transition-transform"
          style={{
            width: 22,
            height: 22,
            transform: enabled ? "translateX(20px)" : "translateX(0)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </button>
    </div>
  );
}

function GiftsTab({
  gifts,
  onGiftAdded,
  giftControlEnabled,
  onGiftControlChange,
}: {
  gifts: Gift[];
  onGiftAdded: (g: Gift) => void;
  giftControlEnabled: boolean;
  onGiftControlChange: (value: boolean) => void;
}) {
  const reserved = gifts.filter((g) => g.reserved);
  const available = gifts.filter((g) => !g.reserved);

  return (
    <div className="space-y-6">
      <GiftControlToggle enabled={giftControlEnabled} onChange={onGiftControlChange} />

      <AddGiftForm onAdded={onGiftAdded} />

      {reserved.length > 0 && (
        <section>
          <h3 className="font-heading text-xs tracking-widest uppercase mb-3" style={{ color: "#cf6f95" }}>
            reservados ({reserved.length})
          </h3>
          <div className="space-y-2">
            {reserved.map((g) => (
              <div key={g.id} className="rounded-xl p-4 flex items-center justify-between" style={{ background: "white", border: "1px solid #f0c6d6" }}>
                <div>
                  <p className="font-heading text-sm font-medium" style={{ color: "#8e1b4d" }}>{g.name}</p>
                  <p className="font-body text-xs" style={{ color: "#a85278" }}>reservado por {g.reserved_by}</p>
                </div>
                <p className="font-body text-xs" style={{ color: "#cf6f95" }}>
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
              <div key={g.id} className="rounded-xl p-4" style={{ background: "#fff8fb", border: "1px solid #f0c6d6" }}>
                <p className="font-heading text-sm font-medium" style={{ color: "#8e1b4d" }}>{g.name}</p>
                {g.description && (
                  <p className="font-body text-xs mt-0.5" style={{ color: "#a85278" }}>{g.description}</p>
                )}
                {g.price_range && (
                  <p className="font-heading text-xs mt-1 tracking-wider" style={{ color: "#cf6f95" }}>{g.price_range}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {gifts.length === 0 && (
        <div className="text-center py-8">
          <p className="font-heading text-sm" style={{ color: "#a85278" }}>
            Nenhum presente cadastrado ainda.
          </p>
        </div>
      )}
    </div>
  );
}

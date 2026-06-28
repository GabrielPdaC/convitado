"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { COLORS } from "@/components/theme";
import { CheckIcon } from "@/components/Icons";

type Status = "idle" | "loading" | "success" | "error";

export default function ConfirmarPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/confirmations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), guests: 0, message: message.trim() }),
      });

      if (!res.ok) throw new Error("Erro ao confirmar");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const labelCls = "block font-heading text-xs tracking-widest uppercase mb-1.5";
  const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all";
  const inputStyle = { background: "#fff8fb", border: `1px solid ${COLORS.petal}`, color: COLORS.wine };

  return (
    <PageShell title="Confirmar Presença" subtitle="nos diga que você vem!">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", border: `1px solid ${COLORS.petal}`, boxShadow: "0 8px 30px rgba(196,30,99,0.10)" }}
      >
        <div className="h-1.5" style={{ background: "linear-gradient(to right, #e0508a, #b3155a, #e0508a)" }} />

        <div className="px-7 py-8">
          {status === "success" ? (
            <SuccessMessage />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelCls} style={{ color: COLORS.pink }}>
                  Seu nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Como devemos te chamar?"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className={labelCls} style={{ color: COLORS.pink }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Deixe um carinho para a Vanessa..."
                  rows={3}
                  className={inputCls + " resize-none"}
                  style={inputStyle}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-center font-heading" style={{ color: COLORS.pink }}>
                  Algo deu errado. Tente novamente.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !name.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-heading tracking-wider text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #e0508a, #b3155a)" }}
              >
                {status === "loading" ? "Confirmando..." : (<><CheckIcon size={18} /> Confirmar Presença</>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function SuccessMessage() {
  return (
    <div className="text-center py-6">
      <div
        className="mx-auto mb-5 flex items-center justify-center rounded-full"
        style={{ width: 72, height: 72, color: "white", background: "linear-gradient(135deg, #e0508a, #b3155a)" }}
      >
        <CheckIcon size={36} />
      </div>
      <h2 className="font-script text-4xl mb-2" style={{ color: COLORS.pink }}>
        Presença confirmada!
      </h2>
      <p className="font-heading text-base" style={{ color: COLORS.mauve }}>
        Que alegria! A Vanessa ficará feliz em ter você por lá.
      </p>
    </div>
  );
}

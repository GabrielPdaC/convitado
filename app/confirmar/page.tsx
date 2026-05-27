"use client";

import { useState } from "react";
import Link from "next/link";
import FallingPetals from "@/components/FallingPetals";

type Status = "idle" | "loading" | "success" | "error";

export default function ConfirmarPage() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(0);
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
        body: JSON.stringify({ name: name.trim(), guests, message: message.trim() }),
      });

      if (!res.ok) throw new Error("Erro ao confirmar");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 35%, #fdf8f2 65%, #f5e6d3 100%)",
      }}
    >
      <FallingPetals count={8} />

      <div
        className="relative z-10 w-full max-w-md invitation-shadow rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 60%, #fdf8f2 100%)",
          border: "1px solid #e8d5b0",
        }}
      >
        <div className="h-2" style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }} />

        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <Ornament />
            <h1 className="font-script text-4xl mb-1" style={{ color: "#e07a99" }}>
              Confirmar Presença
            </h1>
            <p className="font-heading text-sm tracking-wider" style={{ color: "#a07060" }}>
              nos diga que você vem! ✨
            </p>
          </div>

          {status === "success" ? (
            <SuccessMessage />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
                  Seu nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Como devemos te chamar?"
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all"
                  style={{
                    background: "#fdf8f2",
                    border: "1px solid #e8d5b0",
                    color: "#6b4c3b",
                  }}
                />
              </div>

              <div>
                <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
                  Acompanhantes
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none"
                  style={{
                    background: "#fdf8f2",
                    border: "1px solid #e8d5b0",
                    color: "#6b4c3b",
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? "Somente eu" : `${n} acompanhante${n > 1 ? "s" : ""}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-heading text-xs tracking-widest uppercase mb-1.5" style={{ color: "#c9a96e" }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Deixe um carinho para a Vanessa..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none resize-none"
                  style={{
                    background: "#fdf8f2",
                    border: "1px solid #e8d5b0",
                    color: "#6b4c3b",
                  }}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-center font-heading" style={{ color: "#e07a99" }}>
                  Algo deu errado. Tente novamente.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !name.trim()}
                className="w-full py-3 rounded-full font-heading tracking-wider text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #f4a7b9, #e07a99)" }}
              >
                {status === "loading" ? "Confirmando..." : "Confirmar Presença ✓"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-heading text-xs tracking-wider hover:underline"
              style={{ color: "#c9a96e" }}
            >
              ← Voltar ao convite
            </Link>
          </div>
        </div>

        <div className="h-2" style={{ background: "linear-gradient(to right, #f4a7b9, #c9a96e, #f4a7b9)" }} />
      </div>
    </main>
  );
}

function SuccessMessage() {
  return (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">🌸</div>
      <h2 className="font-script text-3xl mb-2" style={{ color: "#e07a99" }}>
        Presença confirmada!
      </h2>
      <p className="font-heading text-sm" style={{ color: "#a07060" }}>
        Que alegria! A Vanessa ficará feliz em ter você por lá. ✨
      </p>
      <div className="mt-6">
        <Ornament />
      </div>
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

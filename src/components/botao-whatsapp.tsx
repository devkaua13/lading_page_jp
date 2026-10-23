"use client";

import { useEffect, useRef, useState } from "react";
import { linkWhatsApp, unidades } from "@/lib/escola";
import { IconeWhatsApp } from "./icones";

const mensagem = "Olá! Vim pelo site e gostaria de informações sobre matrícula.";

type Props = {
  rotulo?: string;
  className?: string;
  // Abre a lista para cima quando o botão fica no rodapé da tela.
  abrirParaCima?: boolean;
};

export function BotaoWhatsApp({ rotulo = "Falar no WhatsApp", className = "", abrirParaCima = false }: Props) {
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <div ref={raiz} className="relative">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-haspopup="true"
        aria-label={rotulo ? undefined : "Falar no WhatsApp"}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ${className}`}
      >
        <IconeWhatsApp />
        {rotulo}
      </button>

      {aberto && (
        <div
          role="menu"
          className={`absolute left-1/2 z-40 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-white text-left text-tinta shadow-2xl ring-1 ring-black/5 ${
            abrirParaCima ? "bottom-full mb-3" : "top-full mt-3"
          }`}
        >
          <p className="px-5 pb-2 pt-4 text-sm text-tinta-suave">Qual unidade você quer chamar?</p>
          {unidades.map((u) => (
            <a
              key={u.id}
              role="menuitem"
              href={linkWhatsApp(u.whatsapp, mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setAberto(false)}
              className="flex items-center justify-between gap-3 border-t border-linha px-5 py-4 transition hover:bg-roxo-100"
            >
              <span>
                <span className="block font-semibold">{u.nome}</span>
                <span className="block text-sm text-tinta-suave">{u.cidade}</span>
              </span>
              <IconeWhatsApp className="size-5 text-[#1fa855]" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

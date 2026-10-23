"use client";

import { useEffect, useState } from "react";
import { BotaoWhatsApp } from "./botao-whatsapp";

// Barra fixa no celular. Aparece depois do hero e some quando o formulário está na tela.
export function BarraMovel() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const form = document.getElementById("agendar");
    if (!hero || !form) return;
    const estado = { hero: true, form: false };
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.target === hero) estado.hero = e.isIntersecting;
        if (e.target === form) estado.form = e.isIntersecting;
      }
      setVisivel(!estado.hero && !estado.form);
    });
    observador.observe(hero);
    observador.observe(form);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ameixa-900/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visivel}
      inert={!visivel}
    >
      <div className="flex gap-2">
        <a
          href="#agendar"
          className="flex-1 rounded-full bg-ambar-400 py-3.5 text-center font-semibold text-ameixa-950"
        >
          Agendar visita
        </a>
        <BotaoWhatsApp
          rotulo=""
          abrirParaCima
          className="size-[52px] bg-[#1fa855] text-white"
        />
      </div>
    </div>
  );
}

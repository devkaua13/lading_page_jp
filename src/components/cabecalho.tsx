"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconeFechar, IconeMenu } from "./icones";

const links = [
  { href: "#proposta", rotulo: "A escola" },
  { href: "#ensino", rotulo: "Ensino" },
  { href: "#unidades", rotulo: "Unidades" },
  { href: "#duvidas", rotulo: "Dúvidas" },
];

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
  }, [aberto]);

  const solido = rolou || aberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solido ? "bg-ameixa-900/95 shadow-lg shadow-black/10 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a
          href="#inicio"
          className="block rounded-2xl bg-white px-2.5 py-1 shadow-sm"
          aria-label="Colégio Jean Piaget, voltar ao início"
        >
          <span className="relative block h-10 w-[74px] sm:h-12 sm:w-[89px]">
            <Image src="/marca/logo-25-anos.png" alt="" fill sizes="90px" className="object-contain" preload />
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/85 transition hover:text-white">
              {l.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#agendar"
            className="hidden rounded-full bg-ambar-400 px-5 py-2.5 text-sm font-semibold text-ameixa-950 transition hover:bg-ambar-300 sm:inline-block"
          >
            Agendar visita
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="rounded-full p-2 text-white md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <IconeFechar /> : <IconeMenu />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-movel" aria-label="Menu" className="h-[calc(100dvh-4rem)] bg-ameixa-900 px-4 pt-6 md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="block border-b border-white/10 py-4 font-display text-3xl font-bold text-white"
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#agendar"
            onClick={() => setAberto(false)}
            className="mt-8 block rounded-full bg-ambar-400 py-4 text-center font-semibold text-ameixa-950"
          >
            Agendar visita
          </a>
        </nav>
      )}
    </header>
  );
}

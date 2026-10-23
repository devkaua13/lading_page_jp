"use client";

import Image from "next/image";
import { useState } from "react";
import { segmentos } from "@/lib/escola";

export const EVENTO_SEGMENTO = "jp:segmento";

export function Segmentos() {
  const [ativoId, setAtivoId] = useState(segmentos[0].id);
  const ativo = segmentos.find((s) => s.id === ativoId) ?? segmentos[0];

  function quero() {
    window.dispatchEvent(new CustomEvent(EVENTO_SEGMENTO, { detail: ativo.id }));
  }

  return (
    <section id="ensino" className="bg-ameixa-900 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Do primeiro dia no Maternal ao vestibular
          </h2>
          <p className="max-w-md text-lg text-white/70">
            Escolha a etapa para ver as turmas. Em Praia Grande, as séries usam os nomes do programa bilíngue.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Etapas de ensino"
          className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          {segmentos.map((s) => {
            const selecionado = s.id === ativo.id;
            return (
              <button
                key={s.id}
                role="tab"
                id={`aba-${s.id}`}
                aria-selected={selecionado}
                aria-controls={`painel-${s.id}`}
                onClick={() => setAtivoId(s.id)}
                className={`shrink-0 rounded-full px-5 py-3 text-left transition sm:px-6 ${
                  selecionado ? "bg-ambar-400 text-ameixa-950" : "bg-white/8 text-white/80 ring-1 ring-white/15 hover:bg-white/15"
                }`}
              >
                <span className="block font-semibold">{s.nome}</span>
                <span className={`block text-xs ${selecionado ? "text-ameixa-900/75" : "text-white/55"}`}>{s.faixa}</span>
              </button>
            );
          })}
        </div>

        <div
          key={ativo.id}
          role="tabpanel"
          id={`painel-${ativo.id}`}
          aria-labelledby={`aba-${ativo.id}`}
          className="entrada mt-8 grid gap-8 overflow-hidden rounded-[2rem] bg-ameixa-800 lg:grid-cols-2"
          style={{ animationDuration: "0.5s" }}
        >
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]">
            <Image src={ativo.foto} alt={ativo.fotoAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>

          <div className="flex flex-col p-6 pt-0 sm:p-10 lg:pl-2 lg:pt-10">
            <h3 className="font-display text-3xl font-bold">{ativo.nome}</h3>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-white/80">{ativo.texto}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-ambar-300">São Vicente</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ativo.turmas.map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ambar-300">Praia Grande (bilíngue)</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ativo.turmasPG.map((t) => (
                    <li key={t} lang="en" className="rounded-full bg-white/10 px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#agendar"
              onClick={quero}
              className="mt-10 inline-flex w-fit rounded-full bg-white px-6 py-3 font-semibold text-ameixa-900 transition hover:bg-ambar-300 lg:mt-auto"
            >
              Quero uma vaga {ativo.contracao} {ativo.nome}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

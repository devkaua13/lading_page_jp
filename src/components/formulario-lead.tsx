"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { enviarLead, type LeadState } from "@/app/actions";
import { ANO_MATRICULA, segmentos, unidades } from "@/lib/escola";
import { IconeWhatsApp } from "./icones";
import { EVENTO_SEGMENTO } from "./segmentos";

const inicial: LeadState = { status: "idle" };

const passos = [
  { titulo: "Você manda seus dados", texto: "Leva menos de um minuto." },
  { titulo: "A secretaria responde no WhatsApp", texto: "Em horário comercial, normalmente no mesmo dia." },
  { titulo: "Vocês marcam a visita", texto: "Você conhece as salas, a coordenação e tira as dúvidas sobre valores." },
];

function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const campoBase =
  "mt-2 block w-full rounded-xl border-0 bg-papel px-4 py-3.5 text-tinta ring-1 ring-linha placeholder:text-tinta-suave/60 focus:ring-2 focus:ring-roxo-500 focus:outline-none";

export function FormularioLead() {
  const [estado, acao, enviando] = useActionState(enviarLead, inicial);
  const [telefone, setTelefone] = useState("");
  const [segmento, setSegmento] = useState("");

  useEffect(() => {
    const aoEscolher = (e: Event) => setSegmento((e as CustomEvent<string>).detail);
    window.addEventListener(EVENTO_SEGMENTO, aoEscolher);
    return () => window.removeEventListener(EVENTO_SEGMENTO, aoEscolher);
  }, []);

  const erros = estado.status === "erro" ? estado.campos ?? {} : {};

  return (
    <section id="agendar" className="relative overflow-hidden bg-ameixa-950 py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 size-[36rem] rounded-full bg-roxo-600/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Agende uma visita
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/75">
            As vagas para {ANO_MATRICULA} já estão abertas. Deixe seu contato e a escola chama você para combinar o
            melhor dia.
          </p>

          <ol className="mt-12 space-y-8">
            {passos.map((p, i) => (
              <li key={p.titulo} className="flex gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ambar-400 font-display font-bold text-ameixa-950">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{p.titulo}</p>
                  <p className="mt-1 text-white/65">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-tinta shadow-2xl sm:p-10">
          {estado.status === "ok" ? (
            <div role="status" className="flex h-full flex-col justify-center py-8 text-center">
              <p className="font-display text-3xl font-bold text-ameixa-900">
                {estado.nome ? `Pronto, ${estado.nome}!` : "Pronto!"}
              </p>
              <p className="mx-auto mt-4 max-w-sm text-lg text-tinta-suave">
                Recebemos seu pedido. Para adiantar, mande a mensagem já preenchida para a {estado.unidade}.
              </p>
              {estado.whatsappUrl && (
                <a
                  href={estado.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#1fa855] px-7 py-4 font-semibold text-white transition hover:bg-[#178a45]"
                >
                  <IconeWhatsApp />
                  Continuar no WhatsApp
                </a>
              )}
            </div>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                // Chamando a action à mão o React não limpa os campos quando há erro de validação.
                e.preventDefault();
                const dados = new FormData(e.currentTarget);
                // Guarda de onde o lead veio (campanha do Instagram, Google etc.).
                const url = new URL(window.location.href);
                for (const chave of ["utm_source", "utm_medium", "utm_campaign"]) {
                  dados.set(chave, url.searchParams.get(chave) ?? "");
                }
                dados.set("pagina", url.href);
                startTransition(() => acao(dados));
              }}
              className="relative grid gap-5 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label htmlFor="responsavel" className="text-sm font-semibold">
                  Seu nome
                </label>
                <input
                  id="responsavel"
                  name="responsavel"
                  autoComplete="name"
                  required
                  aria-invalid={!!erros.responsavel}
                  aria-describedby={erros.responsavel ? "erro-responsavel" : undefined}
                  className={campoBase}
                  placeholder="Nome do responsável"
                />
                {erros.responsavel && (
                  <p id="erro-responsavel" className="mt-1.5 text-sm text-red-700">
                    {erros.responsavel}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="telefone" className="text-sm font-semibold">
                  WhatsApp
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  value={telefone}
                  onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
                  aria-invalid={!!erros.telefone}
                  aria-describedby={erros.telefone ? "erro-telefone" : undefined}
                  className={campoBase}
                  placeholder="(13) 99999-9999"
                />
                {erros.telefone && (
                  <p id="erro-telefone" className="mt-1.5 text-sm text-red-700">
                    {erros.telefone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="aluno" className="text-sm font-semibold">
                  Nome do aluno <span className="font-normal text-tinta-suave">(opcional)</span>
                </label>
                <input id="aluno" name="aluno" className={campoBase} placeholder="Quem vai estudar" />
              </div>

              <div>
                <label htmlFor="segmento" className="text-sm font-semibold">
                  Etapa de ensino
                </label>
                <select
                  id="segmento"
                  name="segmento"
                  required
                  value={segmento}
                  onChange={(e) => setSegmento(e.target.value)}
                  aria-invalid={!!erros.segmento}
                  aria-describedby={erros.segmento ? "erro-segmento" : undefined}
                  className={campoBase}
                >
                  <option value="" disabled>
                    Escolha
                  </option>
                  {segmentos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome} ({s.faixa})
                    </option>
                  ))}
                </select>
                {erros.segmento && (
                  <p id="erro-segmento" className="mt-1.5 text-sm text-red-700">
                    {erros.segmento}
                  </p>
                )}
              </div>

              <fieldset aria-describedby={erros.unidade ? "erro-unidade" : undefined}>
                <legend className="text-sm font-semibold">Unidade</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {unidades.map((u, i) => (
                    <label
                      key={u.id}
                      className="cursor-pointer rounded-xl bg-papel px-3 py-3.5 text-center text-sm ring-1 ring-linha has-[:checked]:bg-roxo-100 has-[:checked]:font-semibold has-[:checked]:text-roxo-600 has-[:checked]:ring-2 has-[:checked]:ring-roxo-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ambar-400"
                    >
                      <input
                        type="radio"
                        name="unidade"
                        value={u.id}
                        required
                        defaultChecked={i === 0}
                        className="sr-only"
                      />
                      {u.cidade}
                    </label>
                  ))}
                </div>
                {erros.unidade && (
                  <p id="erro-unidade" className="mt-1.5 text-sm text-red-700">
                    {erros.unidade}
                  </p>
                )}
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="mensagem" className="text-sm font-semibold">
                  Quer contar algo? <span className="font-normal text-tinta-suave">(opcional)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={3}
                  className={`${campoBase} resize-none`}
                  placeholder="Ex.: meu filho vai para o 6º ano e vem de outra escola"
                />
              </div>

              {/* Armadilha para robôs */}
              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="empresa">Empresa</label>
                <input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="sm:col-span-2">
                {estado.status === "erro" && (
                  <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                    {estado.mensagem}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full rounded-full bg-ambar-400 px-8 py-4 text-lg font-semibold text-ameixa-950 transition hover:bg-ambar-300 disabled:opacity-60"
                >
                  {enviando ? "Enviando..." : "Quero agendar minha visita"}
                </button>
                <p className="mt-4 text-center text-xs text-tinta-suave">
                  Usamos seus dados só para falar sobre matrícula. Nada de spam.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

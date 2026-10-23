import Image from "next/image";
import { ANO_MATRICULA, escola } from "@/lib/escola";
import { BotaoWhatsApp } from "./botao-whatsapp";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ameixa-950 text-white">
      <Image
        src="/fotos/leitura-em-grupo.jpg"
        alt="Duas crianças lendo juntas um livro iluminado no pátio da escola"
        fill
        preload
        sizes="100vw"
        className="hero-foto -z-10 object-cover object-[22%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ameixa-950/75 via-ameixa-950/20 to-ameixa-950/90" />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pt-28 text-center sm:pt-36">
        <p
          className="entrada inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
          style={{ "--atraso": "100ms" } as React.CSSProperties}
        >
          <span className="size-2 rounded-full bg-ambar-400" aria-hidden />
          Matrículas {ANO_MATRICULA} abertas
        </p>
        <h1
          className="entrada mt-6 max-w-4xl text-balance font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ "--atraso": "250ms" } as React.CSSProperties}
        >
          Aqui a criança gosta de vir para a escola
        </h1>
        <p
          className="entrada mt-5 max-w-xl text-pretty text-lg text-white/85 sm:text-xl"
          style={{ "--atraso": "400ms" } as React.CSSProperties}
        >
          Há {escola.anos} anos ensinando em São Vicente e Praia Grande, da Educação Infantil ao Ensino Médio.
        </p>
      </div>

      <div
        className="entrada mx-auto flex w-full max-w-md flex-col gap-3 px-4 pb-14 sm:max-w-none sm:flex-row sm:justify-center sm:pb-20"
        style={{ "--atraso": "600ms" } as React.CSSProperties}
      >
        <a
          href="#agendar"
          className="rounded-full bg-ambar-400 px-8 py-4 text-center font-semibold text-ameixa-950 transition hover:bg-ambar-300 sm:min-w-64"
        >
          Agendar uma visita
        </a>
        <BotaoWhatsApp
          abrirParaCima
          className="w-full bg-white/15 px-8 py-4 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25 sm:min-w-64"
        />
      </div>
    </section>
  );
}

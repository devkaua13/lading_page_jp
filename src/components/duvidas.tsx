import { faq } from "@/lib/escola";
import { IconeMais } from "./icones";

export function Duvidas() {
  return (
    <section id="duvidas" className="bg-papel py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ameixa-900 sm:text-5xl">
            Dúvidas de quem está escolhendo escola
          </h2>
          <p className="mt-5 max-w-sm text-lg text-tinta-suave">
            Não achou a sua? Pergunte na visita ou pelo WhatsApp da unidade.
          </p>
        </div>

        <div className="divide-y divide-linha border-y border-linha">
          {faq.map((item) => (
            <details key={item.pergunta} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold text-ameixa-900 [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <IconeMais className="size-6 shrink-0 text-roxo-600 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-6 text-lg leading-relaxed text-tinta-suave">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

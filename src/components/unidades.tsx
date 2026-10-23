import { embedMapa, linkMapa, linkWhatsApp, unidades } from "@/lib/escola";
import { IconeWhatsApp } from "./icones";

export function Unidades() {
  return (
    <section id="unidades" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ameixa-900 sm:text-5xl">
          Duas unidades, uma em cada cidade
        </h2>
        <p className="mt-5 max-w-xl text-lg text-tinta-suave">
          O atendimento é presencial, com horário marcado. Chame a unidade mais perto de você.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {unidades.map((u) => (
            <article key={u.id} className="overflow-hidden rounded-[2rem] bg-papel ring-1 ring-linha">
              <div className="relative aspect-[16/9] bg-roxo-100">
                <iframe
                  title={`Mapa da ${u.nome}`}
                  src={embedMapa(u.coordenadas)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 grayscale-[35%]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm font-semibold text-roxo-600">{u.cidade}</p>
                <h3 className="mt-1 font-display text-3xl font-bold text-ameixa-900">{u.nome}</h3>
                <address className="mt-4 not-italic leading-relaxed text-tinta-suave">
                  {u.endereco}, {u.bairro}
                  <br />
                  {u.cidade} (SP), CEP {u.cep}
                </address>

                <ul className="mt-6 divide-y divide-linha border-y border-linha">
                  {u.telefones.map((t) => (
                    <li key={t.numero} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-tinta-suave">{t.rotulo}</span>
                      <a href={`tel:+55${t.numero.replace(/\D/g, "")}`} className="font-semibold text-tinta hover:text-roxo-600">
                        {t.numero}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={linkWhatsApp(u.whatsapp, `Olá! Vim pelo site e quero agendar uma visita na ${u.nome}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ameixa-900 px-6 py-3 font-semibold text-white transition hover:bg-roxo-600"
                  >
                    <IconeWhatsApp />
                    Agendar pelo WhatsApp
                  </a>
                  <a
                    href={linkMapa(u.mapaQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-ameixa-900 ring-1 ring-linha transition hover:bg-roxo-100"
                  >
                    Como chegar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

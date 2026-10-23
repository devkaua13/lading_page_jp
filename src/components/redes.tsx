import { escola } from "@/lib/escola";
import { IconeFacebook, IconeInstagram, IconeYouTube } from "./icones";

const canais = [
  {
    ...escola.redes.instagram,
    nome: "Instagram",
    chamada: "Fotos e vídeos do dia a dia das turmas",
    Icone: IconeInstagram,
    classe: "bg-gradient-to-br from-[#f9a72b] via-[#e1306c] to-[#7b2fbf] sm:col-span-2 lg:row-span-2 lg:col-span-1",
  },
  {
    ...escola.redes.facebook,
    nome: "Facebook",
    chamada: "Avisos, eventos e comunicados",
    Icone: IconeFacebook,
    classe: "bg-[#1b5fd6]",
  },
  {
    ...escola.redes.youtube,
    nome: "YouTube",
    chamada: "Apresentações e eventos gravados",
    Icone: IconeYouTube,
    classe: "bg-[#c4161c]",
  },
];

export function Redes() {
  return (
    <section aria-labelledby="redes-titulo" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="redes-titulo"
          className="max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ameixa-900 sm:text-5xl"
        >
          Veja como é a rotina antes de visitar
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-2">
          {canais.map(({ nome, url, usuario, chamada, Icone, classe }) => (
            <a
              key={nome}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex min-h-48 flex-col justify-between rounded-[2rem] p-7 text-white transition hover:-translate-y-1 hover:shadow-xl sm:p-9 ${classe}`}
            >
              <Icone className="size-9" />
              <div>
                <p className="font-display text-3xl font-bold sm:text-4xl">{nome}</p>
                <p className="mt-1 text-white/85">{chamada}</p>
                <p className="mt-4 text-sm font-semibold underline-offset-4 group-hover:underline">
                  Seguir {usuario}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { escola, unidades } from "@/lib/escola";
import { IconeFacebook, IconeInstagram, IconeYouTube } from "./icones";

export function Rodape() {
  return (
    <footer className="bg-ameixa-950 pb-28 pt-16 text-white/70 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1fr_2fr]">
        <div>
          <div className="w-fit rounded-2xl bg-white px-4 py-2">
            <div className="relative h-16 w-[118px]">
              <Image src="/marca/logo-25-anos.png" alt="Colégio Jean Piaget, 25 anos" fill sizes="120px" className="object-contain" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            {[
              { ...escola.redes.instagram, Icone: IconeInstagram, nome: "Instagram" },
              { ...escola.redes.facebook, Icone: IconeFacebook, nome: "Facebook" },
              { ...escola.redes.youtube, Icone: IconeYouTube, nome: "YouTube" },
            ].map(({ url, Icone, nome }) => (
              <a
                key={nome}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={nome}
                className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              >
                <Icone />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {unidades.map((u) => (
            <div key={u.id}>
              <p className="font-semibold text-white">{u.nome}</p>
              <p className="mt-2 text-sm leading-relaxed">
                {u.endereco}, {u.bairro}
                <br />
                {u.cidade} (SP)
              </p>
              <p className="mt-2 text-sm">{u.telefones.map((t) => t.numero).join("  /  ")}</p>
            </div>
          ))}
          <p className="text-sm sm:col-span-2">
            <a href={`mailto:${escola.email}`} className="hover:text-white">
              {escola.email}
            </a>
          </p>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-white/45 sm:px-6">
        Colégio Jean Piaget SV/PG. Todos os direitos reservados.
      </p>
    </footer>
  );
}

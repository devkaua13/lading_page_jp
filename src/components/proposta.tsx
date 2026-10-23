import Image from "next/image";
import { escola } from "@/lib/escola";

const fatos = [
  { valor: `${escola.anos} anos`, descricao: "de escola na Baixada Santista" },
  { valor: "2 unidades", descricao: "em São Vicente e em Praia Grande" },
  { valor: "Maternal ao Médio", descricao: "a vida escolar inteira no mesmo colégio" },
  { valor: "Sistema Marista", descricao: "única escola parceira na Baixada Santista" },
];

export function Proposta() {
  return (
    <section id="proposta" className="bg-papel py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <h2 className="max-w-xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ameixa-900 sm:text-5xl">
            Uma escola pensada para a criança se sentir bem
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-tinta-suave">
            <p>
              A proposta do Jean Piaget parte de uma ideia simples: para aprender, o aluno precisa se sentir acolhido e
              gostar de ir à escola. As duas unidades foram planejadas e decoradas pensando em quem passa o dia nelas.
            </p>
            <p>
              O conteúdo vem do Sistema Marista de Ensino, com o material didático e as avaliações da rede. Na Baixada
              Santista, o Jean Piaget é a única escola parceira do sistema.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 border-t border-linha">
            {fatos.map((f, i) => (
              <div
                key={f.valor}
                className={`border-b border-linha py-6 ${i % 2 === 0 ? "pr-4" : "border-l pl-4 sm:pl-6"}`}
              >
                <dt className="font-display text-2xl font-bold text-roxo-600 sm:text-3xl">{f.valor}</dt>
                <dd className="mt-1 text-sm text-tinta-suave sm:text-base">{f.descricao}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-4 self-center">
          <figure className="relative col-span-5 aspect-[455/300] overflow-hidden rounded-3xl">
            <Image
              src="/fotos/turma.jpg"
              alt="Alunos do Jean Piaget reunidos em sala, de uniforme roxo"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/fotos/sala-decorada.jpg"
              alt="Parede de sala da Educação Infantil decorada com coelho e flores de EVA"
              fill
              sizes="(min-width: 1024px) 27vw, 60vw"
              className="object-cover object-[30%_center]"
            />
          </figure>
          <a
            href="#agendar"
            className="group col-span-2 flex flex-col justify-end rounded-3xl bg-ameixa-900 p-5 text-white transition hover:bg-roxo-600"
          >
            <span className="font-display text-lg font-semibold leading-snug sm:text-xl">
              Venha ver as salas pessoalmente
            </span>
            <span className="mt-2 text-sm text-ambar-300 underline-offset-4 group-hover:underline">Agendar visita</span>
          </a>
        </div>
      </div>
    </section>
  );
}

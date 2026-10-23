import Image from "next/image";

const rotina = [
  {
    titulo: "Google Classroom",
    texto: "Tarefas, materiais e recados da turma num só lugar, no computador ou no celular.",
  },
  {
    titulo: "Transporte escolar",
    texto: "Opções de transporte para levar e buscar o aluno. A secretaria informa bairros e horários.",
  },
  {
    titulo: "Pré-vestibular",
    texto: "Turma para quem está terminando o Ensino Médio e quer reforçar a preparação para o ENEM.",
  },
  {
    titulo: "Proteção integral",
    texto: "Política do Sistema Marista para o cuidado com crianças e adolescentes dentro da escola.",
  },
];

export function Diferenciais() {
  return (
    <section aria-labelledby="diferenciais-titulo" className="bg-papel py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="diferenciais-titulo"
          className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ameixa-900 sm:text-5xl"
        >
          O que o seu filho encontra no Jean Piaget
        </h2>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-[#0b6fe0] p-7 text-white sm:p-10">
            <Image
              src="/fotos/aluno-bilingue.jpg"
              alt="Aluno sorrindo de óculos e gravata borboleta"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-10 object-cover object-top"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06326a] via-[#06326a]/40 to-transparent" />
            <h3 className="font-display text-3xl font-bold sm:text-4xl">Ensino bilíngue</h3>
            <p className="mt-3 max-w-md text-lg text-white/85">
              Na unidade de Praia Grande o inglês faz parte da rotina desde a Educação Infantil. Até os nomes das
              séries são em inglês.
            </p>
            <a
              href="#agendar"
              className="mt-6 w-fit rounded-full bg-white px-6 py-3 font-semibold text-[#06326a] transition hover:bg-ambar-300"
            >
              Conhecer a unidade
            </a>
          </article>

          <article className="relative isolate flex min-h-[34rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-roxo-600 p-7 text-white sm:p-10">
            <svg
              viewBox="0 0 200 200"
              aria-hidden
              className="absolute -right-16 -top-16 -z-10 size-80 text-white/10 sm:size-96"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angulo = (i / 12) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={100 + Math.cos(angulo) * 70}
                    cy={100 + Math.sin(angulo) * 70}
                    r="9"
                    fill="currentColor"
                  />
                );
              })}
            </svg>
            <p className="font-display text-6xl font-extrabold leading-none text-ambar-300 sm:text-7xl">Marista</p>
            <div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">Sistema Marista de Ensino</h3>
              <p className="mt-3 max-w-md text-lg text-white/85">
                Material didático, programa de avaliação e cursos de formação continuada para os professores, tudo
                da rede Marista. O Jean Piaget é a única escola parceira na Baixada Santista.
              </p>
              <a
                href="#agendar"
                className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-roxo-600 transition hover:bg-ambar-300"
              >
                Ver o material na visita
              </a>
            </div>
          </article>
        </div>

        <ul className="mt-16 grid gap-x-10 border-t border-linha sm:grid-cols-2 lg:grid-cols-4">
          {rotina.map((item) => (
            <li key={item.titulo} className="border-b border-linha py-7 lg:border-b-0">
              <h3 className="font-display text-xl font-bold text-ameixa-900">{item.titulo}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Dados da escola usados em todo o site. Edite aqui e o site inteiro atualiza.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jeanpiagetsv.com.br";

// Ano letivo da campanha de matrícula exibida no topo e no formulário.
export const ANO_MATRICULA = 2027;

export const escola = {
  nome: "Colégio Jean Piaget",
  nomeCurto: "Jean Piaget SV/PG",
  anos: 25,
  email: "secretariageral@jeanpiagetsv.com.br",
  redes: {
    instagram: {
      url: "https://www.instagram.com/jeanpiaget_svpg/",
      usuario: "@jeanpiaget_svpg",
    },
    facebook: {
      url: "https://www.facebook.com/jeanpiagetsv",
      usuario: "/jeanpiagetsv",
    },
    youtube: {
      url: "https://www.youtube.com/channel/UC5CBJALWkb6pK64I_PQoguA",
      usuario: "Jean Piaget SV/PG",
    },
  },
} as const;

export type UnidadeId = "nautica" | "praia-grande";

export type Unidade = {
  id: UnidadeId;
  nome: string;
  cidade: string;
  endereco: string;
  bairro: string;
  cep: string;
  telefones: { rotulo: string; numero: string }[];
  whatsapp: string; // apenas dígitos, com DDI
  mapaQuery: string;
  // Posição aproximada da rua (OpenStreetMap). Ajuste se o pino ficar fora do lugar.
  coordenadas: { lat: number; lng: number };
};

export const unidades: Unidade[] = [
  {
    id: "nautica",
    nome: "Unidade Náutica",
    cidade: "São Vicente",
    endereco: "Rua Cuiabá, 753",
    bairro: "Vila Nossa Senhora de Fátima",
    cep: "11355-250",
    telefones: [
      { rotulo: "Atendimento geral", numero: "(13) 99144-8243" },
      { rotulo: "Secretaria", numero: "(13) 98808-1386" },
      { rotulo: "Fixo", numero: "(13) 3462-1143" },
    ],
    whatsapp: "5513988081386",
    mapaQuery: "Rua Cuiabá, 753, Vila Nossa Senhora de Fátima, São Vicente - SP",
    coordenadas: { lat: -23.95079, lng: -46.40474 },
  },
  {
    id: "praia-grande",
    nome: "Unidade Praia Grande",
    cidade: "Praia Grande",
    endereco: "Rua Embaré, 360",
    bairro: "Guilhermina",
    cep: "11701-730",
    telefones: [
      { rotulo: "Coordenação", numero: "(13) 99206-3736" },
      { rotulo: "Fixo", numero: "(13) 3395-2932" },
    ],
    whatsapp: "551333952932",
    mapaQuery: "Rua Embaré, 360, Guilhermina, Praia Grande - SP",
    coordenadas: { lat: -24.00992, lng: -46.41975 },
  },
];

export type Segmento = {
  id: string;
  nome: string;
  // "na Educação Infantil", "no Ensino Médio"
  contracao: "na" | "no";
  faixa: string;
  turmas: string[];
  turmasPG: string[];
  texto: string;
  foto: string;
  fotoAlt: string;
};

export const segmentos: Segmento[] = [
  {
    id: "infantil",
    nome: "Educação Infantil",
    contracao: "na",
    faixa: "Maternal ao Pré",
    turmas: ["Maternal Estrela", "Jardim Nuvem", "Pré Lua", "Pré Sol"],
    turmasPG: ["Nursery", "Toddler", "Reception", "Year 1"],
    texto:
      "As primeiras turmas aprendem brincando, em salas decoradas para que a criança chegue e se sinta em casa. É nessa fase que ela começa a gostar da escola.",
    foto: "/fotos/alunas-sorrindo.jpg",
    fotoAlt: "Duas alunas sorrindo na mesa com lápis de cor",
  },
  {
    id: "fundamental-1",
    nome: "Fundamental I",
    contracao: "no",
    faixa: "1º ao 5º ano",
    turmas: ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
    turmasPG: ["Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
    texto:
      "Alfabetização, leitura e matemática com o material do Sistema Marista de Ensino. O aluno ganha autonomia aos poucos e aprende a organizar a própria rotina de estudo.",
    foto: "/fotos/aluna-livros.jpg",
    fotoAlt: "Aluna sorrindo segurando livros",
  },
  {
    id: "fundamental-2",
    nome: "Fundamental II",
    contracao: "no",
    faixa: "6º ao 9º ano",
    turmas: ["6º ano", "7º ano", "8º ano", "9º ano"],
    turmasPG: ["Year 7", "Year 8", "Year 9", "Year 10"],
    texto:
      "Mais disciplinas, mais professores e mais responsabilidade. A turma usa o Google Classroom para acompanhar atividades, e a família consegue ver o que está sendo pedido.",
    foto: "/fotos/fila-patio.jpg",
    fotoAlt: "Alunos de uniforme roxo em fila no pátio coberto",
  },
  {
    id: "medio",
    nome: "Ensino Médio",
    contracao: "no",
    faixa: "1ª à 3ª série",
    turmas: ["1ª série", "2ª série", "3ª série"],
    turmasPG: ["Primary", "Lower", "Upper"],
    texto:
      "Os três anos finais preparam para o vestibular e o ENEM. A escola também tem turma de pré-vestibular para quem quer reforçar a reta final.",
    foto: "/fotos/turma.jpg",
    fotoAlt: "Turma do ensino médio reunida em sala de aula",
  },
];

export const faq = [
  {
    pergunta: "Quais séries o colégio atende?",
    resposta:
      "Da Educação Infantil (a partir do Maternal) até a 3ª série do Ensino Médio. Também há turma de pré-vestibular.",
  },
  {
    pergunta: "Que material didático vocês usam?",
    resposta:
      "O do Sistema Marista de Ensino. O Jean Piaget é a única escola da Baixada Santista parceira do sistema.",
  },
  {
    pergunta: "Posso visitar a escola antes de matricular?",
    resposta:
      "Pode e recomendamos. Preencha o formulário desta página ou chame a unidade no WhatsApp para marcar o melhor horário. As visitas são agendadas com antecedência.",
  },
  {
    pergunta: "Tem ensino bilíngue?",
    resposta:
      "Sim. A unidade de Praia Grande organiza as turmas no modelo bilíngue, com nomes em inglês (Nursery, Year 1, Year 2...). Pergunte na visita como funciona a carga horária em cada série.",
  },
  {
    pergunta: "A escola oferece transporte?",
    resposta:
      "Há opções de transporte escolar. Fale com a secretaria da sua unidade para saber os bairros e horários atendidos.",
  },
  {
    pergunta: "Como acompanho as atividades do meu filho?",
    resposta:
      "As turmas usam o Google Classroom, onde ficam as tarefas e os materiais. O atendimento pedagógico também pode ser agendado pelo WhatsApp.",
  },
];

export function linkWhatsApp(numero: string, mensagem: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function linkMapa(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function embedMapa({ lat, lng }: { lat: number; lng: number }) {
  const d = 0.006;
  const bbox = [lng - d, lat - d * 0.6, lng + d, lat + d * 0.6].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

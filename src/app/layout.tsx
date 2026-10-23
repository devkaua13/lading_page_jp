import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { SITE_URL, escola, unidades } from "@/lib/escola";
import "./globals.css";

const titulo = Bricolage_Grotesque({
  variable: "--font-titulo",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const corpo = Figtree({
  variable: "--font-corpo",
  subsets: ["latin"],
});

const descricao =
  "Escola particular em São Vicente e Praia Grande, da Educação Infantil ao Ensino Médio. Parceira do Sistema Marista de Ensino, com turmas bilíngues. Agende uma visita.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Colégio Jean Piaget | Escola em São Vicente e Praia Grande",
  description: descricao,
  keywords: [
    "escola em São Vicente",
    "escola em Praia Grande",
    "colégio particular Baixada Santista",
    "Sistema Marista de Ensino",
    "escola bilíngue Praia Grande",
    "matrícula escola São Vicente",
  ],
  openGraph: {
    title: "Colégio Jean Piaget, 25 anos em São Vicente e Praia Grande",
    description: descricao,
    url: SITE_URL,
    siteName: escola.nome,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/fotos/leitura-em-grupo.jpg", width: 1180, height: 800 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#24103a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": unidades.map((u) => ({
    "@type": "School",
    name: `${escola.nome} | ${u.nome}`,
    url: SITE_URL,
    email: escola.email,
    telephone: u.telefones[0].numero,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.endereco,
      addressLocality: u.cidade,
      addressRegion: "SP",
      postalCode: u.cep,
      addressCountry: "BR",
    },
    sameAs: Object.values(escola.redes).map((r) => r.url),
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${corpo.variable} antialiased`}>
      <body className="min-h-full">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

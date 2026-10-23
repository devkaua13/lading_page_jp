import { BarraMovel } from "@/components/barra-movel";
import { Cabecalho } from "@/components/cabecalho";
import { Diferenciais } from "@/components/diferenciais";
import { Duvidas } from "@/components/duvidas";
import { FormularioLead } from "@/components/formulario-lead";
import { Hero } from "@/components/hero";
import { Proposta } from "@/components/proposta";
import { Redes } from "@/components/redes";
import { Rodape } from "@/components/rodape";
import { Segmentos } from "@/components/segmentos";
import { Unidades } from "@/components/unidades";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <Proposta />
        <Segmentos />
        <Diferenciais />
        <FormularioLead />
        <Unidades />
        <Duvidas />
        <Redes />
      </main>
      <Rodape />
      <BarraMovel />
    </>
  );
}

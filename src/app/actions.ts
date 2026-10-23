"use server";

import { ANO_MATRICULA, linkWhatsApp, unidades, segmentos } from "@/lib/escola";

export type LeadState =
  | { status: "idle" }
  | { status: "erro"; mensagem: string; campos?: Partial<Record<CampoLead, string>> }
  | { status: "ok"; nome: string; whatsappUrl: string; unidade: string };

type CampoLead = "responsavel" | "telefone" | "segmento" | "unidade";

function texto(formData: FormData, campo: string, max = 120) {
  const valor = formData.get(campo);
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

export async function enviarLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Campo invisível: pessoas não preenchem, robôs sim.
  if (texto(formData, "empresa")) {
    return { status: "ok", nome: "", whatsappUrl: "", unidade: "" };
  }

  const responsavel = texto(formData, "responsavel", 80);
  const telefone = texto(formData, "telefone", 20).replace(/\D/g, "");
  const aluno = texto(formData, "aluno", 80);
  const segmentoId = texto(formData, "segmento", 40);
  const unidadeId = texto(formData, "unidade", 40);
  const mensagem = texto(formData, "mensagem", 500);

  const campos: Partial<Record<CampoLead, string>> = {};
  if (responsavel.length < 2) campos.responsavel = "Escreva seu nome.";
  if (telefone.length < 10 || telefone.length > 11)
    campos.telefone = "Use o DDD e o número, por exemplo (13) 99999-9999.";
  const segmento = segmentos.find((s) => s.id === segmentoId);
  if (!segmento) campos.segmento = "Escolha a etapa de ensino.";
  const unidade = unidades.find((u) => u.id === unidadeId);
  if (!unidade) campos.unidade = "Escolha a unidade.";

  if (!segmento || !unidade || Object.keys(campos).length > 0) {
    return { status: "erro", mensagem: "Confira os campos marcados.", campos };
  }

  const lead = {
    criadoEm: new Date().toISOString(),
    responsavel,
    telefone,
    aluno,
    segmento: segmento.nome,
    unidade: unidade.nome,
    mensagem,
    origem: {
      utm_source: texto(formData, "utm_source"),
      utm_medium: texto(formData, "utm_medium"),
      utm_campaign: texto(formData, "utm_campaign"),
      pagina: texto(formData, "pagina", 300),
    },
  };

  // LEAD_WEBHOOK_URL pode apontar para um Google Apps Script (planilha),
  // Zapier, Make, n8n ou um CRM. Sem ele, o lead só aparece no log do servidor.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const resposta = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!resposta.ok) console.error("[lead] webhook respondeu", resposta.status);
    } catch (erro) {
      // O WhatsApp abaixo ainda leva o contato até a escola.
      console.error("[lead] falha ao enviar para o webhook", erro);
    }
  } else {
    console.info("[lead]", JSON.stringify(lead));
  }

  const linhas = [
    `Olá! Sou ${responsavel} e quero agendar uma visita para conhecer o Jean Piaget.`,
    aluno ? `Aluno(a): ${aluno}` : null,
    `Etapa: ${segmento.nome} (matrícula ${ANO_MATRICULA})`,
    mensagem ? `Observação: ${mensagem}` : null,
  ].filter(Boolean);

  return {
    status: "ok",
    nome: responsavel.split(" ")[0],
    unidade: unidade.nome,
    whatsappUrl: linkWhatsApp(unidade.whatsapp, linhas.join("\n")),
  };
}

/**
 * Script da planilha de leads do site (Extensões > Apps Script).
 *
 * - doPost: recebe cada lead do site, grava uma linha e cria o link
 *   "Chamar no WhatsApp" com a mensagem pronta para o responsável.
 * - aoEditar: quando a secretaria preenche "Data da visita", cria o evento
 *   no Google Agenda. Mudar a data move o evento; apagar a data remove.
 *
 * Depois de colar este código: rode `instalar` uma vez (botão Executar) e
 * publique uma nova versão em Implantar > Gerenciar implantações.
 */

// Deixe vazio para usar a agenda principal da conta, ou cole o ID de outra
// agenda (Google Agenda > Configurações da agenda > ID da agenda).
const CALENDARIO_ID = "";
const DURACAO_VISITA_MIN = 60;

const ENDERECOS = {
  "Unidade Náutica": "Rua Cuiabá, 753, Vila Nossa Senhora de Fátima, São Vicente - SP",
  "Unidade Praia Grande": "Rua Embaré, 360, Guilhermina, Praia Grande - SP",
};

const COLUNAS = [
  "Data", "Responsável", "WhatsApp", "Aluno", "Etapa", "Unidade", "Mensagem",
  "Origem", "Campanha", "Página", "Chamar no WhatsApp", "Data da visita", "Agenda",
];
const COL = {
  responsavel: 2, telefone: 3, aluno: 4, etapa: 5, unidade: 6,
  whatsapp: 11, visita: 12, agenda: 13,
};

function aba_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function garantirCabecalho_(aba) {
  aba.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]).setFontWeight("bold");
  aba.setFrozenRows(1);
}

function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    const aba = aba_();
    if (aba.getRange(1, COLUNAS.length).getValue() !== COLUNAS[COLUNAS.length - 1]) {
      garantirCabecalho_(aba);
    }
    const d = JSON.parse(e.postData.contents);
    aba.appendRow([
      new Date(d.criadoEm), d.responsavel, "'" + d.telefone, d.aluno, d.segmento, d.unidade,
      d.mensagem, d.origem.utm_source, d.origem.utm_campaign, d.origem.pagina,
    ]);
    const linha = aba.getLastRow();
    aba.getRange(linha, COL.whatsapp).setRichTextValue(linkWhatsApp_(d));
    aba.getRange(linha, COL.visita).setNumberFormat("dd/MM/yyyy HH:mm");
    return ContentService.createTextOutput("ok");
  } finally {
    trava.releaseLock();
  }
}

function linkWhatsApp_(d) {
  const primeiroNome = String(d.responsavel).trim().split(/\s+/)[0];
  const texto =
    `Olá, ${primeiroNome}! Aqui é do Colégio Jean Piaget, ${d.unidade}. ` +
    `Recebemos seu pedido de visita (${d.segmento}). ` +
    `Qual o melhor dia e horário para você vir conhecer a escola?`;
  const numero = "55" + String(d.telefone).replace(/\D/g, "");
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  return SpreadsheetApp.newRichTextValue().setText("Chamar no WhatsApp").setLinkUrl(url).build();
}

/** Rode uma vez para autorizar o Google Agenda e ligar o gatilho de edição. */
function instalar() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "aoEditar")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("aoEditar").forSpreadsheet(planilha).onEdit().create();

  const aba = aba_();
  garantirCabecalho_(aba);
  const regra = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(true) // só avisa; não trava a digitação
    .setHelpText("Digite data e hora, por exemplo 25/10/2026 14:00")
    .build();
  aba.getRange(2, COL.visita, aba.getMaxRows() - 1)
    .setDataValidation(regra)
    .setNumberFormat("dd/MM/yyyy HH:mm");
  agenda_(); // força a autorização do Google Agenda agora
}

function agenda_() {
  if (!CALENDARIO_ID) return CalendarApp.getDefaultCalendar();
  const agenda = CalendarApp.getCalendarById(CALENDARIO_ID);
  if (!agenda) {
    throw new Error(
      "Agenda não encontrada. Confira o CALENDARIO_ID e se a agenda foi compartilhada com " +
      Session.getEffectiveUser().getEmail() + " com a permissão 'Fazer alterações nos eventos'."
    );
  }
  return agenda;
}

function aoEditar(e) {
  const r = e.range;
  if (r.getSheet().getSheetId() !== aba_().getSheetId()) return;
  if (COL.visita < r.getColumn() || COL.visita > r.getLastColumn()) return;
  for (let linha = Math.max(r.getRow(), 2); linha <= r.getLastRow(); linha++) {
    sincronizarVisita_(r.getSheet(), linha);
  }
}

function sincronizarVisita_(aba, linha) {
  const valores = aba.getRange(linha, 1, 1, COLUNAS.length).getValues()[0];
  const celulaAgenda = aba.getRange(linha, COL.agenda);
  const eventoId = celulaAgenda.getNote();
  const evento = eventoId ? agenda_().getEventById(eventoId) : null;
  const inicio = valores[COL.visita - 1];

  if (!(inicio instanceof Date)) {
    if (evento) evento.deleteEvent();
    celulaAgenda.clearContent().clearNote();
    return;
  }

  const fim = new Date(inicio.getTime() + DURACAO_VISITA_MIN * 60 * 1000);
  const responsavel = valores[COL.responsavel - 1];
  const etapa = valores[COL.etapa - 1];
  const unidade = valores[COL.unidade - 1];
  const titulo = `Visita: ${responsavel} (${etapa})`;
  const descricao = [
    `Responsável: ${responsavel}`,
    `WhatsApp: ${valores[COL.telefone - 1]}`,
    valores[COL.aluno - 1] && `Aluno: ${valores[COL.aluno - 1]}`,
    `Etapa: ${etapa}`,
    valores[6] && `Observação: ${valores[6]}`,
  ].filter(Boolean).join("\n") + `\n\nPlanilha: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

  if (evento) {
    evento.setTime(inicio, fim).setTitle(titulo).setDescription(descricao);
  } else {
    const novo = agenda_().createEvent(titulo, inicio, fim, {
      location: ENDERECOS[unidade] || unidade,
      description: descricao,
    });
    novo.addPopupReminder(60);
    celulaAgenda.setNote(novo.getId());
  }
  celulaAgenda.setValue("Agendado " + Utilities.formatDate(inicio, Session.getScriptTimeZone(), "dd/MM HH:mm"));
}

# Colégio Jean Piaget: landing page de matrículas

Site em Next.js 16 para captar contatos de famílias interessadas em matrícula no Colégio Jean Piaget (São Vicente e Praia Grande).

## Rodar no computador

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editar textos, telefones e turmas

Quase tudo fica em `src/lib/escola.ts`: telefones, WhatsApp de cada unidade, endereços, nomes das turmas, perguntas frequentes e o ano da campanha (`ANO_MATRICULA`). As fotos ficam em `public/fotos/`.

## Para onde vão os contatos (leads)

O formulário chama a server action `enviarLead` (`src/app/actions.ts`). Ela valida os dados e:

1. envia o lead em JSON para a URL da variável `LEAD_WEBHOOK_URL` (planilha do Google via Apps Script, Zapier, Make, n8n ou um CRM);
2. devolve um link de WhatsApp com a mensagem pronta para a unidade escolhida.

Sem `LEAD_WEBHOOK_URL`, o lead só aparece no log do servidor. Configure antes de divulgar o site. Copie `.env.example` para `.env.local` para testar localmente.

Cada lead guarda `utm_source`, `utm_medium` e `utm_campaign`. Use links como
`https://site/?utm_source=instagram&utm_campaign=matriculas2027` na bio e nos anúncios para saber de onde vêm as famílias.

### Planilha do Google como destino (opção gratuita)

Numa planilha, abra Extensões > Apps Script, cole o código abaixo e publique como "App da Web" com acesso para "Qualquer pessoa". A URL gerada é o `LEAD_WEBHOOK_URL`.

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([
    d.criadoEm, d.responsavel, d.telefone, d.aluno, d.segmento, d.unidade,
    d.mensagem, d.origem.utm_source, d.origem.utm_campaign,
  ]);
  return ContentService.createTextOutput("ok");
}
```

## Publicar

A forma mais simples é a Vercel (plano gratuito): importe o repositório, defina `LEAD_WEBHOOK_URL` e `NEXT_PUBLIC_SITE_URL` e publique.

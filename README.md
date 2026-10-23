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

O script da planilha está em `scripts/planilha-leads.gs`. Ele grava cada lead, cria o link "Chamar no WhatsApp" com mensagem pronta para o responsável e, quando alguém preenche "Data da visita", cria o evento no Google Agenda (mudar a data move o evento; apagar a data remove).

1. Na planilha: Extensões > Apps Script, apague o conteúdo e cole o arquivo inteiro.
2. Em Configurações do projeto, deixe o fuso horário como `(GMT-03:00) São Paulo`. Na planilha, Arquivo > Configurações > Localidade: Brasil.
3. Escolha a função `instalar` e clique em Executar. Autorize o acesso à planilha e ao Google Agenda.
4. Implantar > Gerenciar implantações > editar (lápis) > Versão: Nova versão > Implantar. O link do app da Web continua o mesmo.

## Publicar

A forma mais simples é a Vercel (plano gratuito): importe o repositório, defina `LEAD_WEBHOOK_URL` e `NEXT_PUBLIC_SITE_URL` e publique.

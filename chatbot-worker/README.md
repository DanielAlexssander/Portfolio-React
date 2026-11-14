# chatbot-worker

Back-end do chatbot do portfólio, feito como um Cloudflare Worker gratuito. Ele guarda a chave da IA e repassa à IA as perguntas que nenhuma palavra-chave respondeu.

## Como funciona

```
Visitante → site (GitHub Pages)
              │ 1. Palavras-chave (src/features/chatbot/knowledge) → resposta pronta
              │ 2. Nenhuma bateu? POST { question, language }
              ▼
           Worker (Cloudflare) → API compatível com OpenAI (Gemini por padrão)
```

- O perfil enviado à IA sai da mesma base de conhecimento do bot de palavras-chave (`src/features/chatbot/knowledge`). Mude a base uma vez e os dois modos ficam atualizados.
- Sem `VITE_CHATBOT_API_URL`, o site continua funcionando só com palavras-chave.
- Proteções da cota da IA:
  - no máximo **20 perguntas à IA por visitante por dia** (dia UTC), contadas no Workers KV (`AI_USAGE`). Perguntas respondidas por palavra-chave não contam. Ao atingir o limite, o chat avisa o visitante e continua respondendo por palavras-chave;
  - no máximo 10 perguntas por minuto por visitante e 30 por minuto no total;
  - perguntas de até 300 caracteres e respostas curtas.
- Para mudar o limite diário, altere `DAILY_AI_LIMIT` em `src/usageQuota.ts` e rode `npx wrangler deploy`.
- `ALLOWED_ORIGINS` só impede que *outros sites* usem o Worker pelo navegador. Não bloqueia chamadas diretas (curl), e é por isso que os limites acima existem.
- Use uma chave de um projeto do Google **sem faturamento ativado**. Assim, mesmo se alguém abusar, o máximo que acontece é a cota gratuita acabar, sem cobrança.

## Setup (uma vez)

1. **Chave da IA:** crie uma API key gratuita em https://aistudio.google.com/apikey.
2. **Conta Cloudflare:** crie uma conta gratuita em https://dash.cloudflare.com/sign-up.
3. **Login e deploy** (dentro desta pasta):

   ```bash
   cd chatbot-worker
   npx wrangler login
   npx wrangler secret put AI_API_KEY   # cole a chave do passo 1
   npx wrangler deploy
   ```

   O deploy mostra a URL do Worker, por exemplo `https://portfolio-chatbot.<sua-conta>.workers.dev`.
4. **Ligar no site:** no GitHub, vá em *Settings → Secrets and variables → Actions → Variables* e crie a variável `CHATBOT_API_URL` com essa URL. No próximo push, o deploy já usa a IA.

## Testar localmente

```bash
# Terminal 1: Worker local (lê a chave de chatbot-worker/.dev.vars → AI_API_KEY=...)
cd chatbot-worker && npx wrangler dev

# Terminal 2: site, apontando para o Worker local
echo "VITE_CHATBOT_API_URL=http://localhost:8787" > .env.local
npm run dev
```

## Trocar de provedor

O Worker fala com qualquer API compatível com OpenAI. Basta trocar `AI_BASE_URL` e `AI_MODEL` em `wrangler.toml` e a secret `AI_API_KEY`. Exemplo com Groq: `AI_BASE_URL = "https://api.groq.com/openai/v1"`, com o modelo escolhido no console da Groq e `AI_REASONING_EFFORT = ""`.

## Observações

- No plano gratuito do Gemini, o Google pode usar o conteúdo das requisições para melhorar os produtos. Aqui só trafegam as perguntas dos visitantes e dados públicos do perfil.
- Se o modelo configurado for descontinuado, troque `AI_MODEL` pelo modelo gratuito atual listado em https://aistudio.google.com/docs/pricing.

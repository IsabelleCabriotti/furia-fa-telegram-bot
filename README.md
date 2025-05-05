# 🤖 FURIA FÃ CHAT 🔥

Bem-vindo ao **FURIA FÃ CHAT**, um bot interativo para fãs do time de CS:GO da **FURIA** no Telegram. Este bot foi projetado para oferecer uma experiência única aos torcedores, com funcionalidades como quiz temático, sistema de pontuação, mensagens da torcida e muito mais!

## 🔥 Funcionalidades

- 🎯 Quiz interativo com perguntas sobre a FURIA
- 🏅 Sistema de pontuação por acertos no quiz
- 🎤 Grito aleatório da torcida com mensagens motivacionais
- 📰 Resultados recentes (em breve)
- 📺 Aviso de live (em breve)
- 🤖 Links oficiais da organização

## ⚙️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** – Ambiente de execução JavaScript.
- **[Express](https://expressjs.com/)** – Framework web leve para rotas e servidor.
- **[node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)** – Biblioteca para integração com a API do Telegram.
- **[dotenv](https://github.com/motdotla/dotenv)** – Gerenciamento de variáveis de ambiente.
- **[fs (File System)](https://nodejs.org/api/fs.html)** – Manipulação de arquivos locais (`pontuacoes.json`).
- **[rss-parser](https://github.com/rbren/rss-parser)** – Preparado para ler feeds RSS (função de resultados futuros).

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
Node.js (versão 16 ou superior)
npm (gerenciado via Node) ou Yarn
Conta no Telegram e Telegram Bot Token (obtido via BotFather)

## 🚀 Como rodar localmente

1. **Clone o repositório**

```bash
git clone https://github.com/IsabelleCabriotti/furia-fa-telegram-bot.git
cd furia-fa-telegram-bot
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` com o seguinte conteúdo:

```env
TELEGRAM_TOKEN=seu_token_do_bot
RENDER_EXTERNAL_URL=https://furia-fa-telegram-bot.onrender.com (opcional, se quiser que o bot funcione remotamente)
PORT=10000
```

> ⚠️ O arquivo `.env` já está listado no `.gitignore`, portanto não será enviado para o Git.

4. **Execute o bot**

```bash
node index.js
```

5. **No Telegram, envie o comando `/start` para o bot para começar a interação.**

---

## 🌐 Webhook e Deploy

### Configuração do Webhook
O bot utiliza **Express.js** para gerenciar o webhook. Certifique-se de configurar o `RENDER_EXTERNAL_URL` com a URL pública onde o bot estará hospedado.

### Deploy
O bot pode ser hospedado em plataformas como:
- **Render** (configuração simplificada para bots com webhook).
- **Heroku** (para deploy gratuito e rápido).
- **Vercel** ou **AWS** para maior escalabilidade.

---

## 📚 Referências e Documentação

- [Documentação Telegram Bot API](https://core.telegram.org/bots/api)
- [Node Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)

---

## 🌐 Links oficiais da FURIA

- 🌐 [Site Oficial](https://www.furia.gg/)
- 📱 [Instagram](https://www.instagram.com/furiagg/)
- 🎥 [YouTube](https://www.youtube.com/@FURIAggCS)
- 🎮 [Twitch](https://www.twitch.tv/furiatv)
- ✖️ [X / Twitter](https://x.com/furia?s=21)

## 💡 Contribuindo

Este projeto é de código aberto, pull requests são bem-vindos! Para grandes mudanças, abra uma issue antes para discutirmos o que você gostaria de modificar.

---
Desenvolvido com 🖤 por fã da FURIA. #GoFURIA 🔥


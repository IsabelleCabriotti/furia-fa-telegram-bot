const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const Parser = require('rss-parser');
require('dotenv').config();

const app = express();
const token = process.env.TELEGRAM_TOKEN;
const SPORTS_API_KEY = process.env.SPORTS_API_KEY;
const URL = process.env.RENDER_EXTERNAL_URL;
const PORT = process.env.PORT || 10000;

const bot = new TelegramBot(token);
bot.setWebHook(`${URL}/bot${token}`);

app.post(`/bot${token}`, express.json(), (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ---------------- SISTEMA DE PONTUAÇÃO ----------------
let pontuacoes = {};
const PONTUACOES_ARQUIVO = './pontuacoes.json';

function salvarPontuacoes() {
  fs.writeFileSync(PONTUACOES_ARQUIVO, JSON.stringify(pontuacoes));
}

function carregarPontuacoes() {
  if (fs.existsSync(PONTUACOES_ARQUIVO)) {
    pontuacoes = JSON.parse(fs.readFileSync(PONTUACOES_ARQUIVO));
  }
}
carregarPontuacoes();

function adicionarPontos(userId, pontos) {
  if (!pontuacoes[userId]) pontuacoes[userId] = 0;
  pontuacoes[userId] += pontos;
  salvarPontuacoes();
}

// ---------------- QUIZ INTERATIVO ----------------
const quiz = [
  { pergunta: "🎯 Em que ano a FURIA foi fundada?", opcoes: ["2015","2017","2018","2016"], correta: "2017" },
  { pergunta: "👑 Quem fundou a FURIA?", opcoes: ["FalleN","Guerri","André Akkari","KSCERATO"], correta: "André Akkari" },
  { pergunta: "🔥 Melhor resultado em Major?", opcoes: ["Top 8","Campeã","Top 4","Top 2"], correta: "Top 4" },
  { pergunta: "🎮 Qual jogador é conhecido como 'KSCERATO'?", opcoes: ["Kaike Cerato","Kaue Serato","Kauan Cerato","Kássio Cerato"], correta: "Kaike Cerato" }
];
const progresso = {};
function enviarPergunta(chatId) {
  const index = progresso[chatId] || 0;
  if (index >= quiz.length) {
    bot.sendMessage(chatId, "🏁 Fim do quiz! Valeu por jogar! 🔥");
    delete progresso[chatId];
    return;
  }
  const q = quiz[index];
  const teclado = q.opcoes.map(o => [{ text: o, callback_data: `resposta_${index}_${o}` }]);
  teclado.push([{ text: "❌ Sair do Quiz", callback_data: "sair_quiz" }]);
  bot.sendMessage(chatId, q.pergunta, { reply_markup: { inline_keyboard: teclado } });
}

// ---------------- MENU INICIAL ----------------
bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, "🔥 Bem-vindo(a) ao FURIA CS FÃ CHAT! Escolha uma opção:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎯 Quiz da FURIA", callback_data: "quiz" }],
        [{ text: "📰 Resultados Recentes", callback_data: "resultados" }],
        [{ text: "🎤 Grito da Torcida", callback_data: "torcida" }],
        [{ text: "📺 Live Status", callback_data: "live" }],
        [{ text: "🏅 Minha Pontuação", callback_data: "pontos" }],
        [{ text: "🤖 Contatos Oficiais", callback_data: "contato" }]
      ]
    }
  });
});

const parser = new Parser();

bot.on('callback_query', async cb => {
  const chatId = cb.message.chat.id;
  const data = cb.data;
  const userId = cb.from.id;

  if (data === 'sair_quiz') {
    delete progresso[chatId];
    return bot.sendMessage(chatId, "🚪 Você saiu do quiz. Até a próxima! 🔙");
  }

  if (data === 'quiz') {
    progresso[chatId] = 0; 
    adicionarPontos(userId, 10); 
    return enviarPergunta(chatId);
  }

  if (data.startsWith('resposta_')) {
    const [, idx, resposta] = data.split('_');
    const correta = quiz[parseInt(idx)].correta;
    const certo = resposta === correta;
    const texto = certo ? "✅ Resposta Correta!" : "❌ Resposta Errada.";
    if (certo) adicionarPontos(userId, 10);
    await bot.sendMessage(chatId, texto);
    progresso[chatId]++;
    return enviarPergunta(chatId);
  }

  if (data === 'resultados') {
    bot.sendMessage(chatId, "🏗️ Esta função está temporariamente indisponível. Em breve traremos os resultados da FURIA!");
  }

  if (data === 'torcida') {
    const msgs = [
      "🔥 **VAI FURIAAAAA!**",
      "💪 **Rumo ao TOP 1, confia!**",
      "🎯 **Clutch é com o KSCERATO!**",
      "🖤 **#GoFURIA!**"
    ];
    bot.sendMessage(chatId, msgs[Math.floor(Math.random()*msgs.length)], { parse_mode:'Markdown' });
  }

  if (data === 'live') {
    bot.sendMessage(chatId, "📺 Informações ao vivo ainda não estão disponíveis. Fique ligado nas próximas atualizações!");
  }

  if (data === 'pontos') {
    const pts = pontuacoes[userId]||0;
    bot.sendMessage(chatId, `🏅 Você tem ${pts} pontos!`);
  }
  if (data === 'contato') {
    bot.sendMessage(chatId, "🌟 Siga a FURIA nas redes sociais e fique por dentro de tudo!: \n🌐 Site: https://www.furia.gg/\n📱 Instagram: https://www.instagram.com/furiagg/\n🎥 YouTube: https://www.youtube.com/@FURIAggCS\n🎮 Twitch: https://www.twitch.tv/furiatv\n✖️ X: https://x.com/furia?s=21\nAcompanhe os bastidores, jogos, novidades e muito mais! #GoFURIA 🔥");
  }
  bot.answerCallbackQuery(cb.id);
});

app.listen(PORT,()=>console.log(`Bot rodando na porta ${PORT}`));
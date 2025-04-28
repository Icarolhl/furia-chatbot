
# 🦊 FURIA BOT — Chatbot de Fãs da FURIA Esports

Bem-vindo ao **FURIA BOT**, o chatbot oficial para os torcedores apaixonados da **FURIA Esports**!  
Construído com tecnologias modernas como **Next.js 15**, **React 19** e **TypeScript**.

---

## 🚀 Visão Geral do Projeto

- **Chatbot interativo** usando API de IA (OpenAI ou OpenRouter).
- **Modelo híbrido**: se a IA falhar, o sistema inteligente de palavras-chave assume automaticamente.
- **Responsivo**, com sons de notificação e animações suaves.
- Respostas curtas, enérgicas e divertidas — personalidade única do FURIA BOT!

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão |
|:---|:---|
| Next.js | 15 |
| React | 19 |
| TypeScript | 5 |
| TailwindCSS | 3 |
| Framer Motion | 10 |
| OpenRouter / OpenAI API | GPT 3.5 Turbo |

---

## 📂 Estrutura de Pastas

```
furia-chatbot/
├── public/
│   ├── sounds/ (sons de notificação)
│   ├── avatar-furia.png (avatar do bot)
│   └── favicon.ico (icone do site)
├── src/
│   ├── app/ (páginas e rotas)
│   ├── components/ (componentes do chatbot)
│   └── data/ (respostas pré-programadas)  
├── .gitignore
├── .gitattributes
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🧠 Como Funciona

- Usuário envia uma mensagem para o bot.
- O sistema tenta primeiro responder usando IA (OpenRouter/OpenAI).
- Se houver erro ou timeout, **o fallback inteligente baseado em palavras-chave assume**.
- Comando "ajuda" mostra botões interativos para facilitar a navegação.

---

## 🛡️ Funcionalidades

- Modelo híbrido (IA + Respostas programadas)
- Bot com tom jovem, divertido e acolhedor
- Animações de typing para realismo
- Projeto SEO-friendly e mobile-first

---

## ⚙️ Instalação e Execução Local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/furia-chatbot.git

# Instalar dependências
npm install

# Rodar em ambiente local
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📦 Build para Produção

```bash
npm run build
npm run start
```

---

## 🔑 Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para funcionar corretamente.

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a seguinte chave:

```bash
# Chave de API para OpenRouter ou OpenAI
OPENROUTER_API_KEY=your-openrouter-api-key-here
```

---

## 📢 Aviso

> Este projeto foi desenvolvido como parte de um desafio técnico para a equipe **FURIA Esports**.  
> Todos os direitos sobre a marca FURIA são reservados à organização.

# testeNiucoQA - Testes Automatizados com Playwright (UI + API)



Este projeto utiliza [Playwright](https://playwright.dev/) para realizar testes automatizados em:

- Interface do usuário do site [SauceDemo](https://www.saucedemo.com/)
- Endpoints da API pública [ReqRes](https://reqres.in/)

## 🚀 Tecnologias
- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- [Playwright Test](https://playwright.dev/docs/test-intro)


## 📦 Instalação

Clone o repositório e instale as dependências:

git clone https://gitlab.com/testeniuco/testeniucoqa.git
npm install

npx playwright install


## 🧪 Executar Testes

Testes de UI (SauceDemo)
Os testes UI cobrem cenários como:

Login com sucesso

Login inválido

Adicionar produtos ao carrinho

Finalizar compra com erro

Execute os testes de UI com: npx playwright test tests/ui

Testes de API (ReqRes)
Os testes de API cobrem endpoints como:

Listagem de usuários

Criação de usuário

Login com sucesso e falha

Execute os testes de API com: npx playwright test tests/api

## 📁 Estrutura do Projeto

.
├── tests
│   ├── api
│   │   └── reqres.spec.ts
|   ├── export-teste
|   |   └── login.spec.ts
│   └── ui
│       └── swaglabs.spec.ts
├── .gitignore
├── .gitlab-ci.yml
├── playwright.config.ts
├── package.json
└── README.md

## 📝 Requisitos

Node.js v18.12.1
npm v8 

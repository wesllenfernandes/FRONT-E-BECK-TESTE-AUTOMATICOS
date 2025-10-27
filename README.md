# Sistema de Livros

Projeto de gerenciamento de livros com Node.jS,Express, MySQL e Sequelize.  
Inclui testes automatizados backend e frontend com Jest, e deploy automático configurado para Render(caso dê certo) via GitHub Actions.

---

## **Funcionalidades**

- CRUD completo de livros (Create, Read, Update, Delete)
- API RESTful com Express
- Frontend simples com JavaScript puro
- Testes automatizados:
  - Backend usando SQLite para testes e Sequelize para produção, com objetivo de não poluir o BD
  - Frontend com mocks de fetch e DOM
- Deploy automático com GitHub Actions + Render

## **Pré-requisitos**
- Node.js = 18
- MySQL usado na maquina local
- npm 
- Conta no [Render](https://render.com) para deploy

## **Instalação**
1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
Instale as dependências:

bash
Copiar código
npm install
Configure o banco MySQL local:

Banco: livro
Usuário: root
Senha: 2000
(essas credenciais precisam ser alteradas no arquivo index.js, mas como objetivo é os teste, não precisa se atentar a isso)
Execução local e github actions
Para iniciar o servidor local:

bash
Copiar código
npm start
O servidor rodará na porta 3000 por padrão.

Abra no navegador: http://localhost:3000

Testes
O projeto possui testes automatizados backend e frontend.

Backend
Usa SQLite em memória durante os testes.

Rodar os testes:
backend:
npm run test:backend

Frontend
npm run test:frontend

Todos os testes de uma unica vez

execute: npm test
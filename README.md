
# Sistema de Livros

Projeto de gerenciamento de livros com Node.js, Express, MySQL(localmente) e Sequelize, com testes automatizados(no sqllite) (backend e frontend) e deploy automático planejado.

## Funcionalidades

* CRUD completo de livros (Create, Read, Update, Delete)
* API RESTful com Express
* Frontend simples em JavaScript puro (CSS/HTML básico)
* Testes automatizados:

  * Backend: com Jest + banco SQLite em memória para evitar poluir o BD de produção.
  * Frontend: testes com mocks de fetch/DOM.
* Deploy automático configurado com GitHub Actions + deploy no Render via CI/CD.

## Pré-requisitos

* Node.js versão ~18 (ou superior compatível)
* MySQL (para ambiente local/produção, caso for testar )
* npm 
* Conta no Render para deploy automático 

## Instalação e execução local

1. Clone o repositório:

   ```bash
   git clone https://github.com/wesllenfernandes/FRONT-E-BECK-TESTE-AUTOMATICOS.git
   cd FRONT-E-BECK-TESTE-AUTOMATICOS
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure o banco MySQL local:'

   * Banco: `defina_o_seu` 
   * Usuário: `defina_o_seu` 
   * Senha: `defina_o_seu` 

   > **Obs:** Altere estas credenciais no arquivo `index.js` (ou no arquivo de configuração do Sequelize) conforme seu ambiente local.
4. Inicie o servidor local:

   ```bash
   node index.js
   ```

   Por padrão o servidor roda na porta 3000 ([http://localhost:3000](http://localhost:3000)).
5. Acesse no navegador:

   ```
   http://localhost:3000
   ```

## Rodando os testes

* Para rodar todos os testes de backend, va no terminal e execute:

  ```bash
  npm run test:backend
  ```
* Para rodar todos os testes de frontend, va no terminal e execute:

  ```bash
  npm run test:frontend
  ```
* Para rodar todos os testes de uma vez:

  ```bash
  npm test
  ```

## Arquitetura e estrutura de pastas

* `index.js` — ponto de entrada do servidor/Express
* `frontend.js`, `index.html`, `index.js` (frontend) — código cliente
* `jest.backend.config.js`, `jest.backend.setup.js` — configuração de testes backend
* `jest.config.js` — configuração geral do Jest
* `package.json` / `package-lock.json` — dependências e scripts
* `.github/workflows/` — scripts de CI/CD (GitHub Actions)
* `node_modules/` — dependências instaladas

## Deploy automático

O projeto possui configuração para deploy automático via GitHub Actions para o Render. Você pode configurar no arquivo dentro de `.github/workflows/` para que, a cada push no branch `main`, o deploy seja executado automaticamente.

> Certifique-se de configurar variáveis de ambiente no serviço de hospedagem (por exemplo, dados de banco, segredo de sessão, etc).

## Observações importantes

* Em ambiente de teste, o backend usa SQLite em memória para não poluir o banco de produção.
* Em produção/local, use MySQL + Sequelize.
* Altere credenciais e configurações de banco antes de rodar em produção(nesse caso pelo banco que for usar).
* Adapte o frontend conforme seu estilo/design (este projeto usa JS puro para simplicidade).

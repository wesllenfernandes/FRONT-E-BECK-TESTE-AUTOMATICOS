jest.setTimeout(30000); // 30 segundos

const request = require('supertest');
const { initDatabase, sequelize } = require('./index.js');

let app;

describe('CRUD Livros', () => {
  beforeAll(async () => {
    app = await initDatabase(); // garante DB pronto antes de testar
  });

  it('Deve cadastrar um livro via POST', async () => {
    const novoLivro = { titulo: "Livro Teste", autor: "Autor Teste", preco: 50.0 };
    const response = await request(app).post('/livros').send(novoLivro);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('Deve listar os livros via GET', async () => {
    const response = await request(app).get('/livros');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um livro via PUT', async () => {
    const response = await request(app).put('/livros/1').send({ titulo: "Livro Atualizado" });
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe("Livro Atualizado");
  });

  it('Deve excluir um livro via DELETE', async () => {
    const response = await request(app).delete('/livros/1');
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await sequelize.close(); // fecha DB após testes
  });
});

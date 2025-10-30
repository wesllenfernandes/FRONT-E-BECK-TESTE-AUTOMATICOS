// testefront.js
const { 
  carregarLivros, 
  adicionarLivro, 
  editarLivro, 
  deletarLivro, 
  configurarEventListeners 
} = require('./frontend.js');

// Configurar mocks antes de qualquer teste
beforeAll(() => {
  // Mock do fetch
  global.fetch = jest.fn();

  // Mock de funções do navegador
  global.alert = jest.fn();
  global.confirm = jest.fn();
  global.prompt = jest.fn();

  // Silenciar logs durante os testes
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Testes das funções do frontend', () => {

  beforeEach(() => {
    // Mock do DOM
    document.body.innerHTML = `
      <form id="formLivro">
        <input type="text" id="titulo" placeholder="Título" required>
        <input type="text" id="autor" placeholder="Autor" required>
        <input type="number" id="preco" placeholder="Preço" step="0.01" required>
        <button type="submit">Adicionar Livro</button>
      </form>
      <div>
        <input type="number" id="livroId" placeholder="ID do livro">
        <button id="btnBuscar">Buscar</button>
        <div id="resultadoBusca"></div>
      </div>
      <div class="livros">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tabelaLivros"></tbody>
        </table>
      </div>
    `;

    // Limpar mocks antes de cada teste
    fetch.mockClear();
    alert.mockClear();
    confirm.mockClear();
    prompt.mockClear();


    configurarEventListeners();
  });

  test('carregarLivros deve buscar e exibir livros', async () => {
    const mockLivros = [
      { id: 1, titulo: 'Livro 1', autor: 'Autor 1', preco: 10.00 },
      { id: 2, titulo: 'Livro 2', autor: 'Autor 2', preco: 20.00 }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockLivros
    });

    await carregarLivros();

    const tabela = document.getElementById('tabelaLivros');
    expect(tabela.children.length).toBe(2);
    expect(tabela.children[0].children[1].textContent).toBe('Livro 1');
  });

  test('adicionarLivro deve fazer um POST', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await adicionarLivro('Título', 'Autor', 15.00);

    expect(fetch).toHaveBeenCalledWith('/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Título', autor: 'Autor', preco: 15.00 })
    });
  });

  test('editarLivro deve fazer um PUT', async () => {
    // Mock do prompt para retornar valores
    prompt.mockReturnValueOnce('Novo Título')
          .mockReturnValueOnce('Novo Autor')
          .mockReturnValueOnce('25.00');

    fetch.mockResolvedValueOnce({ ok: true });

    await editarLivro(1, 'Título Antigo', 'Autor Antigo', 15.00);

    expect(fetch).toHaveBeenCalledWith('/livros/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Novo Título', autor: 'Novo Autor', preco: 25.00 })
    });
  });

  test('deletarLivro deve fazer um DELETE', async () => {
    // Mock do confirm para retornar true
    confirm.mockReturnValue(true);
    fetch.mockResolvedValueOnce({ ok: true });

    await deletarLivro(1);

    expect(fetch).toHaveBeenCalledWith('/livros/1', { method: 'DELETE' });
  });

  test('deletarLivro não deve fazer DELETE se o usuário cancelar', async () => {
    // Mock do confirm para retornar false
    confirm.mockReturnValue(false);
    fetch.mockResolvedValueOnce({ ok: true });

    await deletarLivro(1);

    expect(fetch).not.toHaveBeenCalled();
  });

});

const API_URL = "/livros";

// GET all livros
async function carregarLivros() {
  console.log("Tentando carregar livros...");
  try {
    const res = await fetch(API_URL);
    console.log("Resposta da API:", res);
    
    // Verificar se a resposta é válida
    if (!res) {
      throw new Error("Resposta da API inválida");
    }
    
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    
    const livros = await res.json();
    console.log("Livros recebidos:", livros);
    
    const tabela = document.getElementById("tabelaLivros");
    tabela.innerHTML = "";

    if (livros.length === 0) {
      tabela.innerHTML = "<tr><td colspan='5'>Nenhum livro encontrado</td></tr>";
      return;
    }

    livros.forEach(livro => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${livro.id}</td>
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>R$ ${livro.preco}</td>
        <td>
          <button class="btn-editar" data-id="${livro.id}" data-titulo="${livro.titulo}" data-autor="${livro.autor}" data-preco="${livro.preco}">✏️ Editar</button>
          <button class="btn-excluir" data-id="${livro.id}">🗑️ Excluir</button>
        </td>
      `;
      tabela.appendChild(row);
    });
    
    console.log("Tabela atualizada com", livros.length, "livros");
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    alert("Erro ao carregar livros: " + error.message);
  }
}

// Função para adicionar livro (exportável)
async function adicionarLivro(titulo, autor, preco) {
  console.log("Tentando adicionar livro...");
  
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor, preco })
    });
    
    console.log("Resposta ao adicionar:", res);
    
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    
    // Recarregar a lista de livros
    carregarLivros();
    return true;
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    alert("Erro ao adicionar livro: " + error.message);
    return false;
  }
}

// Função para configurar os event listeners
function configurarEventListeners() {
  // Event listener para o formulário
  const formLivro = document.getElementById("formLivro");
  if (formLivro) {
    formLivro.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const titulo = document.getElementById("titulo").value;
      const autor = document.getElementById("autor").value;
      const preco = document.getElementById("preco").value;

      // Usar a função adicionarLivro
      const sucesso = await adicionarLivro(titulo, autor, preco);
      
      if (sucesso) {
        e.target.reset();
      }
    });
  }

  // Event delegation para os botões de editar e excluir
  document.addEventListener('click', function(e) {
    // Verificar se o botão clicado é o de editar
    if (e.target && e.target.classList.contains('btn-editar')) {
      const id = e.target.getAttribute('data-id');
      const titulo = e.target.getAttribute('data-titulo');
      const autor = e.target.getAttribute('data-autor');
      const preco = e.target.getAttribute('data-preco');
      
      editarLivro(id, titulo, autor, parseFloat(preco));
    }
    
    // Verificar se o botão clicado é o de excluir
    if (e.target && e.target.classList.contains('btn-excluir')) {
      const id = e.target.getAttribute('data-id');
      
      deletarLivro(id);
    }
  });
}

// GET por ID
async function buscarLivroPorId() {
  const id = document.getElementById("livroId").value;
  if (!id) {
    alert("Informe um ID!");
    return;
  }
  
  console.log("Tentando buscar livro por ID:", id);
  
  try {
    const res = await fetch(`${API_URL}/${id}`);
    console.log("Resposta da busca:", res);
    
    if (res.ok) {
      const livro = await res.json();
      document.getElementById("resultadoBusca").innerHTML =
        `<p><strong>${livro.titulo}</strong> - ${livro.autor} (R$ ${livro.preco})</p>`;
    } else {
      document.getElementById("resultadoBusca").innerHTML = "<p style='color:red'>Livro não encontrado</p>";
    }
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    document.getElementById("resultadoBusca").innerHTML = "<p style='color:red'>Erro ao buscar livro</p>";
  }
}

// PUT - editar livro
async function editarLivro(id, titulo, autor, preco) {
  console.log("Tentando editar livro:", id);
  
  const novoTitulo = prompt("Novo título:", titulo);
  const novoAutor = prompt("Novo autor:", autor);
  const novoPreco = prompt("Novo preço:", preco);

  if (novoTitulo && novoAutor && novoPreco) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: novoTitulo, autor: novoAutor, preco: parseFloat(novoPreco) })
      });
      
      console.log("Resposta ao editar:", res);
      
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      
      carregarLivros();
    } catch (error) {
      console.error("Erro ao editar livro:", error);
      alert("Erro ao editar livro: " + error.message);
    }
  }
}

// DELETE - deletar livro
async function deletarLivro(id) {
  if (confirm("Tem certeza que deseja excluir este livro?")) {
    console.log("Tentando deletar livro:", id);
    
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      console.log("Resposta ao deletar:", res);
      
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      
      carregarLivros();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      alert("Erro ao deletar livro: " + error.message);
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM carregado, inicializando...");
  carregarLivros();
  configurarEventListeners();
});

// Exportar funções para testes
module.exports = { carregarLivros, adicionarLivro, buscarLivroPorId, editarLivro, deletarLivro, configurarEventListeners };
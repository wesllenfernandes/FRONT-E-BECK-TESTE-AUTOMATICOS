const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const isTest = process.env.NODE_ENV === 'test';

/*const sequelize = isTest
  ? new Sequelize('sqlite::memory:', { logging: false })
  : new Sequelize('livro', 'root', '2000', {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: console.log
    });*/
const sequelize = isTest
 ? new Sequelize('sqlite::memory:', { logging: false })
  : new Sequelize('railway', 'root', 'DjDGydyTyozTgWriJGxDDRzRIiVIAmwN', {
     host: 'mainline.proxy.rlwy.net',
     port: 36841,
     dialect: 'mysql',
     logging: false, // Desative o logging para evitar o aviso
     dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
      }
    });



// Modelo Livro
const Livro = sequelize.define('Livro', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(100), allowNull: false },
  autor: { type: DataTypes.STRING(50), allowNull: false },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: true }
}, { tableName: 'livros', timestamps: true });

// Função para inicializar DB (para testes)
async function initDatabase() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  return app;
}

// Rotas CRUD
app.post('/livros', async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    res.status(201).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    await livro.update(req.body);
    res.json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    await livro.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/livros/limpar', async (req, res) => {
  try {
    await Livro.destroy({ where: {} });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia servidor apenas em produção
let server;
if (!isTest) {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = { app, sequelize, Livro, initDatabase, server };

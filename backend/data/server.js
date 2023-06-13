const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const ejs = require('ejs')

app.use(cors());

const storage = multer.diskStorage({
  destination: 'imagens_banco/',
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fatec123*',
  database: 'Animais'
});

// Rota para inserir os dados no banco
app.post('/inserir', upload.single('imagem'), (req, res) => {
  let { nome_animal, especie_op, sexo_op, idade_op, porte_op, cidade_animal, estado_animal, castradoValue, vacinadoValue, vermifugadoValue, cuidadoValue } = req.body;
  let sql = `INSERT INTO animais_doar (nome, raca, sexo, idade, porte, cidade, estado, vermifugado, castrado, vacinado, cuidados_especiais, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let values = [
    nome_animal,
    especie_op,
    sexo_op,
    idade_op,
    porte_op,
    cidade_animal,
    estado_animal,
    castradoValue,
    vacinadoValue,
    vermifugadoValue,
    cuidadoValue,
    req.file.filename
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados: ' + err.stack);
      res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
    } else {
      console.log('Dados inseridos com sucesso')
      res.status(200).json({ message: 'Dados inseridos com sucesso.' });
    }
  });
});

app.use(express.static('imagens_banco/')); // Define o diretório para servir as imagens

app.get('/imagem/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT imagem FROM animais_doar WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao recuperar a imagem.' });
    } else {
      if (results.length > 0) {
        const imagem = results[0].imagem;
        const filePath = path.join(__dirname, 'imagens_banco', `${imagem}`);
        res.sendFile(filePath);
      } else {
        res.status(404).json({ error: 'Imagem não encontrada.' });
      }
    }
  });
});

app.get('/animais', (req, res) => {
  connection.query('SELECT nome, cidade, porte, estado, idade, imagem FROM animais_doar', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao recuperar os animais.' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/animaisfiltro', (req, res) => {
  let { raca, sexo, porte, idade } = req.query;
  let sql = `SELECT nome, raca, idade, porte, cidade, estado, imagem FROM animais_doar WHERE raca = ?`;
  let values = [
    raca
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'não localizado' });
    } else {
      console.log('Dados inseridos com sucesso')
      res.status(200).json(result);
    }
  });
});


// Iniciar o servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
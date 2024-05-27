const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.use(cors());

app.get('/indicador', (req, res) => {
    db.query('SELECT * FROM tbIndicador', (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta SQL:', err);
            res.status(500).json({ error: 'Erro ao recuperar indicador' });
            return;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
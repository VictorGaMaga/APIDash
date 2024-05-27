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

const allowedOrigins = [
    'https://665322ae8877866874eb1150--cheerful-syrniki-99e4e6.netlify.app',
    'https://teste-conexao.netlify.app',
    'teste-conexao.netlify.app'
];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

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
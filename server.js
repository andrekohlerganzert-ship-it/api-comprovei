const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: true,
        sistema: 'API Comprovei',
        versao: '1.0'
    }); 
});

app.get('/teste-env', (req, res) => {
    res.json({
        usuario: process.env.COMPROVEI_USER ? 'OK' : 'VAZIO',
        senha: process.env.COMPROVEI_PASS ? 'OK' : 'VAZIO'
    });
});

app.post('/ws613', async (req, res) => {
    try {
        const response = await axios.post(
            'https://console-api.comprovei.com/exports/documentSAC',
            {
                formato_exportacao: req.body.formato_exportacao || 'json',
                filtros: req.body.filtros,
                campos_inclusos: req.body.campos_inclusos
            },
            {
                headers: {
                    username: process.env.COMPROVEI_USER,
                    password: process.env.COMPROVEI_PASS,
                    'Content-Type': 'application/json'
                },
                timeout: 300000
            }
        );

        return res.json(response.data);

    } catch (error) {
        return res.status(500).json({
            erro: true,
            mensagem: 'Erro ao consultar Comprovei',
            status: error.response?.status || null,
            detalhe: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

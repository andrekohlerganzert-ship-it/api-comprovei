
pp.get('/teste-env', (req, res) => {
    res.json({
        usuario: process.env.COMPROVEI_USER ? 'OK' : 'VAZIO',
        senha: process.env.COMPROVEI_PASS ? 'OK' : 'VAZIO'
    });
});

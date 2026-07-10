const https = require('https');
const app = require('express');

https.createServer(app).listen(3000, () => {
    console.log("Servidor rodadando na porta 3000");
})
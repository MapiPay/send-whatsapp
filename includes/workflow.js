const axios = require('axios');
const jsons = require('./jsons')
const query = require('./databases');

async function iniciarFlow(req, res, numCliente, documento) {
    const cpfCnpj = String(documento || '').replace(/[a-zA-Z0-9]/g, '');
    console.log(cpfCnpj);
    try {
        console.log(query.getData(req, res, documento));

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);

            jsons.menuCPF(numCliente);

            console.log('Início do flow CPF')
        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);

            jsons.menuCNPJ(numCliente)

            console.log('Início do flow CPF')
        } else {
            console.log("Documento inválido");
            jsons.documentoInvalido(numCliente, documento);
            jsons.solicitarDocumento(numCliente);
        }
    } catch (err) {
        console.log('iniciarFlow', err)
    }
}


module.exports = {
    iniciarFlow
}
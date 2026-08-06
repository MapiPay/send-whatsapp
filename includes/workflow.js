const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')
const query = require('./databases');

async function iniciarFlow(body, req, res, numCliente, documento) {
    let cpfCnpj = '';
    for (i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        cpfCnpj += i;
    }
    //const cpfCnpj = String(documento || '').replace(/[a-zA-Z0-9]/g, '');
    console.log(cpfCnpj);
    try {
        query.getData(req, res, documento);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);

            jsons.menuCPF(numCliente);

            console.log('Início do flow CPF')

            const opcao = await functions.extrairOpcao(body);
            console.log(opcao)

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);

            jsons.menuCNPJ(numCliente)

            console.log('Início do flow CNPJ')

            const opcao = await functions.extrairOpcao(body);
            console.log(opcao)

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
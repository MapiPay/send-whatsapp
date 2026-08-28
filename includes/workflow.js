const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')

async function iniciarFlow(numCliente, documento, estadoCliente) {
    let cpfCnpj = '';
    for (let i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        cpfCnpj += i;
    }

    console.log(cpfCnpj);

    try {
        const documentoCliente = await functions.consultaDocumento(cpfCnpj);
        console.log(documentoCliente);

        console.log(`Cliente ${documentoCliente.nome} iniciou o atendimento financeiro para CPF`);

        jsons.menu(numCliente);

        estadoCliente.set(numCliente, 'menu_pf')

        console.log('Início do flow CPF')

    } catch (err) {
        console.log('iniciarFlowSuporte', err)
    }
}

module.exports = {
    iniciarFlow,
}
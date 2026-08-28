const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')

async function iniciarFlow(numCliente, estadoCliente) {
    try {
        console.log(`Cliente iniciou o atendimento.`);

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
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

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${documentoCliente.nome} iniciou o atendimento financeiro para CPF`);

            await jsons.menuCPF(numCliente);

            estadoCliente.set(numCliente, 'menu_pf')
            
            console.log('Início do flow CPF')

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${documentoCliente.nomeEmpresarial} iniciou o atendimento financeiro para CNPJ`);

            await jsons.menuCNPJ(numCliente)

            estadoCliente.set(numCliente, 'menu_pj')

            console.log('Início do flow CNPJ')

        } else {
            console.log("Documento inválido");
            jsons.documentoInvalido(numCliente, documento);
            jsons.solicitarDocumento(numCliente);
        }
    } catch (err) {
        console.log('iniciarFlowSuporte', err)
    }
}

module.exports = {
    iniciarFlow,
}
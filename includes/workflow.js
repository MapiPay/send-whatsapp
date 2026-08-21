const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')

async function iniciarFlowSuporte(numCliente, documento) {
    let cpfCnpj = '';
    for (i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        cpfCnpj += i;
    }
    
    console.log(cpfCnpj);
    try {
        const documentoCliente = functions.consultaDocumento(documento);
        console.log(documentoCliente);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${documentoCliente.nome} iniciou o atendimento para CPF`);

            jsons.menuCPF(numCliente);

            console.log('Início do flow CPF')

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${documentoCliente.nomeEmpresarial} iniciou o atendimento para CNPJ`);

            jsons.menuCNPJ(numCliente)

            console.log('Início do flow CNPJ')

        } else {
            console.log("Documento inválido");
            jsons.documentoInvalido(numCliente, documento);
            jsons.solicitarDocumento(numCliente);
        }
    } catch (err) {
        console.log('iniciarFlow', err)
    }
}

async function iniciarFlowFinanceiro(numCliente, documento) {
    const documentoCliente = functions.consultaDocumento(documento);
    console.log(documentoCliente)
    console.log("Início do fluxo para o financeiro")
}


module.exports = {
    iniciarFlowSuporte,
    iniciarFlowFinanceiro
}
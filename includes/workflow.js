const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')

async function iniciarFlow(numCliente, documento, msgRecebida) {
    let cpfCnpj = '';
    for (i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        cpfCnpj += i;
    }

    console.log(cpfCnpj);
    console.log(msgRecebida)
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
        console.log('iniciarFlowSuporte', err)
    }
}

async function iniciarFlowFinanceiro(numCliente, documento) {
    let doc = '';
    for (i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        doc += i;
    }

    try {
        const documentoCliente = functions.consultaDocumento(documento);
        console.log(documentoCliente)
        console.log(`Início do fluxo do financeiro para ${documentoCliente.nomeEmpresarial}`)
    } catch (err){
        console.log('iniciarFlowFinanceiro', err)
    }
}

async function iniciarFlowSuporte(numCliente, documento) {
    let doc = '';
    for (i of documento) {
        if (i === '.' || i === '-' || i === '/') {
            continue
        }
        doc += i;
    }

    try {
        const documentoCliente = functions.consultaDocumento(documento);
        console.log(documentoCliente)
        console.log(`Início do fluxo de suporte para ${documentoCliente.nomeEmpresarial}`)
    } catch (err){
        console.log('iniciarFlowSuporte', err)
    }
}


module.exports = {
    iniciarFlow,
    iniciarFlowSuporte,
    iniciarFlowFinanceiro
}
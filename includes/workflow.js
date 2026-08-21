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
    
    if(msgRecebida === 'suporte'){
        await iniciarFlowSuporte(numCliente, documento)
    }
    if(msgRecebida === 'financeiro'){
        await iniciarFlowFinanceiro(numCliente, documento)
    }
}

async function iniciarFlowFinanceiro(numCliente, documento) {
    try {
        const documentoCliente = functions.consultaDocumento(documento);
        console.log(documentoCliente);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${documentoCliente.nome} iniciou o atendimento financeiro para CPF`);

            jsons.menuCPF(numCliente);

            console.log('Início do flow CPF')

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${documentoCliente.nomeEmpresarial} iniciou o atendimento financeiro para CNPJ`);

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

async function iniciarFlowSuporte(numCliente, documento) {
    try {
        const documentoCliente = functions.consultaDocumento(documento);
        console.log(documentoCliente);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${documentoCliente.nome} iniciou o atendimento suporte para CPF`);

            jsons.menuCPF(numCliente);

            console.log('Início do flow CPF')

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${documentoCliente.nomeEmpresarial} iniciou o atendimento suporte para CNPJ`);

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


module.exports = {
    iniciarFlow,
    iniciarFlowSuporte,
    iniciarFlowFinanceiro
}
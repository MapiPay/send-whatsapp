const axios = require('axios');
const functions = require('./functions')
const jsons = require('./jsons')
const estadoCliente = require('./estadoCliente');

async function iniciarFlow(message, body, req, res, numCliente, documento) {
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
        const consultaDb = functions.consulta(documento);
        console.log(consultaDb);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);

            jsons.menuCPF(numCliente);

            await estadoCliente.setEstadoCliente(numCliente, 'aguardando_menu_pf')

            console.log('Início do flow CPF')

        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);

            jsons.menuCNPJ(numCliente)

            await estadoCliente.setEstadoCliente(numCliente, 'aguardando_menu_pj')

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


module.exports = {
    iniciarFlow
}
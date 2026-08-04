const axios = require('axios');
const jsons = require('./jsons')
const query = require('./databases');
const sRequest = require('sync-request');
const idPhoneNumber = "436813806185181";
const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";

async function solicitarDocumento(destinatario) {
    await axios.post(
        `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
        {
            "messaging_product": 'whatsapp',
            "to": destinatario,
            "type": 'template',
            "template": {
                "name": 'solicitar_cpf_cnpj',
                "language": {
                    "code": 'pt_BR'
                }
            }
        },
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
    )
}

async function iniciarFlow(req, res, numCliente, documento) {
    const cpfCnpj = String(documento || '').replace(/\D/g, '');

    try {
        query.getData(req, res, documento);

        if (cpfCnpj.length === 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);

            const jsonPF = jsons.menuCPF(numCliente)
            res.send(jsonPF)
            //const response = sRequest('POST', 'https://graph.facebook.com/v19.0/' + idPhoneNumber + '/messages', { headers: { 'Authorization': 'Bearer ' + token }, body: JSON.stringify(jsonPF) });
            //const retorno = JSON.parse(response.body)
            console.log('Início do flow CPF')
        } else if (cpfCnpj.length > 11) {
            console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);

            inicioFlowCNPJ(numCliente);
            console.log('Início do flow CNPJ')
        } else {
            console.log("Documento inválido");
            documentoInvalido(numCliente, documento);
            solicitarDocumento(numCliente);
        }
    } catch (err) {
        console.log('iniciarFlow', err)
    }
}


async function documentoInvalido(destinatario, documento) {
    try {
        const response = axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                "messaging_product": 'whatsapp',
                "to": destinatario,
                "type": 'text',
                "text": {
                    "body": "Documento inválido. Tente novamente."
                }
            },
            {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    } catch (err) {

    }
}

module.exports = {
    solicitarDocumento,
    iniciarFlow
}
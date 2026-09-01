const axios = require('axios');
const sRequest = require('sync-request');
const jsons = require('./jsons');
const token = process.env.TOKEN;
const idPhoneNumber = process.env.ID_PHONE_NUMBER;

async function marcarComoLida(msgId) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                'messaging_product': 'whatsapp',
                'status': 'read',
                'message_id': msgId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

        console.log('Mensagem marcada como lida!', response.data);
        return response.data;
    } catch (err) {
        console.log('Erro ao enviar a mensagem: ', err.response ? err.response.data : err.message);
    }
}

async function extrairOpcao(message) {
    if (!message) {
        return null
    }

    if (message.type === 'interactive') {
        const { interactive } = message;
        if (interactive.type === 'list_reply') {
            return interactive.list_reply.id;
        }

        if (interactive.type === 'button_reply') {
            return interactive.button_reply.id;
        }
    }

    /*if (message.type === 'text') {
        return message.text.body.trim();
    }*/

    return null;
}

// VERIFICAR OPÇÃO PARA PF
async function rotearOpcao(opcao, numCliente, estadoCliente) {
    if (opcao === 'op_1') {
        await jsons.exibirSaldo(numCliente);
    } else if (opcao === 'op_2') {
        console.log("Opção referente ao status PIX")
    } else if (opcao === 'op_3') {
        console.log("Opção referente a alteração de cadastro")
    } else if (opcao === 'op_4') {
        console.log("Opção referente a nota fiscal")
    } else if (opcao === 'op_5') {
        console.log("Opção referente ao Comercial")
    } else if (opcao === 'op_6') {
        console.log("Opção referente ao Suporte")
    }

    estadoCliente.delete(numCliente);
}

// CONSULTA BANCO DE DADOS
function consultaNumero(phone_number) {
    const credenciais = Buffer.from("consultamapi@mapi.com.br:m6f%VWdG^ngBB1h&vMNnPiJJyR").toString('base64')
    let reqCliente = sRequest('GET', `https://api.mapipay.com.br/api/mapi/phone-number/${phone_number}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${credenciais}`
        }
    })
    let resCliente = JSON.parse(reqCliente.body);
    return resCliente;
}

function consultaDocumento(documento) {
    let reqCliente = sRequest('GET', `http://157.245.215.72:90/?documentNumber=${documento}`, { headers: { 'content-type': 'application/json' } })
    let resCliente = JSON.parse(reqCliente.body);
    return resCliente;
}


module.exports = {
    marcarComoLida,
    extrairOpcao,
    rotearOpcao,
    consultaNumero,
    consultaDocumento
}
const axios = require('axios');
const sRequest = require('sync-request');
const jsons = require('./jsons');
const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";
const idPhoneNumber = "436813806185181";

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
async function rotearOpcaoPF(opcao, numCliente) {
    if (opcao === 'pf_1') {
        await jsons.exibirSaldo(numCliente);
    } else if (opcao === 'pf_2') {
        console.log("Opção referente ao status PIX")
    } else if (opcao === 'pf_3') {
        console.log("Opção referente a alteração de cadastro")
    } else {
        console.log("Opção referente a falar com atendente")
    }
}

//VERIFICAR OPÇÃO PARA PJ
async function rotearOpcaoPJ(opcao, numCliente) {
    if (opcao === 'pj_1') {
        console.log("Opção referente ao Financeiro")
    } else if (opcao === 'pj_2') {
        console.log("Opção referente ao status PIX")
    } else if (opcao === 'pj_3') {
        console.log("Opção referente ao pagamento QRCode")
    } else if (opcao === 'pj_4') {
        console.log("Opção referente ao envio da nota Fiscal")
    } else if (opcao === 'pj_5') {
        console.log("Opção referente ao atendimento comercial")
    } else {
        console.log("Opção referente a falar com o Suporte")
    }
}

// CONSULTA BANCO DE DADOS
function consulta(phone_number) {
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


module.exports = {
    marcarComoLida,
    extrairOpcao,
    rotearOpcaoPF,
    rotearOpcaoPJ,
    consulta
}
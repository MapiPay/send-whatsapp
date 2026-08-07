const axios = require('axios');
const request = require('request');
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

async function rotearOpcaoPF(opcao, numCliente, message) {
    const acoesMenuPF = {
        pf_1: 'handlerSaldo',
        pf_2: 'handlerPix',
        pf_3: 'handlerCartao',
        pf_4: 'handlerBeneficios',
        pf_5: 'handlerSenha',
        pf_6: 'handlerAtendente',
    };

    const handler = acoesMenuPF[opcao];
    if (!handler) {
        jsons.documentoInvalido(numCliente)
        return false
    }

    try {
        await handler(numCliente)
        return true
    } catch (err) {
        console.error(`Erro ao executar handler da opção ${opcao}:`, err);
        return false;
    }
}

const sRequest = require('sync-request');

function consulta(documento) {
    let reqCliente = sRequest('POST', 'http://localhost:90', { headers: { 'content-type': 'application/json' }, body: JSON.stringify({ "documentNumber": documento }) })
    let resCliente = JSON.parse(reqCliente.body);
    const nome = resCliente.nome;
    return nome;
}


module.exports = {
    marcarComoLida,
    extrairOpcao,
    rotearOpcaoPF,
    consulta
}
const axios = require('axios');
const sRequest = require('sync-request');
const jsons = require('./jsons');
const token = "EAAWuXznOQGsBScxwTZCi0nqMCTbXVzs7NGX1UYqZB9YH2uwzTpNYa5zyNM7bKvBZAoBu6NIVy1aedBq2uCMmB2wHqejSfrWIyriR97KwcKYQ8nHfu7nCufo89aePzcpHG43Jpr8qBp5SIX209GeWqJAEGY4zihfvqJCvJl6bzWAdrg4iUOfOmyeSvDscgZDZD";
const idPhoneNumber = "467766706416009";

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
async function rotearOpcaoPF(opcao, numCliente, estadoCliente) {
    if (opcao === 'pf_1') {
        await jsons.exibirSaldo(numCliente);
    } else if (opcao === 'pf_2') {
        console.log("Opção referente ao status PIX")
    } else if (opcao === 'pf_3') {
        console.log("Opção referente a alteração de cadastro")
    } else {
        console.log("Opção referente a falar com atendente")
    }

    estadoCliente.delete(numCliente);
}

//VERIFICAR OPÇÃO PARA PJ
async function rotearOpcaoPJ(opcao, numCliente, estadoCliente) {
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

function consultaDocumento(documento){
    let reqCliente = sRequest('GET', `http://157.245.215.72:90/?documentNumber=${documento}`, { headers: {'content-type': 'application/json'} })
    let resCliente = JSON.parse(reqCliente.body);
    return resCliente;
}


module.exports = {
    marcarComoLida,
    extrairOpcao,
    rotearOpcaoPF,
    rotearOpcaoPJ,
    consultaNumero,
    consultaDocumento
}
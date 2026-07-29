const axios = require('axios');
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

async function iniciarFlow(numCliente, documento) {
    let cpf = '';
    for(let i =0; i<documento.length; i++){
        if(i == '.' || i == '-'){
            delete i;
        }
        cpf+= i;
    }
    console.log(cpf);
    
    if (documento.length < 15 && documento.length == 11) {
        console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);

        flowCpf(numCliente);
        console.log('Início do flow CPF')
    } else if (documento.length === 14 || 14 > documento.length <= 18) {
        console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);

        flowCNPJ(numCliente);
        console.log('Início do flow CNPJ')
    } else {
        console.log("Documento inválido")
    }
}


async function flowCpf(destinatario) {
    try {
        const response = axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                "messaging_product": 'whatsapp',
                "to": destinatario,
                "type": 'interactive',
                "interactive": {
                    "type": 'list',
                    "header": {
                        "type": 'text',
                        "text": 'Atendimento Pessoa Física'
                    },
                    "body": {
                        "text": 'Selecione uma das opções abaixo:'
                    },
                    "footer": {
                        "text": 'Escolha uma opção para continuar',
                    },
                    "action": {
                        "button": 'Ver opções',
                        "sections": [
                            {
                                "title": 'Menu CPF',
                                "rows": [
                                    { "id": "pf_1", "title": "1 - Saldo" },
                                    { "id": "pf_2", "title": "2 - PIX" },
                                    { "id": "pf_3", "title": "3 - Cartão" },
                                    { "id": "pf_4", "title": "4 - Benefícios" },
                                    { "id": "pf_5", "title": "5 - Senha" },
                                    { "id": "pf_6", "title": "6 - Falar com atendente" }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    } catch (err) {
        if (err.response) {
            console.log("Erro da Meta:", JSON.stringify(err.response.data, null, 2));
        } else {
            console.log("Erro ao processar o payload da Meta: ", err);
        }
    }
}

async function flowCNPJ(destinatario) {
    try {
        const response = axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                "messaging_product": "whatsapp",
                "to": destinatario,
                "type": "interactive",
                "interactive": {
                    "type": "list",
                    "header": {
                        "type": "text",
                        "text": "Atendimento Pessoa Jurídica"
                    },
                    "body": {
                        "text": "Selecione uma das opções abaixo:"
                    },
                    "footer": {
                        "text": "Escolha uma opção para continuar"
                    },
                    "action": {
                        "button": "Ver opções",
                        "sections": [
                            {
                                "title": "Menu PJ",
                                "rows": [
                                    { "id": "pj_1", "title": "1 - Financeiro" },
                                    { "id": "pj_2", "title": "2 - PIX" },
                                    { "id": "pj_3", "title": "3 - QR Code / Pagamentos" },
                                    { "id": "pj_4", "title": "4 - Nota Fiscal" },
                                    { "id": "pj_5", "title": "5 - Comercial" },
                                    { "id": "pj_6", "title": "6 - Suporte" }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    } catch (err) {
        if (err.response) {
            console.log("Erro da Meta:", JSON.stringify(err.response.data, null, 2));
        } else {
            console.log("Erro ao processar o payload da Meta: ", err);
        }
    }
}

module.exports = {
    solicitarDocumento,
    iniciarFlow
}
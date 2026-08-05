const { default: axios } = require("axios");
const idPhoneNumber = "436813806185181";
const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";


module.exports = {
    menuCPF: function (destinatario) {
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
        })

    },

    menuCNPJ: function (destinatario) {
        const jsonCNPJ = {
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
        }
    }
}
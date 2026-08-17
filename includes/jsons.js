const axios = require("axios");
const idPhoneNumber = "467766706416009";
const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";


module.exports = {
    menuPrincipal: async function (destinatario) {
        try {
            const response = await axios.post(
				`https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
                {
                    "messaging_product": 'whatsapp',
                    "to": destinatario,
                    "type": 'template',
                    "template": {
                        "name": 'menu_principal',
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
            return response.data
        } catch (err) {
            console.log('Erro solicitar documento: ', err.response ? err.response.data : err.message)
        }
    },

    solicitarDocumento: async function (destinatario) {
        try {
            const response = await axios.post(
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
        } catch (err) {
            console.log('Erro solicitar documento: ', response.err)
        }
    },

    menuCPF: function (destinatario) {
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
                                        { "id": "pf_2", "title": "2 - Status PIX" },
                                        { "id": "pf_3", "title": "3 - Alterar cadastro" },
                                        { "id": "pf_4", "title": "4 - Falar com atendente" }
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
            console.log("Erro menu CPF: ", response.err)
        }

    },

    exibirSaldo: async function (destinatario) {
        try {
            const response = await axios.post(
                `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
                {
                    "messaging_product": "whatsapp",
                    "to": destinatario,
                    "type": 'text',
                    "text": {
                        "body": "Seu saldo Conta Digital é de R$300,00 e de Benefícios é de R$644,00"
                    }
                },
                {
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (err) {
            console.log('Erro ao exibir saldo PF', JSON.stringify(err.response?.data, null, 2))
        }
    },

    menuCNPJ: function (destinatario) {
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
                    },
                },
                {
                    "headers": {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        } catch (err) {
            console.log('Erro menu CNPJ: ', response.err)
        }
    },

    documentoInvalido: function (destinatario, documento) {
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
            console.log('Erro documento inválido: ', response.err)
        }

    }
}
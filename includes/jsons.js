const axios = require("axios");
const idPhoneNumber = "467766706416009";
const token = "EAAWuXznOQGsBScxwTZCi0nqMCTbXVzs7NGX1UYqZB9YH2uwzTpNYa5zyNM7bKvBZAoBu6NIVy1aedBq2uCMmB2wHqejSfrWIyriR97KwcKYQ8nHfu7nCufo89aePzcpHG43Jpr8qBp5SIX209GeWqJAEGY4zihfvqJCvJl6bzWAdrg4iUOfOmyeSvDscgZDZD";


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
            return response.data;
        } catch (err) {
            console.log('Erro solicitar documento: ', err.response ? err.response.data : err.message)
        }
    },

    menu: async function (destinatario, contaCliente) {
        try {
            const response = await axios.post(
                `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
                {
                    "messaging_product": 'whatsapp',
                    "to": destinatario,
                    "type": 'interactive',
                    "interactive": {
                        "type": 'list',
                        "header": { "type": 'text', "text": 'Atendimento Pessoa Física' },
                        "body": { "text": 'Selecione uma das opções abaixo:' },
                        "footer": { "text": 'Escolha uma opção para continuar' },
                        "action": {
                            "button": 'Ver opções',
                            "sections": [
                                {
                                    "title": 'Menu CPF',
                                    "rows": [
                                        { "id": "pf_1", "title": "1 - Saldo" },
                                        { "id": "pf_2", "title": "2 - PIX" },
                                        { "id": "pf_3", "title": "3 - QR Code/Pagamentos" },
                                        { "id": "pf_4", "title": "4 - Nota Fiscal" },
                                        { "id": "pf_5", "title": "5 - Comercial" },
                                        { "id": "pf_6", "title": "6 - Suporte" }
                                    ]
                                }
                            ]
                        }
                    }
                },
                { "headers": { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } }
            )
            return response.data;
        } catch (err) {
            console.log("Erro menu: ", err.response ? JSON.stringify(err.response.data, null, 2) : err.message)
        }
    },

    exibirSaldo: async function (destinatario) {
        try {
            const response = await axios.post(
                `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
                {
                    "messaging_product": "whatsapp",
                    "to": destinatario,
                    "type": 'template',
                    "template": {
                        "name": "saldo_conta",
                        "language": {
                            "code": "pt_BR"
                        },
                        "components": [
                            {
                                'type': 'body',
                                'parameters': [
                                    { "type": "text", "text": "123,00" },
                                    { "type": "text", "text": "123,00" },
                                    { "type": "text", "text": "123,00" },
                                    { "type": "text", "text": "123,00" },
                                    { "type": "text", "text": "123,00" }
                                ]
                            },
                        ]
                    }
                },
                {
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data;
        } catch (err) {
            console.log('Erro ao exibir saldo PF', JSON.stringify(err.response?.data, null, 2))
        }
    },

    documentoInvalido: function (destinatario) {
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
            return response.data;
        } catch (err) {
            console.log('Erro documento inválido: ', response.err)
        }

    }
}
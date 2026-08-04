module.exports = {
    menuCPF: function (destinatario) {
        const jsonCPF = {
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
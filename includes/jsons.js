async function inicioFlowCpf(destinatario) {
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
                                    { "id": "pf_6", "title": "6 - Falar com atendente (Via WhatsApp)" }
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

async function inicioFlowCNPJ(destinatario) {
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
    inicioFlowCpf,
    inicioFlowCNPJ
}
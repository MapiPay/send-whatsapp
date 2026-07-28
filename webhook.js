const axios = require('axios');
let verificacao = false;

const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";
const idPhoneNumber = "436813806185181";
// const gestaoUser = 'consultamapi@mapi.com.br';
// const senhaUser = 'm6f%VWdG^ngBB1h&vMNnPiJJyR';

//Marcar mensagem como lida
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

//Gerar token
async function gerarToken(remetente, ddd, celular) {
    try {
        const response = await axios.post(
            'https://api.mapipay.com.br/api/mapi/pix/generate_token',
            {
                "area_code": ddd,
                "cellphone": celular
            },
            {
                auth: {
                    username: "consultamapi@mapi.com.br",
                    password: "m6f%VWdG^ngBB1h&vMNnPiJJyR"
                }
            }
        );

        if (!response.data.sucess) {
            console.log(`Token gerado com sucesso: ${response.data.data.token}`);
            return response.data.data.token
        } else {
            console.log(`Erro da API: ${response.data.message}`);
            return null;
        }
    } catch (err) {
        console.log('Erro na requisição para a API Mapi: ', err.response ? err.response.data : err.message);
        return null;
    }
}

//Enviar mensagem (Template)
async function enviarMensagem(destinatario, tokenGerado) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: destinatario,
                type: 'template',
                template: {
                    'name': 'envio_token',
                    'language': {
                        code: 'pt_BR'
                    },
                    components: [
                        {
                            'type': 'body',
                            'parameters': [
                                {
                                    'type': 'text',
                                    'text': tokenGerado
                                }
                            ]
                        },
                        {
                            'type': 'button',
                            'sub_type': 'url',
                            'index': '0',
                            'parameters': [
                                {
                                    'type': 'text',
                                    'text': tokenGerado
                                }
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Mensagem enviada!', response.data)
    } catch (err) {
        console.log('Erro ao enviar a mensagem: ', err.response ? err.response.data : err.message);
    }
}

async function erroEnvioToken(destinatario, ddd, celular) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: destinatario,
                type: 'template',
                template: {
                    'name': 'erro_envio_token',
                    'language': {
                        code: 'pt_BR'
                    },
                    components: [
                        {
                            'type': 'body',
                            'parameters': [
                                {
                                    'type': 'text',
                                    'text': ddd
                                },
                                {
                                    'type': 'text',
                                    'text': celular
                                }
                            ]
                        },
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (err) {
        console.log(err)
    }
}

async function solicitarDocumento(destinatario) {
    await axios.post(
        `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
        {
            messaging_product: 'whatsapp',
            to: destinatario,
            type: 'template',
            template: {
                name: 'solicitar_cpf_cnpj',
                language: {
                    code: 'pt_BR'
                }
            }
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

module.exports = {
    marcarComoLida,
    gerarToken,
    enviarMensagem,
    erroEnvioToken,
    solicitarDocumento
};
const axios = require('axios');
let verificacao = false;
const token = "EAAWuXznOQGsBSdewoN28WygtGp2r6HGKsfZCeI5DZBh8nvy2QPAw7DCh12xDZBLcZB7DdPm7l3N7kIQ35VyfJRJZCK2kwT6sUOwyKZCZAv8RQZCkU0iqMOQuXbNozULi0pbzeyV8MQe8494nAdNrcKw6QPiVrisgOBdRbVfJ7HMs7yBvCDN4GL9ZBsBBj16JF2hNwRezflIrTrNXLkStQyBN4G5fPzayBFI6Q4LHwkXZAqnfnEjlM4T4OMYuUU4qagQux89dKN0fkkBSPyNomaBWkB";
const idPhoneNumber = "467766706416009";
// const gestaoUser = 'consultamapi@mapi.com.br';
// const senhaUser = 'm6f%VWdG^ngBB1h&vMNnPiJJyR';

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

        if (response.data.success) {
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

module.exports = {
    gerarToken,
    enviarMensagem,
    erroEnvioToken
};
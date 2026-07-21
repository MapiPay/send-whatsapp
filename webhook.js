const axios = require('axios');
let verificacao = false;

const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";
const idPhoneNumber = "436813806185181";
const destinatario = "5541992314305";
//const messageId = 'wamid.HBgMNTU0MTkyMzE0MzA1FQIAEhggQUM2RThEQTlCQzBGOEI0Qjc5RjkzN0QxMUY3MTg0OTUA';

//Marcar mensagem como lida
async function marcarComoLida(msgId) {
    /*const url = `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`;

    const payload = {
        'messaging_product': 'whatsapp',
        'status': 'read',
        'message_id': msgId
    };*/

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

//Enviar mensagem (Template)
async function enviarMensagem() {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: destinatario,
                type: 'template',
                //type: 'text',
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
                                    'text': '12345'
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
                                    'text': '12345'
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

module.exports = {
    marcarComoLida,
    enviarMensagem
};
module.exports = {
    markAsRead(msgId) {
        try {
            jsonSend = { 'messaging_product': 'whatsapp', 'status': 'read', 'message_id': msgId }
            return jsonSend;
        } catch (err) {
            console.log(err)
        }
    },

    sendToken(dadosMessage) {
        try {
            jsonSend = {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: dadosMessage.msgFromNumber,
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
            console.log('Mensagem enviada.', response.data);
        } catch (err) {
            console.error('Erro ao enviar a mensagem: ', err.response ? err.response.data : err.message);
        }
    }
}

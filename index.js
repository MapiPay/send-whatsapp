const axios = require('axios');

const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";
const idPhoneNumber = "436813806185181";
const destinatario = "5541992314305";

const enviarMensagem = async () => {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${idPhoneNumber}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: destinatario,
                type: 'template',
                type: 'text',
                text: {
                    body: 'Mensagem teste enviada pelo Node.'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Mensagem enviada com sucesso!', response.data);
    } catch(err){
        console.error('Erro ao enviar a mensagem: ', err.response ? err.response.data : err.message);
    }
}

enviarMensagem();
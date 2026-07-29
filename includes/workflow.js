const axios = require('axios');
const idPhoneNumber = "436813806185181";

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
    solicitarDocumento,
}
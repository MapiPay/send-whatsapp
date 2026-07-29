const axios = require('axios');
const idPhoneNumber = "436813806185181";
const token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";

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

async function iniciarFlow(numCliente, documento) {
    if (documento.length == 14){
        console.log(`Cliente ${numCliente} iniciou o atendimento para CPF`);
    } else {
        console.log(`Cliente ${numCliente} iniciou o atendimento para CNPJ`);
    }
}

module.exports = {
    solicitarDocumento,
    iniciarFlow
}
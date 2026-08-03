const express = require('express');
const functions = require('./includes/functions')
const webhookToken = require('./includes/webhookToken');
const workflow = require('./includes/workflow');

const app = express();
app.use(express.json());

const tokenDeVerificacao = 'tokenDeEnvio@Mapi2026';
const clientesAguardandoDocumento = {};

app.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && challenge) {
        if (mode === 'subscribe' && token === tokenDeVerificacao) {
            console.log('Webhook verificado')
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403)
        }
    }
    return res.sendStatus(400)
})

app.get('/comercial', (req, res) => {
    res.redirect('https://wa.me/554191069081?text=Ol%C3%A1!%20Ainda%20n%C3%A3o%20sou%20cliente%20e%20gostaria%20de%20falar%20com%20a%20equipe%20comercial%20da%20MapiPay.')
})

app.post('/', async (req, res) => {
    const body = req.body;

    res.status(200).send('EVENT_RECEIVED');

    if (body.object === 'whatsapp_business_account') {
        try {
            const entry = body.entry?.[0];
            const change = entry?.changes?.[0];
            const messages = change?.value?.messages;

            if (messages && messages.length > 0) {
                const msgId = messages[0].id;
                const remetente = messages[0].from;
                const tipoMensagem = messages[0].type;
                console.log(`Nova mensagem recebida! ID: ${msgId}`);

                //const rementente = '0' + numeroWhats.slice(2);
                //console.log(remetente);

                let textoRecebido = '';
                if (tipoMensagem === 'text') {
                    textoRecebido = messages[0].text.body.toLowerCase();
                }

                const numeroWhats = '9' + remetente.slice(4)
                //console.log(numeroWhats)

                let ddd = '';
                let celular = '';

                if (remetente.startsWith('55') && remetente >= 12) {
                    ddd = remetente.substring(2, 4);
                    celular = '9' + remetente.substring(4);

                    //console.log(`DDD: ${ddd} | Celular: ${celular}`)
                }

                await functions.marcarComoLida(msgId);

                let numCliente = '0' + ddd + numeroWhats;
                //console.log(numCliente);
                let documentoRecebido;

                if (ddd && celular) {
                    if (clientesAguardandoDocumento[numCliente]) {
                        documentoRecebido = messages[0].text.body.trim();
                        console.log(`CPF/CNPJ recebido de ${numCliente}: ${documentoRecebido}`);

                        delete clientesAguardandoDocumento[numCliente];

                        await workflow.iniciarFlow(numCliente, documentoRecebido)
                    } else if (textoRecebido === 'token') {
                        const tokenGerado = await webhookToken.gerarToken(numCliente, ddd, celular);
                        //console.log(tokenGerado)

                        if (tokenGerado) {
                            await webhookToken.enviarMensagem(numCliente, tokenGerado);
                        } else {
                            webhookToken.erroEnvioToken(numCliente, ddd, celular);
                            console.log(`Correntista não encontrado para o número ${numCliente}`)
                        }
                    } else {
                        console.log(`Cliente ${numCliente} iniciou atendimento.`);
                        await workflow.solicitarDocumento(numCliente);
                        clientesAguardandoDocumento[numCliente] = true;
                    }
                }
            }
        } catch (err) {
            console.log("Erro ao processar o payload da Meta: ", err)
        }
    }
});

app.listen(85, () => {
    console.log('Servidor rodando na porta 85')
})

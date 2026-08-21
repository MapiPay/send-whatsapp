const express = require('express');
const functions = require('./includes/functions');
const webhookToken = require('./includes/webhookToken');
const workflow = require('./includes/workflow');
const jsons = require('./includes/jsons');
const { json } = require('body-parser');
const { watchFile } = require('fs');

const app = express();
app.use(express.json());

const tokenDeVerificacao = 'tokenDeEnvioHomolog@Mapi2026';
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

app.post('/', async (req, res) => {
    const body = req.body;

    res.status(200).send('EVENT_RECEIVED');

    if (body.object === 'whatsapp_business_account') {
        try {
            const entry = body.entry?.[0];
            const change = entry?.changes?.[0];
            const messages = change?.value?.messages;
            const name = change?.value?.contacts?.[0]?.profile?.name;

            if (messages && messages.length > 0) {
                const msgId = messages[0].id;
                const remetente = messages[0].from;
                const numDeTeste = '5541992314305'
                const tipoMensagem = messages[0].type;
                console.log(`${name}, ${remetente} enviou uma mensagem! ID: ${msgId}`);

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
                    let msgRecebida = '';
                    if (messages[0].type === 'text') {
                        msgRecebida = messages[0].text.body.toLowerCase();
                    } else if (messages[0].type === 'button') {
                        msgRecebida = messages[0].button.text.toLowerCase();
                    } else if (messages[0].type === 'interactive') {
                        msgRecebida = messages[0].interactive.button_reply.title.toLowerCase();
                    }
                    //console.log(msgRecebida)

                    const consultaCliente = functions.consultaNumero(numCliente);
                    console.log(consultaCliente);

                    if (!consultaCliente) {
                        console.log("Usuário não encontrado")
                    } else if (clientesAguardandoDocumento[numDeTeste]) {
                        documentoRecebido = messages[0].text.body.trim();
                        //console.log(documentoRecebido);
                        clientesAguardandoDocumento[numDeTeste] = false;
                        await workflow.iniciarFlow(numDeTeste, documentoRecebido, msgRecebida);
                    } else {
                        if (msgRecebida === 'gerar token') {
                            const tokenGerado = await webhookToken.gerarToken(numDeTeste, ddd, celular)
                            if (tokenGerado) {
                                await webhookToken.enviarMensagem(numDeTeste, tokenGerado)
                            } else {
                                console.log("Erro no evio do token")
                            }
                        } else if (msgRecebida === 'suporte') {
                            console.log("Início de atendimento suporte");
                            await jsons.solicitarDocumento(numDeTeste);
                            clientesAguardandoDocumento[numDeTeste] = true;
                        } else if (msgRecebida === 'financeiro') {
                            console.log("Início de atendimento financeiro")
                            await jsons.solicitarDocumento(numDeTeste);
                            clientesAguardandoDocumento[numDeTeste] = true;
                        } else {
                            await jsons.menuPrincipal(numDeTeste)
                        }
                    }
                }
            }
        } catch (err) {
            console.log("Erro ao processar o payload da Meta: ", err)
        }
    }
});

app.get('/comercial', (req, res) => {
    res.redirect('https://wa.me/554191069081?text=Ol%C3%A1!%20Ainda%20n%C3%A3o%20sou%20cliente%20e%20gostaria%20de%20falar%20com%20a%20equipe%20comercial%20da%20MapiPay.')
})

app.listen(85, () => {
    console.clear();
    console.log('Servidor rodando na porta 85')
})

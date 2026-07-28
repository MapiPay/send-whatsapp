const express = require('express');
const { marcarComoLida, gerarToken, enviarMensagem, erroEnvioToken, solicitarDocumento } = require('./webhook')


const app = express();
app.use(express.json());

const tokenDeVerificacao = 'tokenDeEnvio@Mapi2026';

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

                    console.log(`DDD: ${ddd} | Celular: ${celular}`)
                }

                await marcarComoLida(msgId);

                let numCliente = '0' + ddd + numeroWhats;
                //console.log(numCliente);

                if (ddd && celular) {
                    if (textoRecebido === 'token') {
                        const tokenGerado = await gerarToken(numCliente, ddd, celular);
                        //console.log(tokenGerado)

                        if (tokenGerado) {
                            await enviarMensagem(numCliente, tokenGerado);
                        } else {
                            erroEnvioToken(numCliente, ddd, celular);
                            console.log(`Correntista não encontrado para o número ${numCliente}`)
                        }
                    } else {
                        console.log(`Cliente ${numCliente} solicitou o menu PJ.`);
                        solicitarDocumento(numCliente);
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

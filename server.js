const express = require('express');
const { marcarComoLida } = require('./webhook');

const app = express();
app.use(express.json);

const tokenDeVerificacao = 'tokenDeEnvio@Mapi2026';

app.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && challenge){
        if(mode === 'subscribe' && token === tokenDeVerificacao){
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

    res.status(200).send('EVENT_RECIVED');

    if(body.object === 'whatsapp_business_account'){
        try{
            const entry = body.entry?.[0];
            const change = entry?.changes?.[0];
            const messages = change?.value?.messages;

            if(messages && messages.length > 0){
                const msgId = messages[0].id;
                console.log(`Nova mensagem recebida! ID: ${msgId}`);
                await marcarComoLida(msgId);
            }
        }catch(err){
            console.log("Erro ao processar o payload da Meta: ", err)
        }
    }
});

app.listen(85, () => {
    console.log('Servidor rodando na porta 3000')
})
require('dotenv').config();

const express = require('express');
const functions = require('./includes/functions');
const webhookToken = require('./includes/webhookToken');
const workflow = require('./includes/workflow');
const jsons = require('./includes/jsons');

const app = express();
app.use(express.json());

const tokenDeVerificacao = process.env.TOKEN_DE_VERIFICACAO;
const clientesConsultados = {};

const estadoCliente = new Map();

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

                if (remetente.startsWith('55')) {
                    ddd = remetente.substring(2, 4)
                    let parteCelular = remetente.substring(4)

                    if (parteCelular.length === 8) {
                        celular = '9' + parteCelular
                    } else {
                        celular = parteCelular
                    }
                    console.log(`DDD: ${ddd} | Celular: ${celular}`)
                }

                await functions.marcarComoLida(msgId);

                let numCliente = '0' + ddd + celular; // formato para uso interno
                console.log(numCliente);

                let number = '55' + ddd + celular; // formato para uso na API da Meta
                console.log(number);

                //console.log(numDeTeste);
                //console.log(remetente);

                if (ddd && celular) {
                    let msgRecebida = '';
                    let opcaoRoteada = false;

                    if (messages[0].type === 'text') {
                        msgRecebida = messages[0].text.body.toLowerCase();
                    } else if (messages[0].type === 'button') {
                        msgRecebida = messages[0].button.text.toLowerCase();
                    } else if (messages[0].type === 'interactive') {
                        const interactiveType = messages[0].interactive?.type;

                        if (interactiveType === 'button_reply' || interactiveType === 'list_reply') {
                            const reply = interactiveType === 'button_reply' ? messages[0].interactive.button_reply : messages[0].interactive.list_reply;

                            const opcaoId = reply?.id;
                            const etapa = estadoCliente.get(remetente);

                            if (etapa === 'menu_pf') {
                                await functions.rotearOpcao(opcaoId, remetente, estadoCliente);
                                opcaoRoteada = true;
                            } else {
                                msgRecebida = reply?.title?.toLowerCase() ?? '';
                            }
                        } else if (interactiveType === 'nfm_reply') {
                            console.log('Resposta de Flow recebida:', messages[0].interactive.nfm_reply?.response_json);
                            opcaoRoteada = true;
                        } else {
                            console.log('Subtipo interactive não tratado:', interactiveType);
                        }

                        if (opcaoRoteada) {
                            return;
                        }
                    }
                    //console.log(msgRecebida)

                    let consultaCliente;

                    if (clientesConsultados.hasOwnProperty(numCliente)) {
                        consultaCliente = clientesConsultados[numCliente];
                    } else {
                        consultaCliente = await functions.consultaNumero(numCliente);
                        clientesConsultados[numCliente] = consultaCliente;
                        console.log(consultaCliente);
                    }

                    const resultadoConsulta = consultaCliente.success

                    if (resultadoConsulta) {
                        if (msgRecebida === 'gerar token') {
                            const tokenGerado = await webhookToken.gerarToken(ddd, celular);
                            if (tokenGerado) {
                                await webhookToken.enviarMensagem(remetente, tokenGerado);
                            } else {
                                console.log("Erro no envio do token");
                            }
                        } else if (msgRecebida === 'suporte') {
                            await workflow.iniciarFlow(remetente, estadoCliente);
                        } else if (msgRecebida === 'menu') {
                            await jsons.menu(remetente);
                        } else {
                            const contaCliente = consultaCliente.data.account_remetente;
                            await jsons.menuPrincipal(remetente);
                            estadoCliente.set(remetente, 'menu_pf');
                        }
                    } else {
                        await jsons.contaNaoEncontrada(remetente);
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

app.get('/suporte', (req, res) => {
    res.redirect('https://wa.me/554185305944?text=Ol%C3%A1!%20J%C3%A1%20sou%20cliente%20MapiPay%20e%20preciso%20de%20ajuda%20com%20o%20meu%20cadastro')
})

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

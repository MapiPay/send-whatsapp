//const axios = require('axios');
const bodyParser = require('body-parser')
const http = require('http');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extende: true}))

const server = http.createServer((req, res) => {
    res.write('Hello World')
    res.end()
});

server.listen(85, () => {
    console.log("Servidor rodando na porta 85")
})

const messages = require('./includes/messages')
const functions = require('./includes/functions')

global.token = "EAAUi1ZAjBIQwBR0ZCJMMrZCaZAkHZC8ZC9GUVSePNUwzDZAOO7fsGkGOFCJXRKo0nWwas8dni7NSQJ5bRWXw9r2lkDlnmIDZA2ocP7CGfIZCDo3v6sn8vl7gRcTxFZBGWzRMwGG1rSgXdBNOXyK5oBKPpIdqQRXKo1pPtTCxz4ocm6b3ToOPGVN2UsTVmkQJQHTgZDZD";
global.idPhoneNumber = "436813806185181";
global.urlBase =  "https://graph.facebook.com/v25.0/"+idPhoneNumber+"/messages"
global.usersActive = [];
global.msgActive = false;

//const destinatario = "5541992314305";

app.post('/webhook', (req, res) => {
    messageData = functions.getMessageData(req)

    if(messageData) {
        msgActive = false;
        messages.markAsRead(req, res, messageData);
        msgId = messageData.msgId;
        msgFromNumber = messageData.msgFromNumber;
        msgFromName = messageData.msgFromName;

        if (messageData.msgType == "text") {
            if (msgActive == true) {
                messages.markAsRead(req, res, messageData);
                messages.sendToken(req, res, messageData);
            }
        }
    }
})

app.get('/webhook', (req, res) => {res.status(404).send()});
app.post('/webhook', (req, res) => {res.status(404).send()})
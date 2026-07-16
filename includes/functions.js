const sRequest = require('sync-request');
const jsons = require('./jsons');

module.exports = {
    getMessageData(req) {
        message = req.body;

        if (message.entry) {

            if (message.entry[0].changes[0].value.messages) {
                msgType = message.entry[0].changes[0].value.messages[0].type;
                msgId = message.entry[0].changes[0].value.messages[0].id;
                msgFromNumber = "+" + message.entry[0].changes[0].value.messages[0].from;
                codPais = msgFromNumber.substring(0, 3);
                codArea = msgFromNumber.substring(3, 5);
                number = msgFromNumber.substring(5, 15);

                if (number.length == 8) {
                    number = "9" + number;
                }

                msgFromNumber = codPais + codArea + number;
                msgFromName = message.entry[0].changes[0].value.contacts[0].profile.name;

                if (msgType == 'text') {
                    messageText = message.entry[0].changes[0].value.messages[0].text.body;
                    dadosMessage = {
                        msgId,
                        'msgFromNumber': msgFromNumber,
                        'msgFromName': msgFromName,
                        'messageText': messageText,
                        'msgType': msgType
                    };
                    return dadosMessage;
                }
            }
        }
    }
}
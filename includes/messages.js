const sRequest = require('sync-request')
const jsons = require('./jsons')

module.exports = {
    markAsRead(req, res, dadosMessage){
        jsonMessage = jsons.markAsRead(dadosMessage.msgId)
        module.exports.sendMessage(req, res, jsonMessage);

    },

    sendToken(req, res, dadosMessage){
        jsonMessage = jsons.sendToken(dadosMessage);
        console.log(JSON.stringify(jsonMessage));
        module.exports.sendMessage(req, res, jsonMessage)
    },

    sendMessage(req, res, jsonMessage){
        reqMessage = sRequest('POST', urlBase, {
            headers: {
                'content-type': 'application/json', 
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(jsonMessage)
        });
        resMessage = JSON.parse(reqMessage.body);
        console.log({
            'sucess': true,
            'dadosMessage': resMessage, 
            urlBase
        });
        return resMessage;
    }
}
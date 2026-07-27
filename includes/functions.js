function envioTokenOPT(numCliente, ddd, celular) {
    const marcarComoLida = require('../webhook').marcarComoLida;
    const gerarToken = require('../webhook').gerarToken;
    const erroEnvioToken = require('../webhook').erroEnvioToken;

    if (ddd && celular) {
        const tokenGerado = await gerarToken(numCliente, ddd, celular);
        //console.log(tokenGerado)

        if (tokenGerado) {
            await enviarMensagem(numCliente, tokenGerado);
        } else {
            erroEnvioToken(numCliente, ddd, celular);
            console.log(`Correntista não encontrado para o número ${numCliente}`)
        }
    }
}

module.exports = {
    envioTokenOPT,
}
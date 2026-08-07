const sRequest = require('sync-request');

function consulta(documento) {
    let reqCliente = sRequest('POST', 'https://serpro.mapipay.com.br/consulta', { headers: { 'content-type': 'application/json' }, body: JSON.stringify({ "documentNumber": documento }) })
    resCliente = JSON.parse(reqCliente.body);
    const nome = resCliente.nome
    return nome;
}

module.exports = {
    consulta
}
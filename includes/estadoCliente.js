
const cliente = require('./redisCliente')

async function setEstadoCliente(numCliente, estado) {
    await client.set(`estado:${numCliente}`, estado, { EX: 600 });
}

async function getEstadoCliente(numCliente) {
    return await client.get(`estado:${numCliente}`);
}

async function clearEstadoCliente(numCliente) {
    await client.del(`estado:${numCliente}`);
}

module.exports = { 
    setEstadoCliente, 
    getEstadoCliente, 
    clearEstadoCliente 
};
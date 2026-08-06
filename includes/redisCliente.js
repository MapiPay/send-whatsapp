const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Erro no Redis:', err));

(async () => {
    await client.connect();
    console.log('Redis conectado');
})();

module.exports = {
    client
}
const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.log("Erro ao se conectar ao redis", err);
}) 

redisClient.connect()
    .then(() => console.log("Conectado ao Redis com sucesso"))
    .catch((err) => console.log("Erro ao conectar ao Redis", err));

module.exports = redisClient;
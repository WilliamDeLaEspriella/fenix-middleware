const redis = require('redis');

module.exports = app => {

    const redisClient = redis.createClient(
        {
            port: app.config.port_redis,
            host: app.config.host_redis
        }
    );

    //creamos un cliente
    redisClient.on('connect', function () {
        console.log('Conectado a Redis Server');
    });

};
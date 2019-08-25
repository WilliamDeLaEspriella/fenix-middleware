const redis = require('redis');
const config = require('../../config')
let redisInstance = null;

const setupRedis = async () => {
    let clientData = {
        host: config.host_redis,
        port: config.port_redis
    }
    if (!redisInstance) {
        redisInstance = redis.createClient(clientData);
        console.log('new instance to redis!');
    }

    redisInstance.on('connect', () => {
        console.log(`Connected to redis! `);
    });

    redisInstance.on('error', err => {
        console.error(`[fatal error]: ${err.message}`);
        process.exit(1);
    });

    return redisInstance;
};

module.exports = { setupRedis }
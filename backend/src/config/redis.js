const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16639.crce281.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 16639
    }
});

module.exports =  redisClient;




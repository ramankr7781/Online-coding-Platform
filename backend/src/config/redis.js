const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16250.crce182.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 16250
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
});
module.exports =  redisClient;




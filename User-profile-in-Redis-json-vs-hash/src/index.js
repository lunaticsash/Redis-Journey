import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/user/:id/json', async (req, res) => {
    await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body)); //Note the use of JSON.stringify to store the user profile as a JSON string
    res.json({savedAs: "json"})
});

app.get('/user/:id/json', async (req, res) => {
    const raw = await redis.get(`user:${req.params.id}:json`);
    res.json({user: raw ? JSON.parse(raw) : null}) //Note the use of JSON.parse to retrieve the user profile as a JavaScript object
})

//Now I dont want data to be stored as string, i want to store it as object, so i will use hash data structure of redis
app.post('/user/:id/hash', async (req, res) => {
    await redis.hset(`user:${req.params.id}:hash`, req.body); //Note the use of hset to store the user profile as a hash
    res.json({savedAs: "hash"})
});

//When retrieving the user profile, we can use hgetall to get all the fields of the hash as an object
app.get('/user/:id/hash', async (req, res) => {
    const user = await redis.hgetall(`user:${req.params.id}:hash`); //Note the use of hgetall to retrieve the user profile as an object, hgetall gives whole object.

    res.json({user});

    // res.json({user: Object.keys(user).length > 0 ? user : null}) //Check if the hash exists and return null if it doesn't
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
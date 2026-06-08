import express from 'express';
import Redis from 'ioredis';

const app = express();

app.use(express.json());

const redis  = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const QUEUE_KEY = 'queue:email';//standard practice : redis key where your list is stored.
//or
//const QUEUE_KEY = 'email_queue';

app.post('/send-email', async (req, res) => {
    const job = {
        to: req.body.to,
        subject: req.body.subject || 'No Subject',
        body: req.body.body || 'No Content',
        createdAt: new Date().toISOString()
    }

    await redis.lpush(QUEUE_KEY, JSON.stringify(job));
    res.json({queued: true, job});

})

//Queue length endpoint
app.get('/emails/queue-length', async (req, res) => {
    const length = await redis.llen(QUEUE_KEY);//LLEN returns the number of elements in the Redis List.
    res.json({queueLength: length});
});

//Process one email job i.e. pop one job from the queue and simulate sending email
app.post('/emails/process-one', async(req,res) => {
    const rawJob = await redis.rpop(QUEUE_KEY);
    if(!rawJob){
        return res.json({message: 'No Jobs in the Queue'})
    }
    const job = JSON.parse(rawJob); //parse the job data from string to object
    //Simulate email sending
    res.json({message: 'Email Sent', job});
});

app.listen(3000, () => {
    console.log('Server is Running on port 3000');
});
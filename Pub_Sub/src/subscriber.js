import Redis from 'ioredis';

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Subscribe to the 'notifications' channel
subscriber.subscribe('notifications', (err) =>{ //channel where we are listening for messages
    if(err){
        console.error('Failed to subscribe: %s', err.message);
        return
    }
    console.log('Subscribed successfully!');
});


// Listen for messages on the subscribed channel
subscriber.on('message', (channel, message) => {
    console.log("Received on ", channel, ": ", JSON.parse(message));
});
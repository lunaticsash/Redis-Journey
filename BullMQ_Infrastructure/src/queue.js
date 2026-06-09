//Queue creation and connection to Redis
//Connection and Queue creation
import {Queue} from 'bullmq';

//Redis connection options
const connection = {
    host: 'localhost',
    port: 6379
};

//Can create multiple types of queues like order, payment,email,etc.

//Email Queue
const emailQueue = new Queue('emails', {connection});

module.exports = {
    emailQueue,
    connection
}
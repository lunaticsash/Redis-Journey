# BullMQ Email Queue

A simple background email queue built using **Node.js**, **Express**, **BullMQ**, and **Redis**.

## How It Works

```text
Client / Postman
       ↓
Express API (Producer)
       ↓
BullMQ Email Queue
       ↓
Redis
       ↓
Worker (Consumer)
       ↓
Email Processing
```

## Project Structure

```text
src/
├── api.js       # Receives requests and adds jobs
├── queue.js     # Creates the BullMQ queue
└── worker.js    # Processes queued jobs
```

## Main Components

* **Producer (`api.js`)** — adds email jobs to the queue.
* **Queue (`queue.js`)** — connects BullMQ with Redis.
* **Redis** — stores and manages jobs.
* **Worker (`worker.js`)** — consumes and processes jobs.

## Features

* Background job processing
* Automatic retries
* Exponential retry delay
* Separate producer and worker
* Redis-based queue storage

## Add an Email Job

```http
POST /send-email
```

Example request body:

```json
{
  "to": "user@example.com",
  "name": "Pranjal"
}
```

## Retry Configuration

```js
{
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000
  }
}
```

BullMQ retries a failed job up to three times with an increasing delay.

## Run the Project

Make sure Redis is running on port `6379`.

Install dependencies:

```bash
npm install
```

Start the API:

```bash
node src/api.js
```

Start the worker in another terminal:

```bash
node src/worker.js
```

The API runs on:

```text
http://localhost:3000
```

## What I Learned

* Producer and consumer architecture
* Background job processing
* BullMQ queues and workers
* Redis connection setup
* Job retries and exponential backoff
* Separating API and worker processes

## Note

This project currently simulates email processing. A real email service such as Nodemailer, Resend, or SendGrid can be connected inside the worker.

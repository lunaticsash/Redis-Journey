# Redis Email Queue

A simple email queue built using **Node.js**, **Express**, and **Redis Lists**.

## How It Works

* `LPUSH` adds email jobs to the queue.
* `RPOP` removes the oldest job.
* Together, they create a **FIFO queue**.

```text
First In → First Out
```

## API Endpoints

### Add Email Job

```http
POST /send-email
```

Example body:

```json
{
  "to": "user@example.com",
  "subject": "Welcome",
  "body": "Thanks for joining"
}
```

### Check Queue Length

```http
GET /emails/queue-length
```

### Process One Email

```http
POST /emails/process-one
```

This removes one job from the queue and simulates sending the email.

## Run Locally

Make sure Redis is running on port `6379`.

```bash
npm install
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

## What I Learned

* Redis Lists
* `LPUSH`, `RPOP`, and `LLEN`
* FIFO queue implementation
* Storing JavaScript objects using `JSON.stringify()`
* Reading stored data using `JSON.parse()`

## Limitation

This is a basic learning project. It does not currently include real email sending, retries, failed job handling, or worker acknowledgement.

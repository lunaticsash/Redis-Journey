# Redis Pub/Sub Notifications

A simple real-time notification system built using **Node.js**, **Express**, **Redis**, and **ioredis**.

## How It Works

```text
Client / Postman
       ↓
Express API (Publisher)
       ↓
Redis Channel
       ↓
Subscriber
```

The publisher sends messages to the `notifications` channel, and all active subscribers receive them instantly.

## Project Structure

```text
src/
├── api.js
└── subscriber.js
```

* `api.js` — publishes notification messages.
* `subscriber.js` — listens for notification messages.

## API Endpoint

```http
POST /notifications
```

Example request body:

```json
{
  "title": "New Course Available"
}
```

Example response:

```json
{
  "message": "Notification sent to 1 receiver"
}
```

## Run Locally

Make sure Redis is running on port `6379`.

Install dependencies:

```bash
npm install
```

Start the subscriber:

```bash
node src/subscriber.js
```

Start the API in another terminal:

```bash
node src/api.js
```

The API runs at:

```text
http://localhost:3000
```

## Redis Pub/Sub Concepts

* **Publisher** sends messages.
* **Channel** carries messages.
* **Subscriber** listens for messages.
* One published message is received by all active subscribers.

## Pub/Sub vs Queue

```text
Pub/Sub → one message, many active subscribers
Queue   → one job, one worker
```

## Limitation

Redis Pub/Sub does not store messages.

If a subscriber is offline when a message is published, that message is lost. Pub/Sub does not provide retries, acknowledgements, or message history.

## Best Use Cases

* Real-time notifications
* Chat messages
* Live dashboard updates
* Cache invalidation
* WebSocket events

## What I Learned

* Redis Publisher and Subscriber architecture
* Publishing messages to Redis channels
* Listening for messages using event handlers
* Using `JSON.stringify()` and `JSON.parse()`
* Difference between Pub/Sub and background queues

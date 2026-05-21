# Redis Banner API

A small Express + Redis project where I tried using Redis to store and manage a simple website banner message.

The aim of this project was to understand how Redis works with a Node.js backend and how we can use it instead of a normal database for small key-value data.For this project, I did not need a full database like MongoDB because I was only storing one simple value.

## What this project does

This API stores a banner message in Redis.

Example:

```txt
app:banner = Welcome to our site!
```

## Tech Stack

- Node.js
- Express.js
- Redis
- ioredis
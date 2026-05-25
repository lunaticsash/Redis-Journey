# Redis OTP Verification API

A small backend project where I used Redis to build a simple OTP verification flow.

The main idea of this project is to understand how Redis can be used for temporary data storage. Here, the OTP is stored in Redis with an expiry time, and once the OTP is verified, it gets deleted so it cannot be reused.

## What I Built

This project has a basic OTP system with three main parts:

- Generate and store OTP
- Verify OTP
- Check remaining OTP expiry time

Redis is used because OTPs are temporary and should automatically expire after some time.

## Tech Used

- Node.js
- Express.js
- Redis
- ioredis

## Features

- Generates a 6-digit OTP
- Stores OTP in Redis with expiry
- Verifies OTP using phone number
- Deletes OTP after successful verification
- Checks remaining TTL of OTP
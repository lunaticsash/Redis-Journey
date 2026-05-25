# Redis User Profile Storage

A small Express + Redis project where I tried two different ways of storing user profile data in Redis:

1. Storing the whole object as a JSON string using `SET`
2. Storing the object field-by-field using Redis Hashes with `HSET`

This helped me understand the practical difference between normal key-value storage and hash-based storage in Redis.

---

## Tech Used

- Node.js
- Express.js
- Redis
- ioredis
- Postman for testing APIs

---

## What I Learned

- `SET` stores a normal key-value pair.
- If I store an object using `SET`, I have to convert it using `JSON.stringify()`.
- While reading it back, I have to use `JSON.parse()`.
- Redis Hashes are better when I want to store object-like data.
- With `HSET`, I can update only one field without replacing the full object.
- With `HGETALL`, I can get the complete hash object.
- With `HGET`, I can get one field from the hash.
- With `HDEL`, I can delete one field from the hash.

---

## Small Example

Using JSON:

```js
await redis.set("user:123:json", JSON.stringify(user));
```

This stores the whole object as one string.

Using Hash:

```js
await redis.hset("user:123:hash", user);
```

This stores the object field by field.

---

## Main Takeaway

```txt
SET  -> stores one complete value
GET  -> gets one complete value

HSET -> stores object fields
HGET -> gets one field
HGETALL -> gets the full object
HDEL -> deletes one field
```

For user profile type data, Redis Hash feels more useful because I can update or read individual fields easily.
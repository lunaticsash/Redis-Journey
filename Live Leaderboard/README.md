# Redis Live Leaderboard

A simple leaderboard project built using Node.js, Express, Redis, and ioredis.

## What This Project Does

This project can:

* increase the view count of a post
* add or update a user's score
* show the top 10 users
* show the rank and score of a specific user

## How It Works

The client sends a request to the Express server.

The server then uses Redis to store or read the data.

Redis handles two types of data in this project:

* normal counters for post views
* sorted sets for leaderboard scores

## Post View Counter

Every post has a separate Redis key.

Whenever the view endpoint is called, Redis increases the count by 1.

Example:

```text
First request  → 1 view
Second request → 2 views
Third request  → 3 views
```

The post ID is taken from the URL, so no JSON body is required.

## Leaderboard

The leaderboard uses a Redis Sorted Set.

A Sorted Set stores:

```text
user + score
```

Example:

```text
Riya     → 150
Pranjal  → 100
Aman     → 80
```

Redis automatically sorts users according to their scores.

## Updating a Score

When a user's score is submitted, Redis stores it in the leaderboard.

If the same user already exists, the old score is replaced with the new score.

## Top 10 Users

The leaderboard endpoint returns the first 10 users from highest score to lowest score.

The response also includes:

* rank
* user ID
* score

## User Rank

A separate endpoint finds the position of one user.

Redis starts rank counting from 0, but normal human ranking starts from 1.

So:

```text
Redis rank 0 = actual rank 1
Redis rank 1 = actual rank 2
```

## Redis Commands Used

* `INCR` — increases post views by 1
* `ZADD` — adds or updates a user's score
* `ZREVRANGE` — returns users from highest score to lowest score
* `ZREVRANK` — returns one user's position
* `ZSCORE` — returns one user's score

## API Endpoints

* `POST /post/:id/view`
  Increases a post's view count.

* `POST /leaderboard/score`
  Adds or updates a user's score.

* `GET /leaderboard`
  Returns the top 10 users.

* `GET /leaderboard/:userId/rank`
  Returns one user's rank and score.

## Error Handling

The project handles:

* Redis connection errors
* missing user IDs
* missing scores
* invalid scores
* users not found in the leaderboard
* server errors

## What I Learned

* how to connect Express with Redis
* how Redis counters work
* how Redis Sorted Sets work
* how to build a leaderboard
* how to get the top users
* how to calculate user rank
* how URL parameters differ from JSON body data
* how to validate input
* how to handle errors

## Important Note

The leaderboard updates instantly inside Redis.

However, the frontend will only see changes after requesting the leaderboard again.

To make it truly live, Socket.IO or WebSockets can be added later.

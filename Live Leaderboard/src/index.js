import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (error) => {
  console.error("Redis error:", error.message);
});

app.post("/post/:id/view", async (req, res) => {
  try {
    const { id } = req.params;

    const viewCount = await redis.incr(`post:${id}:views`);

    res.json({
      success: true,
      postId: id,
      viewCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update view count",
    });
  }
});

app.post("/leaderboard/score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (!userId || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId and score are required",
      });
    }

    const numericScore = Number(score);

    if (!Number.isFinite(numericScore)) {
      return res.status(400).json({
        success: false,
        message: "Score must be a valid number",
      });
    }

    await redis.zadd("leaderboard", numericScore, userId);

    res.json({
      success: true,
      message: "Score updated",
      userId,
      score: numericScore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update score",
    });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const rawLeaderboard = await redis.zrevrange(
      "leaderboard",
      0,
      9,
      "WITHSCORES",
    );

    const leaderboard = [];

    for (let i = 0; i < rawLeaderboard.length; i += 2) {
      leaderboard.push({
        rank: i / 2 + 1,
        userId: rawLeaderboard[i],
        score: Number(rawLeaderboard[i + 1]),
      });
    }

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not load leaderboard",
    });
  }
});

// Get one user's rank
app.get("/leaderboard/:userId/rank", async (req, res) => {
  try {
    const { userId } = req.params;

    const rank = await redis.zrevrank("leaderboard", userId);

    if (rank === null) {
      return res.status(404).json({
        success: false,
        message: "User is not on the leaderboard",
        rank: null,
      });
    }

    const score = await redis.zscore("leaderboard", userId);

    res.json({
      success: true,
      userId,
      rank: rank + 1,
      score: Number(score),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not fetch user rank",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

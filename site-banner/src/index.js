import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json()); //middleware to parse JSON bodies

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY = "app:banner"; // Key to store the banner message in Redis

// This route stores the banner message in Redis.
app.post("/banner", async (req, res) => {
  await redis.set(BANNER_KEY, req.body.message || "Welcome to our site!"); // Store the banner message in Redis //redis.set Key value pair ko set krne ke kaam ata hai
  res.json({ success: true });
});

// This route gets the banner message from Redis.
app.get("/banner", async (req, res) => {
  const message = await redis.get(BANNER_KEY); //|| "Welcome to our site!"; // Retrieve the banner message from Redis, default if not set
  res.json({ message });
});

//Delete
app.delete("/banner", async (req, res) => {
  await redis.del(BANNER_KEY); // Delete the banner message from Redis
  res.json({ success: true });
});

//Checking it exists in our db or not
app.get("/banner/exists", async (req, res) => {
  const exists = await redis.exists(BANNER_KEY); // Check if the banner message exists in Redis
  // res.json({exists: !!exists})//exists returns 1 if the key exists and 0 if it does not, so we convert it to a boolean with !!
  res.json({ exists: Boolean(exists) });

  // res.json(exists); // 0 ya 1
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

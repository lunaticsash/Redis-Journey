//Producer
import express from "express";
import { emailQueue } from "./queue.js"; //import the email queue instance

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const job = await emailQueue.add(
      "send-welcome-email",
      {
        to: req.body.to,
        name: req.body.name || "Learner",
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      },
    );

    res.status(201).json({
      message: "Welcome email job added to the queue",
      jobId: job.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not add email job",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});

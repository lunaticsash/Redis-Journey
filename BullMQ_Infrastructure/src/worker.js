//Consumer + Worker

import { Job, Worker } from "bullmq";
import { connection } from "./queue.js";


//Worker creation and connection to Redis
const worker = new Worker(
  "emails", //Queue name
  async (job) => {
    console.log("Processing email job...", job.id, job.name, job.data); //Job processing function...

    (await new Promise((resolve) => setTimeout(resolve, 1500)), //Simulating job processing time
      console.log("Email job completed!", job.id, job.name, job.data)); //Job completion callback
  },
  {connection}
);

worker.on("completed", (job) => {
  console.log("Job completed event received!", job.id, job.name, job.data); //Job completion event listener
});

worker.on("failed", (job, err) => {
  console.error("Job failed event received!", job.id, job.name, job.data, err); //Job failure event listener
});

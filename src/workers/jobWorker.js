import { jobQueue } from './queue.js';
import { updateJob } from '../storage/jobStorage';
import { httpRequestDuration, jobCounter } from '../monitoring/metrics.js';
// import { redisWrapper } from '../config/redis.js';

const mockProcessing = async (jobData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

jobQueue.process(async (job) => {
  const endTimer = httpRequestDuration.startTimer();
//   const jobData = await redisWrapper.get(`job:${job.id}`)
  try {
    console.log(`Processing job ${job.id}: ${job.data.type}`);
    await mockProcessing(job.data);
    await updateJob(job.id, { status: 'completed' });
    jobCounter.labels(job.data.type, 'success').inc();
  } catch (error) {
    await updateJob(job.id, { status: 'failed', error: error.message });
    jobCounter.labels(job.data.type, 'failed').inc();
    throw error;
  } finally {
    endTimer({
      method: 'PROCESS',
      route: job.data.type,
      status: job.finishedOn ? 200 : 500,
    });
  }
});

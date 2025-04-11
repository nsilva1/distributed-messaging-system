import { jobQueue } from './queue.js';
import { updateJob } from '../storage/jobStorage.js';


const mockProcessing = async(jobData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
}


jobQueue.process(async (job) => {
  try {
    console.log(`Processing job ${job.id}: ${job.data.type}`);
    await mockProcessing(job.data);
    await updateJob(job.id, { status: 'completed' });
  } catch (error) {
    await updateJob(job.id, { status: 'failed', error: error.message });
    throw error;
  }
});


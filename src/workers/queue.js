import Bull from 'bull';
import { logger } from '../monitoring/logger';
import { jobCounter, httpRequestDuration } from '../monitoring/metrics';

const queue = new Bull('jobs', process.env.REDIS_URL);

queue.on('failed', (job, error) => {
    logger.error(`Job ${job.id} failed: ${error.message}`);
    jobCounter.labels(job.data.type, 'failed').inc()
})

export const jobQueue = queue;

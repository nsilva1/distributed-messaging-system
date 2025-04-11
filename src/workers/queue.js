import Bull from 'bull';
import { redisConfig } from '../config/redis';

export const jobQueue = new Bull('jobs', {
  redis: redisConfig,
  settings: {
    retryProcessDelay: 5000,
  },
});

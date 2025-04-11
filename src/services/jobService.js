import { v4 as uuidV4 } from "uuid";
import { jobQueue } from "../workers/queue";
import { storeJob } from '../storage/jobStorage';
import { redisWrapper } from "../config/redis";

export const createJob = async ( jobData ) => {
    if (!jobData.type) throw new Error('Job type is required');
    
    const job = {
      id: uuidV4(),
      status: 'queued',
      ...jobData
    };
  
    await storeJob(job);
    await redisWrapper.set(`job:${job.id}`, JSON.stringify(job), 3600)
    await jobQueue.add(job);
    return job;
  }
  
export const getJob = async ( jobId ) => {
    const data = await redisWrapper.get(`job:${jobId}`)
    return JSON.parse(data)
}
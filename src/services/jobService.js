import { v4 as uuidV4 } from "uuid";
import { jobQueue } from "../workers/queue";
import { storeJob, fetchJob } from '../storage/jobStorage';

export const createJob = async ( jobData ) => {
    if (!jobData.type) throw new Error('Job type is required');
    
    const job = {
      id: uuidV4(),
      status: 'queued',
      ...jobData
    };
  
    await storeJob(job);
    await jobQueue.add(job);
    return job;
  }
  
export const getJob = async ( jobId ) => {
    return await fetchJob(jobId);
}
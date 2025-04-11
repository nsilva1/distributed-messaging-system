import redis from 'redis';
const client = redis.createClient(process.env.REDIS_URL);

export const storeJob = async (job) => {
  await client.set(`job:${job.id}`, JSON.stringify(job));
}

export const fetchJob = async (jobId) => {
  const data = await client.get(`job:${jobId}`);
  return data ? JSON.parse(data) : null;
}

export const updateJob = async (jobId, updates) => {
  const job = await fetchJob(jobId);
  if (!job) throw new Error('Job not found');
  await storeJob({ ...job, ...updates });
}
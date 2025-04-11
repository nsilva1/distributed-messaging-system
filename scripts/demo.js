import { jobQueue } from '../src/workers/queue';

for (let i = 0; i < 10; i++) {
  await jobQueue.add({ type: `Demo-${i}`, data: { index: i } });
}

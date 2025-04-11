import express from 'express';
import prometheus from 'prom-client';

const router = express.Router();
prometheus.collectDefaultMetrics();

router.get('/', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

export default router;

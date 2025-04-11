import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import jobsRouter from './api/jobs.js';
import metricsRouter from './api/metrics.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './monitoring/logger.js';
import { connectRedis } from './config/redis.js';

const app = express();
await connectRedis()

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/jobs', jobsRouter);
app.use('/metrics', metricsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use(errorHandler);

export default app;
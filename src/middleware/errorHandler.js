import { logger } from '../monitoring/logger.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message,
    },
  };

  if (err.details) {
    response.error.details = err.details;
  }

  // Log server errors only
  if (statusCode >= 500) {
    logger.error(`${statusCode} - ${err.message}`, {
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  res.status(statusCode).json(response);
};
import { jobSchema } from '../config/jobSchema';
import { logger } from '../monitoring/logger';

export const validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const details = error.details.map(e => ({
        field: e.path.join('.'),
        issue: e.message.replace(/"/g, ''),
    }))

    logger.warn(`Validation failed`, { details });

    const error = new Error('Invalid input');
    error.statusCode = 400;
    error.code = 'VALIDATION_ERROR'
    error.details = details
    throw error;
  }
  
  next();
};

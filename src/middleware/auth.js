import jwt from 'jsonwebtoken';
import { logger } from '../monitoring/logger';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('Authentication failed: No token provided');
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    logger.error(`Authentication failed: ${error.message}`);
    res.status(401).json({ error: 'Invalid token' });
  }
};
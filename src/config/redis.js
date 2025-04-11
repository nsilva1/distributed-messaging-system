import redis from 'redis';
import { logger } from '../monitoring/logger.js';

// Create Redis client with environment variable fallback
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Event handlers for Redis connection
client.on('connect', () => {
  logger.info('Redis client connected');
});

client.on('error', (err) => {
  logger.error(`Redis error: ${err.message}`);
});

client.on('reconnecting', () => {
  logger.warn('Redis client reconnecting...');
});

client.on('end', () => {
  logger.warn('Redis client disconnected');
});


const connectRedis = async () => {
  try {
    await client.connect();
  } catch (err) {
    logger.error(`Redis connection failed: ${err.message}`);
    process.exit(1); 
  }
};


const shutdownRedis = async () => {
  try {
    await client.quit();
    logger.info('Redis client gracefully disconnected');
  } catch (err) {
    logger.error(`Redis shutdown error: ${err.message}`);
  }
};


const redisWrapper = {
  get: async (key) => {
    try {
      return await client.get(key);
    } catch (err) {
      logger.error(`Redis GET failed for key ${key}: ${err.message}`);
      throw err;
    }
  },
  set: async (key, value, ttlSeconds = null) => {
    try {
      if (ttlSeconds) {
        return await client.setEx(key, ttlSeconds, value);
      }
      return await client.set(key, value);
    } catch (err) {
      logger.error(`Redis SET failed for key ${key}: ${err.message}`);
      throw err;
    }
  },
  del: async (key) => {
    try {
      return await client.del(key);
    } catch (err) {
      logger.error(`Redis DEL failed for key ${key}: ${err.message}`);
      throw err;
    }
  }
};

export { client, connectRedis, shutdownRedis, redisWrapper };
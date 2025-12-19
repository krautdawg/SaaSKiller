import Redis from 'ioredis';

/**
 * Redis Configuration for Bull Queue
 *
 * Provides centralized Redis connection with:
 * - Connection pooling and retry logic
 * - Error handling and logging
 * - Graceful shutdown support
 */

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0'),
  maxRetriesPerRequest: parseInt(process.env.REDIS_MAX_RETRIES || '3'),
  enableOfflineQueue: process.env.REDIS_ENABLE_OFFLINE_QUEUE === 'true',
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    console.log(`🔄 Redis reconnection attempt ${times}, waiting ${delay}ms`);
    return delay;
  }
};

// Create Redis client instance
const redisClient = new Redis(redisConfig);

// Connection event handlers
redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redisClient.on('ready', () => {
  console.log('✅ Redis ready to accept commands');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis connection error:', error.message);
});

redisClient.on('close', () => {
  console.log('🔌 Redis connection closed');
});

redisClient.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting...');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📥 SIGTERM received, closing Redis connection...');
  await redisClient.quit();
});

process.on('SIGINT', async () => {
  console.log('📥 SIGINT received, closing Redis connection...');
  await redisClient.quit();
});

export { redisClient, redisConfig };
export default redisClient;

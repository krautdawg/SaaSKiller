import Queue from 'bull';
import { redisConfig } from '../config/redis.js';

/**
 * Queue Service for Email Audit Reports
 *
 * Manages Bull job queue with:
 * - Exponential backoff retry logic
 * - Job timeout and stalled job detection
 * - Age/count-based job retention
 * - Comprehensive error handling
 */

// Create email queue instance
export const emailQueue = new Queue(
  process.env.QUEUE_NAME || 'email-reports',
  {
    redis: redisConfig,
    defaultJobOptions: {
      attempts: parseInt(process.env.QUEUE_ATTEMPTS || '3'),
      backoff: {
        type: 'exponential',
        delay: parseInt(process.env.QUEUE_BACKOFF_DELAY || '2000')
      },
      timeout: parseInt(process.env.QUEUE_JOB_TIMEOUT || '120000'), // 2 minutes
      removeOnComplete: {
        age: parseInt(process.env.QUEUE_COMPLETE_AGE || '86400'), // 24 hours
        count: parseInt(process.env.QUEUE_COMPLETE_COUNT || '1000') // Keep last 1000
      },
      removeOnFail: {
        age: parseInt(process.env.QUEUE_FAIL_AGE || '604800') // 7 days
      }
    },
    settings: {
      stalledInterval: parseInt(process.env.QUEUE_STALLED_INTERVAL || '30000'), // 30s
      maxStalledCount: parseInt(process.env.QUEUE_MAX_STALLED || '2'),
      lockDuration: 120000, // 2 minutes (match job timeout)
      lockRenewTime: 60000 // Renew lock every 60s
    }
  }
);

// Queue event handlers
emailQueue.on('error', (error) => {
  console.error('❌ Queue error:', error.message);
});

emailQueue.on('waiting', (jobId) => {
  console.log(`⏳ Job ${jobId} is waiting`);
});

emailQueue.on('active', (job) => {
  console.log(`🔄 Job ${job.id} started processing`);
});

emailQueue.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed:`, result?.messageId || 'success');
});

emailQueue.on('failed', (job, error) => {
  console.error(`❌ Job ${job.id} failed:`, error.message);
});

emailQueue.on('stalled', (job) => {
  console.warn(`⚠️ Job ${job.id} stalled (worker may have crashed)`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📥 SIGTERM received, closing email queue...');
  await emailQueue.close();
});

process.on('SIGINT', async () => {
  console.log('📥 SIGINT received, closing email queue...');
  await emailQueue.close();
});

/**
 * Add job to email queue
 * @param {Object} data - Job data (reportId, email, etc.)
 * @param {Object} options - Optional job-specific options
 * @returns {Promise<Object>} - Bull job instance
 */
export async function addEmailJob(data, options = {}) {
  try {
    const job = await emailQueue.add(data, options);
    console.log(`📧 Email job ${job.id} added to queue for ${data.email}`);
    return job;
  } catch (error) {
    console.error('❌ Failed to add job to queue:', error.message);
    throw error;
  }
}

/**
 * Get queue statistics
 * @returns {Promise<Object>} - Queue stats (waiting, active, completed, failed)
 */
export async function getQueueStats() {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    emailQueue.getWaitingCount(),
    emailQueue.getActiveCount(),
    emailQueue.getCompletedCount(),
    emailQueue.getFailedCount(),
    emailQueue.getDelayedCount()
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    total: waiting + active + completed + failed + delayed
  };
}

/**
 * Clean old jobs from queue
 * @param {number} gracePeriod - Age in milliseconds
 * @returns {Promise<Array>} - Cleaned job IDs
 */
export async function cleanQueue(gracePeriod = 86400000) {
  const cleaned = await emailQueue.clean(gracePeriod, 'completed');
  console.log(`🧹 Cleaned ${cleaned.length} completed jobs older than ${gracePeriod}ms`);
  return cleaned;
}

export default emailQueue;

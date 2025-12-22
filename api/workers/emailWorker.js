import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from api/.env
dotenv.config({ path: join(__dirname, '../.env') });

import { emailQueue } from '../services/queueService.js';
import { sendAuditReport } from '../services/emailService.js';
import { pool } from '../db.js';

/**
 * Email Worker - Background Job Processor
 *
 * Processes email audit report jobs from Bull queue with:
 * - Database-first approach (fetch data from audit_reports table)
 * - Error classification (transient vs permanent)
 * - Comprehensive error logging
 * - Status updates
 */

/**
 * Determine if error is transient (should retry) or permanent (don't retry)
 * @param {Error} error - Error object
 * @returns {boolean} - true if transient, false if permanent
 */
function isTransientError(error) {
  // Network/connection errors (transient - should retry)
  if (error.code === 'ECONNREFUSED') return true;
  if (error.code === 'ENOTFOUND') return true;
  if (error.code === 'ETIMEDOUT') return true;
  if (error.code === 'ECONNRESET') return true;
  if (error.message?.includes('timeout')) return true;
  if (error.message?.includes('Connection closed')) return true;

  // SMTP errors (check if transient)
  if (error.responseCode) {
    // 4xx = temporary failure (retry), 5xx = permanent failure (don't retry)
    return error.responseCode >= 400 && error.responseCode < 500;
  }

  // PDF generation errors (permanent - bad data)
  if (error.message?.includes('Invalid audit data')) return false;
  if (error.message?.includes('PDF generation failed')) return false;

  // Template errors (permanent - missing template)
  if (error.message?.includes('Email template not found')) return false;

  // Default: treat as transient (safer to retry)
  return true;
}

/**
 * Process email job
 * @param {Object} job - Bull job instance
 * @returns {Promise<Object>} - Processing result
 */
async function processEmailJob(job) {
  const { reportId } = job.data;
  console.log(`📧 Processing email job for report: ${reportId}`);

  try {
    // Step 1: Fetch audit report from database
    const result = await pool.query(
      'SELECT * FROM audit_reports WHERE id = $1',
      [reportId]
    );

    if (result.rows.length === 0) {
      throw new Error(`Audit report not found: ${reportId}`);
    }

    const auditData = result.rows[0];

    // Step 2: Update status to 'processing'
    await pool.query(
      'UPDATE audit_reports SET status = $1 WHERE id = $2',
      ['processing', reportId]
    );

    // Step 3: Send audit report (PDF + emails)
    const emailResult = await sendAuditReport({
      name: auditData.name,
      email: auditData.email,
      toolName: auditData.tool_name,
      tierName: auditData.tier_name,
      teamSize: auditData.team_size,
      featuresKept: auditData.features_kept,
      featuresRemoved: auditData.features_removed,
      customFeatures: auditData.custom_features,
      bleedAmount: parseFloat(auditData.bleed_amount),
      buildCostMin: parseFloat(auditData.build_cost_min),
      buildCostMax: parseFloat(auditData.build_cost_max),
      savingsAmount: parseFloat(auditData.savings_amount),
      roiMonths: auditData.roi_months,
      language: auditData.language || 'en'
    });

    // Step 4: Update database with success status
    await pool.query(
      `UPDATE audit_reports
       SET status = $1,
           email_sent_at = NOW(),
           email_message_id = $2,
           provider_email_sent_at = NOW(),
           provider_message_id = $3,
           pdf_file_path = $4,
           pdf_size_bytes = $5
       WHERE id = $6`,
      [
        'sent',
        emailResult.userResult.messageId,
        emailResult.providerResult.messageId,
        emailResult.pdfPath,
        emailResult.pdfSize,
        reportId
      ]
    );

    console.log(`✅ Email job completed for ${reportId}`);
    return {
      success: true,
      messageId: emailResult.userResult.messageId
    };
  } catch (error) {
    // Capture comprehensive error details
    const errorDetails = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      code: error.code,
      type: error.constructor.name,
      timestamp: new Date().toISOString()
    };

    console.error(`❌ Email job failed for report ${reportId}:`, errorDetails);

    // Determine if error is transient (should retry) or permanent (don't retry)
    const isTransient = isTransientError(error);

    // Update database with failed status (wrapped in try-catch to avoid masking original error)
    try {
      await pool.query(
        `UPDATE audit_reports
         SET status = $1,
             error_message = $2,
             error_details = $3::jsonb
         WHERE id = $4`,
        [
          isTransient ? 'failed' : 'permanent_failure',
          errorDetails.message.substring(0, 500), // Truncate to fit TEXT field
          JSON.stringify(errorDetails),
          reportId
        ]
      );
    } catch (dbError) {
      console.error(`❌ Failed to update error status for ${reportId}:`, dbError);
    }

    if (isTransient) {
      // Throw error to trigger Bull retry with exponential backoff
      throw error;
    } else {
      // Don't retry permanent failures
      console.error(`🚫 Permanent failure detected, not retrying: ${errorDetails.type}`);
      return {
        success: false,
        permanentFailure: true,
        error: errorDetails
      };
    }
  }
}

// Register worker to process jobs
emailQueue.process(processEmailJob);

// Worker event handlers
emailQueue.on('completed', (job, result) => {
  console.log(`✅ Worker completed job ${job.id}:`, result?.messageId || 'success');
});

emailQueue.on('failed', (job, error) => {
  console.error(`❌ Worker failed job ${job.id}:`, error.message);
  console.error(`   Attempts: ${job.attemptsMade}/${job.opts.attempts}`);
});

// Graceful shutdown
let isShuttingDown = false;

async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('📥 Shutting down email worker gracefully...');

  // Wait for active jobs to complete (timeout after 30s)
  await emailQueue.close(30000);

  console.log('✅ Email worker shut down successfully');
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

console.log('✅ Email worker started and ready to process jobs');

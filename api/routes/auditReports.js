import express from 'express';
import { z } from 'zod';
import pool from '../db.js';
import { addEmailJob } from '../services/queueService.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

/**
 * Audit Reports API Routes
 *
 * POST /api/audit-reports - Submit audit report (queues email job)
 * GET /api/audit-reports/:id - Get audit report status
 * GET /api/audit-reports/stats - Get queue statistics
 */

// Rate limiting: 10 requests per 15 minutes per IP
const auditReportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many audit submissions, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// ==================== VALIDATION SCHEMAS ====================

const FeatureSchema = z.object({
  name: z.string().min(1, 'Feature name required'),
  complexity: z.enum(['simple', 'medium', 'complex']).optional()
});

const CustomFeatureSchema = z.object({
  name: z.string().min(1, 'Custom feature name required'),
  complexity: z.enum(['simple', 'medium', 'complex']),
  estimatedHours: z.number().positive('Estimated hours must be positive')
});

const AuditReportSchema = z
  .object({
    // User Information
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name too long'),
    email: z
      .string()
      .email('Invalid email format')
      .max(255, 'Email too long'),

    // Tool & Tier Information
    toolId: z
      .number()
      .int('Tool ID must be integer')
      .positive('Tool ID must be positive')
      .optional()
      .nullable(),
    toolName: z
      .string()
      .min(1, 'Tool name required')
      .max(255, 'Tool name too long'),
    tierId: z
      .number()
      .int('Tier ID must be integer')
      .positive('Tier ID must be positive')
      .optional()
      .nullable(),
    tierName: z
      .string()
      .max(100, 'Tier name too long')
      .optional()
      .nullable(),

    // Team Size
    teamSize: z
      .number()
      .int('Team size must be integer')
      .min(1, 'Team size must be at least 1')
      .max(10000, 'Team size cannot exceed 10,000'),

    // Features
    featuresKept: z.array(FeatureSchema).default([]),
    featuresRemoved: z.array(FeatureSchema).default([]),
    customFeatures: z.array(CustomFeatureSchema).default([]),

    // Financial Metrics
    bleedAmount: z
      .number()
      .nonnegative('Bleed amount must be non-negative'),
    buildCostMin: z
      .number()
      .nonnegative('Build cost min must be non-negative'),
    buildCostMax: z
      .number()
      .nonnegative('Build cost max must be non-negative'),
    savingsAmount: z.number(),
    roiMonths: z
      .number()
      .int('ROI months must be integer')
      .positive('ROI months must be positive')
      .optional()
      .nullable()
  })
  .refine((data) => data.buildCostMin <= data.buildCostMax, {
    message: 'Build cost min must be less than or equal to build cost max',
    path: ['buildCostMax']
  });

// ==================== ROUTES ====================

/**
 * POST /api/audit-reports
 * Submit audit report and queue email job
 */
router.post('/', auditReportLimiter, async (req, res) => {
  const startTime = Date.now();

  try {
    // Step 1: Validate request body with Zod
    const validationResult = AuditReportSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    // Extract validated data
    const {
      name,
      email,
      toolId,
      toolName,
      tierId,
      tierName,
      teamSize,
      featuresKept,
      featuresRemoved,
      customFeatures,
      bleedAmount,
      buildCostMin,
      buildCostMax,
      savingsAmount,
      roiMonths
    } = validationResult.data;

    console.log(`📧 Queuing audit report for ${email} (${toolName})`);

    // Step 2: Insert into database
    const insertResult = await pool.query(
      `INSERT INTO audit_reports (
        name, email, tool_id, tool_name, tier_id, tier_name, team_size,
        features_kept, features_removed, custom_features,
        bleed_amount, build_cost_min, build_cost_max, savings_amount, roi_months,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING id`,
      [
        name,
        email,
        toolId,
        toolName,
        tierId,
        tierName,
        teamSize,
        JSON.stringify(featuresKept),
        JSON.stringify(featuresRemoved),
        JSON.stringify(customFeatures),
        bleedAmount,
        buildCostMin,
        buildCostMax,
        savingsAmount,
        roiMonths,
        'pending'
      ]
    );

    const reportId = insertResult.rows[0].id;

    // Step 3: Add job to email queue
    const job = await addEmailJob({
      reportId,
      email,
      toolName
    });

    // Step 4: Update status to 'queued'
    await pool.query(
      'UPDATE audit_reports SET status = $1 WHERE id = $2',
      ['queued', reportId]
    );

    const duration = Date.now() - startTime;
    console.log(`✅ Audit queued successfully in ${duration}ms: ${reportId}`);

    res.status(200).json({
      success: true,
      reportId,
      jobId: job.id,
      status: 'queued',
      message: 'Audit report queued successfully. You will receive an email shortly.'
    });
  } catch (error) {
    console.error('❌ Audit submission failed:', error);

    // Check for duplicate submission error
    if (error.code === '23505') {
      // PostgreSQL unique violation
      return res.status(409).json({
        error: 'Duplicate submission',
        message: 'You recently submitted an audit for this tool. Please wait before submitting again.'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to queue audit report. Please try again later.'
    });
  }
});

/**
 * GET /api/audit-reports/:id
 * Get audit report status by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, email, tool_name, tier_name, team_size,
              bleed_amount, savings_amount, status,
              email_sent_at, error_message, created_at
       FROM audit_reports
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Audit report not found'
      });
    }

    res.status(200).json({
      success: true,
      report: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Failed to fetch audit report:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch audit report'
    });
  }
});

/**
 * GET /api/audit-reports/stats
 * Get queue statistics
 */
router.get('/stats', async (req, res) => {
  try {
    // Get database stats
    const dbStats = await pool.query(
      `SELECT
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'queued') as queued,
        COUNT(*) FILTER (WHERE status = 'processing') as processing,
        COUNT(*) FILTER (WHERE status = 'sent') as sent,
        COUNT(*) FILTER (WHERE status = 'failed') as failed,
        COUNT(*) FILTER (WHERE status = 'permanent_failure') as permanent_failure,
        COUNT(*) as total
       FROM audit_reports`
    );

    res.status(200).json({
      success: true,
      stats: dbStats.rows[0]
    });
  } catch (error) {
    console.error('❌ Failed to fetch stats:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch statistics'
    });
  }
});

export default router;

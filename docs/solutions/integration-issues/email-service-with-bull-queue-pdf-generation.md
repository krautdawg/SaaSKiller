---
title: "Email Service with Bull Queue and PDF Generation"
category: "integration-issues"
problem_type: "feature-implementation"
severity: "normal"
status: "resolved"
date: "2024-12-20"
components_affected:
  - email-service
  - pdf-generation
  - job-queue
  - worker-process
  - api-routes
  - database-schema
environment: "nodejs-esm"
technologies:
  - Node.js (ES modules)
  - Express
  - Bull (Redis queue)
  - ioredis
  - Nodemailer
  - PDFKit
  - Handlebars
  - Zod
  - PostgreSQL
affected_files:
  - api/config/email.js
  - api/config/redis.js
  - api/services/emailService.js
  - api/services/pdfService.js
  - api/services/queueService.js
  - api/workers/emailWorker.js
  - api/routes/auditReports.js
  - api/templates/email/user-audit-report.hbs
  - api/templates/email/provider-notification.hbs
  - api/migrations/002_create_audit_reports_table.sql
key_learning: "Database-first approach with background job processing for reliable email delivery with intelligent error classification"
---

# Email Service with Bull Queue and PDF Generation

## Problem Description

Needed to implement a complete email service for SaaSKiller audit reports that:
- Generates professional PDF audit reports
- Sends dual notifications (user + provider)
- Handles failures with intelligent retry logic
- Tracks email delivery status in database
- Prevents duplicate submissions

## Observable Symptoms

Before implementation:
- No mechanism to send audit reports to users via email
- No PDF generation capability for audit documents
- No background job processing for async email delivery
- No retry mechanism for transient failures

## Root Cause Analysis

This was a feature implementation, not a bug fix. Key architectural decisions:

1. **Database-first approach**: Insert record first, then queue job with reportId
2. **Background processing**: Bull queue with Redis for async email sending
3. **Error classification**: Distinguish transient (retry) vs permanent (don't retry) errors
4. **Dual notification**: Separate templates for user and provider emails

## Solution

### Architecture Overview

```
Client POST /api/audit-reports
    ↓
Zod Validation (safeParse)
    ↓
Insert audit_reports (status: pending)
    ↓
Add Email Job to Bull Queue (reportId)
    ↓
Update status to queued → Return to client
    ↓ (async)
emailWorker picks up job
    ↓
Fetch audit_reports by reportId from DB
    ↓
Update status to processing
    ↓
generateAuditPDF (PDFKit) → PDF file
    ↓
sendUserEmail (template + PDF) → user messageId
    ↓
sendProviderEmail (template + PDF) → provider messageId
    ↓
Update audit_reports (status: sent)
```

### Key Files Created

#### 1. Redis Configuration (`api/config/redis.js`)

```javascript
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  enableOfflineQueue: process.env.REDIS_ENABLE_OFFLINE_QUEUE === 'true',
  retryStrategy: (times) => Math.min(times * 50, 2000)
};
```

#### 2. Email Configuration (`api/config/email.js`)

```javascript
const transporterConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // false for STARTTLS (587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  pool: true,
  maxConnections: 5,
  rateLimit: 5 // Max 5 emails per second
};
```

#### 3. Error Classification (`api/workers/emailWorker.js`)

```javascript
function isTransientError(error) {
  // Network errors (transient - should retry)
  if (error.code === 'ECONNREFUSED') return true;
  if (error.code === 'ETIMEDOUT') return true;
  if (error.code === 'ECONNRESET') return true;

  // SMTP errors
  if (error.responseCode) {
    // 4xx = temporary failure (retry), 5xx = permanent (don't retry)
    return error.responseCode >= 400 && error.responseCode < 500;
  }

  // PDF/Template errors (permanent - bad data)
  if (error.message?.includes('Invalid audit data')) return false;
  if (error.message?.includes('Email template not found')) return false;

  return true; // Default: treat as transient (safer to retry)
}
```

#### 4. Queue Configuration (`api/services/queueService.js`)

```javascript
const emailQueue = new Queue('email-reports', {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    timeout: 120000,
    removeOnComplete: { age: 86400, count: 1000 },
    removeOnFail: { age: 604800 }
  },
  settings: {
    stalledInterval: 30000,
    maxStalledCount: 2
  }
});
```

## Challenges Solved

### 1. ES Modules + dotenv Loading

**Problem**: Environment variables were `undefined` when using ES module imports.

**Solution**: Use explicit path resolution with `import.meta.url`:

```javascript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });
```

### 2. Redis enableOfflineQueue

**Problem**: Bull queue failed when Redis wasn't ready because `enableOfflineQueue` was false.

**Solution**: Set `REDIS_ENABLE_OFFLINE_QUEUE=true` in .env and load it correctly.

### 3. PostgreSQL Expression Indexes

**Problem**: Can't use `date_trunc()` in inline UNIQUE constraints.

**Solution**: Create expression index separately:

```sql
-- Wrong: inline constraint with function
CONSTRAINT unique_hourly UNIQUE (email, tool_id, date_trunc('hour', created_at))

-- Correct: separate expression index
CREATE UNIQUE INDEX IF NOT EXISTS idx_audit_reports_unique_hourly_submission
  ON audit_reports(email, tool_id, date_trunc('hour', created_at));
```

### 4. Dual Email with PDF Attachment

**Problem**: Both user and provider need the same PDF attached.

**Solution**: Pass `pdfPath` to both email functions:

```javascript
export async function sendProviderEmail(auditData, userMessageId, pdfPath = null) {
  const emailOptions = { to: providerEmail, subject, html };

  if (pdfPath && fs.existsSync(pdfPath)) {
    emailOptions.attachments = [{
      filename: `saaskiller-audit-${toolName}.pdf`,
      path: pdfPath
    }];
  }

  return sendEmail(emailOptions);
}
```

## Prevention Strategies

### 1. ES Modules dotenv

- Always load dotenv FIRST, before any other imports
- Use `fileURLToPath` + `dirname` + `join` for path resolution
- Validate required env vars immediately after loading

### 2. Redis Connection

- Set `enableOfflineQueue: true` for reliability
- Implement health check endpoint
- Add connection readiness verification before queue operations

### 3. Database Migrations

- Use `CREATE INDEX IF NOT EXISTS` for idempotency
- Separate expression indexes from table creation
- Use triggers for auto-updating timestamps

### 4. Email Testing

- Mock Nodemailer with Jest
- Test error classification logic
- Integration tests for queue workflow

## Environment Variables Required

```bash
# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_ENABLE_OFFLINE_QUEUE=true

# SMTP
SMTP_HOST=mail.hosting.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email
SMTP_PASSWORD=your_password
SMTP_FROM_EMAIL=noreply@saaskiller.com
SMTP_PROVIDER_EMAIL=team@saaskiller.com

# Queue
QUEUE_NAME=email-reports
QUEUE_ATTEMPTS=3
QUEUE_BACKOFF_DELAY=2000
QUEUE_JOB_TIMEOUT=120000
```

## Related Documentation

- Feature Plan: `/plans/feat-email-service-for-audit-reports.md`
- Migration: `/api/migrations/002_create_audit_reports_table.sql`
- Mailform Setup: `/docs/mailform-coolify-setup.md`

## Test Commands

```bash
# Start worker
cd api && npm run worker

# Test API endpoint
curl -X POST http://localhost:3000/api/audit-reports \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "toolName": "Slack",
    "teamSize": 10,
    "bleedAmount": 5000,
    "buildCostMin": 15000,
    "buildCostMax": 25000,
    "savingsAmount": 60000
  }'

# Check queue stats
curl http://localhost:3000/api/audit-reports/stats
```

## Verification

1. Database record created with `status: queued`
2. Worker log shows: `Processing email job for report: [uuid]`
3. User receives email with PDF attachment
4. Provider receives notification with same PDF
5. Database updated with `status: sent` and message IDs

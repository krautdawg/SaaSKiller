-- Migration: Remove duplicate submission blocking
-- Created: 2025-12-28
-- Description: Drop the unique index that prevented users from resubmitting audits within 1 hour

-- Drop the unique index that was preventing duplicate submissions
DROP INDEX IF EXISTS idx_audit_reports_unique_hourly_submission;

-- Add comment explaining the change
COMMENT ON TABLE audit_reports IS 'Stores email audit reports with PDF attachments and delivery tracking (duplicate submissions now allowed)';

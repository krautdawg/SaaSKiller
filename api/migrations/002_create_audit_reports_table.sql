-- Migration: Create audit_reports table with comprehensive constraints
-- Created: 2025-12-19
-- Description: Email audit reports with data integrity constraints

CREATE TABLE IF NOT EXISTS audit_reports (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),

  -- Tool & Tier Information
  tool_id INTEGER REFERENCES tools(id) ON DELETE SET NULL,
  tool_name VARCHAR(255) NOT NULL,
  tier_id INTEGER REFERENCES subscription_tiers(id) ON DELETE SET NULL,
  tier_name VARCHAR(100),

  -- Team Size
  team_size INTEGER NOT NULL DEFAULT 1
    CHECK (team_size > 0 AND team_size <= 10000),

  -- Features (JSONB arrays)
  features_kept JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_removed JSONB NOT NULL DEFAULT '[]'::jsonb,
  custom_features JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Financial Metrics
  bleed_amount NUMERIC(10,2) NOT NULL
    CHECK (bleed_amount >= 0),
  build_cost_min NUMERIC(10,2) NOT NULL
    CHECK (build_cost_min >= 0),
  build_cost_max NUMERIC(10,2) NOT NULL
    CHECK (build_cost_max >= 0),
  savings_amount NUMERIC(10,2) NOT NULL,
  roi_months INTEGER
    CHECK (roi_months IS NULL OR roi_months > 0),

  -- Email Delivery Tracking
  email_sent_at TIMESTAMP,
  email_message_id VARCHAR(255),
  provider_email_sent_at TIMESTAMP,
  provider_message_id VARCHAR(255),

  -- Status & Error Tracking
  status VARCHAR(50) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'queued', 'processing', 'sent', 'failed', 'permanent_failure', 'bounced')),
  error_message TEXT,
  error_details JSONB,

  -- PDF Tracking
  pdf_file_path TEXT,
  pdf_size_bytes INTEGER
    CHECK (pdf_size_bytes IS NULL OR pdf_size_bytes > 0),

  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Cross-field Constraints
  CONSTRAINT build_cost_range CHECK (build_cost_min <= build_cost_max)
);

-- Prevent duplicate submissions within 1 hour window
-- Using expression index with date_trunc for hourly deduplication
CREATE UNIQUE INDEX IF NOT EXISTS idx_audit_reports_unique_hourly_submission
  ON audit_reports(email, tool_id, date_trunc('hour', created_at));

-- Optimized composite index for queue worker queries
-- Query pattern: "SELECT * FROM audit_reports WHERE status = 'queued' ORDER BY created_at LIMIT 10"
CREATE INDEX IF NOT EXISTS idx_audit_reports_status_created
  ON audit_reports(status, created_at DESC)
  WHERE status IN ('queued', 'processing', 'failed');

-- Index for admin/debugging queries by email
CREATE INDEX IF NOT EXISTS idx_audit_reports_email
  ON audit_reports(email);

-- Index for tool analytics queries
CREATE INDEX IF NOT EXISTS idx_audit_reports_tool_id
  ON audit_reports(tool_id)
  WHERE tool_id IS NOT NULL;

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_audit_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before updates
CREATE TRIGGER trigger_update_audit_reports_updated_at
  BEFORE UPDATE ON audit_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_audit_reports_updated_at();

-- Comments for documentation
COMMENT ON TABLE audit_reports IS 'Stores email audit reports with PDF attachments and delivery tracking';
COMMENT ON COLUMN audit_reports.email IS 'User email address (validated with CHECK constraint)';
COMMENT ON COLUMN audit_reports.status IS 'Job processing status: pending, queued, processing, sent, failed, permanent_failure, bounced';
COMMENT ON COLUMN audit_reports.error_details IS 'Structured error information (JSONB) for debugging transient vs permanent failures';
COMMENT ON INDEX idx_audit_reports_unique_hourly_submission IS 'Prevents duplicate submissions within 1 hour window';

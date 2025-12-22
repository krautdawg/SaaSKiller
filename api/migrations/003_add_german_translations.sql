-- Add German translation columns for tool feature content
-- Safe to run multiple times via IF NOT EXISTS

ALTER TABLE tools
  ADD COLUMN IF NOT EXISTS features_de jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS core_features_de jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS bloaty_features_de jsonb DEFAULT '[]'::jsonb;

-- Indexes (useful for jsonb queries/filters)
CREATE INDEX IF NOT EXISTS idx_tools_features_de ON tools USING gin(features_de);
CREATE INDEX IF NOT EXISTS idx_tools_core_features_de ON tools USING gin(core_features_de);
CREATE INDEX IF NOT EXISTS idx_tools_bloaty_features_de ON tools USING gin(bloaty_features_de);

COMMENT ON COLUMN tools.features_de IS 'German translations of features';
COMMENT ON COLUMN tools.core_features_de IS 'German translations of core features';
COMMENT ON COLUMN tools.bloaty_features_de IS 'German translations of bloaty features';

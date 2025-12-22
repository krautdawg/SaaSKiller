-- Add German translation columns for tool descriptions and subscription tiers
-- Safe to run multiple times via IF NOT EXISTS

ALTER TABLE tools
  ADD COLUMN IF NOT EXISTS short_description_de text,
  ADD COLUMN IF NOT EXISTS description_de text;

ALTER TABLE subscription_tiers
  ADD COLUMN IF NOT EXISTS tier_name_de varchar(100),
  ADD COLUMN IF NOT EXISTS notes_de text;

COMMENT ON COLUMN tools.short_description_de IS 'German translation of short_description';
COMMENT ON COLUMN tools.description_de IS 'German translation of description';
COMMENT ON COLUMN subscription_tiers.tier_name_de IS 'German translation of tier_name';
COMMENT ON COLUMN subscription_tiers.notes_de IS 'German translation of notes';

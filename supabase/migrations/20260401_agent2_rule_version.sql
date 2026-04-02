-- Migration: Add rule_version to scan_results for versioned scoring
-- Agent 2: Analysis Engine, Scoring, and Evidence Model

BEGIN;

-- Add rule_version column to track scoring model version
ALTER TABLE public.scan_results 
ADD COLUMN IF NOT EXISTS rule_version TEXT DEFAULT '1.0.0';

COMMIT;
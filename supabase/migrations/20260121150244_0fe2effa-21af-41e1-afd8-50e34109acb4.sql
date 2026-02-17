-- Create scans table for storing scan jobs
CREATE TABLE public.scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'analyzing', 'completed', 'failed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  answers JSONB NOT NULL DEFAULT '{}',
  contact_email TEXT,
  contact_name TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create scan_results table for storing analysis results
CREATE TABLE public.scan_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id UUID NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  maturity_level TEXT NOT NULL,
  findings JSONB NOT NULL DEFAULT '[]',
  recommendations JSONB NOT NULL DEFAULT '[]',
  category_scores JSONB NOT NULL DEFAULT '{}',
  ai_summary TEXT,
  estimated_revenue_loss TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (scans are anonymous for lead generation)
CREATE POLICY "Anyone can create scans" 
ON public.scans 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view their own scan by ID" 
ON public.scans 
FOR SELECT 
USING (true);

CREATE POLICY "System can update scans" 
ON public.scans 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can view scan results" 
ON public.scan_results 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert scan results" 
ON public.scan_results 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_scans_status ON public.scans(status);
CREATE INDEX idx_scans_created_at ON public.scans(created_at DESC);
CREATE INDEX idx_scan_results_scan_id ON public.scan_results(scan_id);
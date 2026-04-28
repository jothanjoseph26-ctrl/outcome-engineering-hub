import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const SCANNER_TOKEN_STORAGE_PREFIX = 'scanner-public-token:';

export interface ScannerSession {
  scanId: string;
  publicToken: string;
}

export interface ScannerStatusRecord {
  id: string;
  status: string;
  current_step: string | null;
  progress: number | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
}

export interface ScannerResultRecord {
  id: string;
  scan_id: string;
  score: number;
  maturity_level: string;
  findings: unknown;
  recommendations: unknown;
  category_scores: unknown;
  ai_summary: string | null;
  estimated_revenue_loss: string | null;
}

const getScannerTokenStorageKey = (scanId: string) => `${SCANNER_TOKEN_STORAGE_PREFIX}${scanId}`;

const createScannerReadClient = (publicToken: string) =>
  createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'x-public-token': publicToken,
      },
    },
  });

export const persistScannerSession = ({ scanId, publicToken }: ScannerSession) => {
  localStorage.setItem(getScannerTokenStorageKey(scanId), publicToken);
};

export const clearPersistedScannerToken = (scanId: string) => {
  localStorage.removeItem(getScannerTokenStorageKey(scanId));
};

export const fetchScannerStatus = async (scanId: string, publicToken: string) => {
  const scannerClient = createScannerReadClient(publicToken);
  const { data, error } = await scannerClient
    .from('scans')
    .select('id, status, current_step, progress, error_message, started_at, completed_at')
    .eq('id', scanId)
    .single();

  if (error) {
    const message = error.message || error.details || error.hint || JSON.stringify(error);
    throw new Error(`Failed to fetch scan status: ${message}`);
  }

  if (!data) {
    throw new Error('Scan not found.');
  }

  return data as ScannerStatusRecord;
};

export const fetchScannerResults = async (scanId: string, publicToken: string) => {
  const scannerClient = createScannerReadClient(publicToken);
  const { data, error } = await scannerClient
    .from('scan_results')
    .select('id, scan_id, score, maturity_level, findings, recommendations, category_scores, ai_summary, estimated_revenue_loss')
    .eq('scan_id', scanId)
    .single();

  if (error) {
    const message = error.message || error.details || error.hint || JSON.stringify(error);
    throw new Error(`Failed to fetch scan results: ${message}`);
  }

  if (!data) {
    throw new Error('Scan results not found.');
  }

  return data as ScannerResultRecord;
};

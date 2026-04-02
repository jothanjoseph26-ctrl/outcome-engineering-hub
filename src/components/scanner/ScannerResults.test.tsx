import { render, screen } from '@testing-library/react';
import { ScannerResults } from './ScannerResults';
import { fetchScannerResults, fetchScannerStatus } from '@/lib/scanner-client';

vi.mock('@/lib/scanner-client', () => ({
  fetchScannerStatus: vi.fn(),
  fetchScannerResults: vi.fn(),
}));

describe('ScannerResults', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders structured recommendations and removes the dead PDF CTA', async () => {
    vi.mocked(fetchScannerStatus).mockResolvedValue({
      id: 'scan-1',
      status: 'completed',
      current_step: 'finished',
      progress: 100,
      error_message: null,
      started_at: null,
      completed_at: null,
    });

    vi.mocked(fetchScannerResults).mockResolvedValue({
      id: 'result-1',
      scan_id: 'scan-1',
      score: 62,
      maturity_level: 'Developing',
      findings: [],
      recommendations: [
        {
          priority: 'critical',
          timeframe: 'Week 1',
          title: 'Fix missing primary CTA',
          description: 'Add a visible CTA above the fold.',
        },
        {
          priority: 'measurement',
          timeframe: 'Week 2',
          title: 'Implement event tracking',
          description: 'Track lead form submissions and CTA clicks.',
        },
      ],
      category_scores: {},
      ai_summary: 'Summary text',
      estimated_revenue_loss: 'N250K/month',
    });

    render(<ScannerResults scanId="scan-1" publicToken="token-1" onRestart={vi.fn()} />);

    expect(await screen.findByText(/recommended action plan/i)).toBeInTheDocument();
    expect(screen.getByText(/fix missing primary cta/i)).toBeInTheDocument();
    expect(screen.getByText(/week 1/i)).toBeInTheDocument();
    expect(screen.getByText(/^Critical$/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /download pdf report/i })).not.toBeInTheDocument();
  });

  it('surfaces the backend error message when the scan failed before results existed', async () => {
    vi.mocked(fetchScannerStatus).mockResolvedValue({
      id: 'scan-2',
      status: 'failed',
      current_step: 'error',
      progress: 0,
      error_message: 'Website returned a 403 response during scan.',
      started_at: null,
      completed_at: null,
    });

    vi.mocked(fetchScannerResults).mockRejectedValue(new Error('No rows found'));

    render(<ScannerResults scanId="scan-2" publicToken="token-2" onRestart={vi.fn()} />);

    expect(await screen.findByText(/this scan failed before results were generated/i)).toBeInTheDocument();
    expect(screen.getByText(/website returned a 403 response during scan/i)).toBeInTheDocument();
  });
});

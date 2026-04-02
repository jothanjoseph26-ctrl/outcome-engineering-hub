import type { HTMLAttributes, ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ScannerWizard, isValidEmailInput, isValidWebsiteInput } from './ScannerWizard';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    functions: {
      invoke: vi.fn(),
    },
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('ScannerWizard validation', () => {
  it('validates website and email inputs with stronger rules', () => {
    expect(isValidWebsiteInput('example.com')).toBe(true);
    expect(isValidWebsiteInput('https://sub.example.com/path')).toBe(true);
    expect(isValidWebsiteInput('invalid')).toBe(false);
    expect(isValidWebsiteInput('bad url.com')).toBe(false);

    expect(isValidEmailInput('person@example.com')).toBe(true);
    expect(isValidEmailInput('person+team@example.co.uk')).toBe(true);
    expect(isValidEmailInput('not-an-email')).toBe(false);
    expect(isValidEmailInput('missing-domain@localhost')).toBe(false);
  });

  it('keeps progression blocked until website and email inputs are valid', () => {
    render(<ScannerWizard onScanStart={vi.fn()} />);

    const continueButton = screen.getByRole('button', { name: /continue/i });
    expect(continueButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /increase sales/i }));
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton);

    const websiteContinueButton = screen.getByRole('button', { name: /continue/i });
    expect(websiteContinueButton).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'invalid' } });
    expect(websiteContinueButton).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'example.com' } });
    expect(websiteContinueButton).toBeEnabled();
    fireEvent.click(websiteContinueButton);

    fireEvent.click(screen.getByRole('button', { name: /saas \/ software/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    fireEvent.click(screen.getByRole('button', { name: /n100k - n500k/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    fireEvent.click(screen.getByRole('button', { name: /website forms/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    fireEvent.click(screen.getByRole('button', { name: /people visit but don't buy/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    const startButton = screen.getByRole('button', { name: /start free scan/i });
    expect(startButton).toBeDisabled();

    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'broken-email' } });
    expect(startButton).toBeDisabled();

    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'owner@example.com' } });
    expect(startButton).toBeEnabled();
  });
});

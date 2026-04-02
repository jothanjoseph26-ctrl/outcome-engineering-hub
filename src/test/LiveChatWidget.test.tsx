import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LiveChatWidget } from '@/components/LiveChatWidget';

const mockSendChatMessage = vi.hoisted(() => vi.fn());
const mockTrackChatEvent = vi.hoisted(() => vi.fn());

vi.mock('@/lib/openrouter', () => ({
  openrouter: {
    sendChatMessage: mockSendChatMessage,
  },
}));

vi.mock('@/lib/chat-analytics', () => ({
  trackChatEvent: mockTrackChatEvent,
}));

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />,
    div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  },
}));

describe('LiveChatWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSendChatMessage.mockReset();
    mockTrackChatEvent.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens, renders welcome content, and closes', () => {
    render(<LiveChatWidget />);

    fireEvent.click(screen.getByLabelText('Open AI chat'));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    expect(screen.getByText(/Outcome Labs' AI assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/SEO engineering and optimization/i)).toBeInTheDocument();
    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'chat_opened',
      expect.objectContaining({ widget: 'live' }),
    );

    fireEvent.click(screen.getByLabelText('Close AI chat'));
    expect(screen.queryByText(/Outcome Labs' AI assistant/i)).not.toBeInTheDocument();
  });

  it('sends a message, records analytics, and shows degraded fallback on failure', async () => {
    mockSendChatMessage.mockRejectedValue(new Error('network down'));

    render(<LiveChatWidget />);

    fireEvent.click(screen.getByLabelText('Open AI chat'));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    fireEvent.change(screen.getByLabelText('Chat message input'), {
      target: { value: 'Tell me about SEO services' },
    });
    fireEvent.click(screen.getByLabelText('Send chat message'));

    await waitFor(() =>
      expect(screen.getByText(/Great question about SEO/)).toBeInTheDocument(),
    );

    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'message_failed',
      expect.objectContaining({ widget: 'live' }),
    );
    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'fallback_response_shown',
      expect.objectContaining({ widget: 'live', fallbackUsed: true }),
    );
    expect(screen.getByRole('button', { name: /Retry last message/i })).toBeInTheDocument();
  });

  it('handles a successful server response', async () => {
    mockSendChatMessage.mockResolvedValue({
      message: 'Hello from the server',
      status: 'success',
      sessionId: 'session-1',
      sessionToken: 'token-1',
      requiresHumanHandoff: false,
      fallbackUsed: false,
      moderationResult: { allowed: true, labels: [] },
      modelMetadata: {
        provider: 'openrouter',
        model: 'google/gemini-2.0-flash-exp',
        promptVersion: '2026.04.01',
        latencyMs: 120,
        fallbackUsed: false,
      },
    });

    render(<LiveChatWidget />);

    fireEvent.click(screen.getByLabelText('Open AI chat'));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    fireEvent.change(screen.getByLabelText('Chat message input'), {
      target: { value: 'Tell me about SEO services' },
    });
    fireEvent.click(screen.getByLabelText('Send chat message'));

    await screen.findByText('Hello from the server');

    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'session_started',
      expect.objectContaining({ widget: 'live', sessionId: 'session-1' }),
    );
    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'response_received',
      expect.objectContaining({ widget: 'live', sessionId: 'session-1', status: 'success' }),
    );
  });

  it('shows contact fallback for office location questions when the gateway fails', async () => {
    mockSendChatMessage.mockRejectedValue(new Error('gateway down'));

    render(<LiveChatWidget />);

    fireEvent.click(screen.getByLabelText('Open AI chat'));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    fireEvent.change(screen.getByLabelText('Chat message input'), {
      target: { value: 'Where is the office location?' },
    });
    fireEvent.click(screen.getByLabelText('Send chat message'));

    await waitFor(() =>
      expect(screen.getByText(/does not currently list a public office street address/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/info@outcomelabs\.online/i)).toBeInTheDocument();
  });

  it('shows competitive-advantage fallback when the gateway fails', async () => {
    mockSendChatMessage.mockRejectedValue(new Error('gateway down'));

    render(<LiveChatWidget />);

    fireEvent.click(screen.getByLabelText('Open AI chat'));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    fireEvent.change(screen.getByLabelText('Chat message input'), {
      target: { value: 'whats your competitive advantage' },
    });
    fireEvent.click(screen.getByLabelText('Send chat message'));

    await waitFor(() =>
      expect(screen.getByText(/building and operating proprietary growth systems/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/Edge SEO infrastructure at the network layer/i)).toBeInTheDocument();
  });
});

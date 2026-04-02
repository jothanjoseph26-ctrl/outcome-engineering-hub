import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AIChatWidget } from '@/components/AIChatWidget';

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

describe('AIChatWidget', () => {
  beforeEach(() => {
    mockSendChatMessage.mockReset();
    mockTrackChatEvent.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the welcome message and can be closed', () => {
    const onClose = vi.fn();

    render(<AIChatWidget onClose={onClose} />);

    expect(screen.getByText(/Hello\. I'm an AI assistant for Outcome Labs\./i)).toBeInTheDocument();
    expect(screen.getByText(/Digital transformation guidance/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close AI assistant'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('sends messages through the backend gateway and renders the response', async () => {
    mockSendChatMessage.mockResolvedValue({
      message: 'Confirmed by the server',
      status: 'success',
      sessionId: 'session-2',
      sessionToken: 'token-2',
      requiresHumanHandoff: false,
      fallbackUsed: false,
      moderationResult: { allowed: true, labels: [] },
      modelMetadata: {
        provider: 'openrouter',
        model: 'anthropic/claude-3.5-haiku',
        promptVersion: '2026.04.01',
        latencyMs: 85,
        fallbackUsed: false,
      },
    });

    render(<AIChatWidget />);

    fireEvent.change(screen.getByLabelText('AI assistant input'), {
      target: { value: 'Do you support WhatsApp?' },
    });
    fireEvent.click(screen.getByLabelText('Send message'));

    await waitFor(() => expect(screen.getByText('Confirmed by the server')).toBeInTheDocument());

    expect(mockSendChatMessage).toHaveBeenCalledWith('Do you support WhatsApp?', expect.any(Array));
    expect(mockTrackChatEvent).toHaveBeenCalledWith(
      'session_started',
      expect.objectContaining({ widget: 'assistant', sessionId: 'session-2' }),
    );
  });

  it('shows location-aware fallback content when the gateway fails', async () => {
    mockSendChatMessage.mockRejectedValue(new Error('gateway down'));

    render(<AIChatWidget />);

    fireEvent.change(screen.getByLabelText('AI assistant input'), {
      target: { value: 'Where is the office location?' },
    });
    fireEvent.click(screen.getByLabelText('Send message'));

    await waitFor(() =>
      expect(screen.getByText(/does not currently list a public office street address/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/info@outcomelabs\.online/i)).toBeInTheDocument();
  });

  it('shows competitive-advantage fallback content when the gateway fails', async () => {
    mockSendChatMessage.mockRejectedValue(new Error('gateway down'));

    render(<AIChatWidget />);

    fireEvent.change(screen.getByLabelText('AI assistant input'), {
      target: { value: 'whats your competitive advantage' },
    });
    fireEvent.click(screen.getByLabelText('Send message'));

    await waitFor(() =>
      expect(screen.getByText(/building and operating proprietary growth systems/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/measurable revenue outcomes/i)).toBeInTheDocument();
  });
});

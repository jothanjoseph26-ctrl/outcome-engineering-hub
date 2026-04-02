export type ChatAnalyticsEvent =
  | 'chat_opened'
  | 'session_started'
  | 'message_sent'
  | 'response_received'
  | 'fallback_response_shown'
  | 'moderation_block_shown'
  | 'handoff_requested'
  | 'message_failed'
  | 'retry_clicked';

export interface ChatAnalyticsPayload {
  widget: 'live' | 'assistant';
  sessionId?: string | null;
  messageLength?: number;
  fallbackUsed?: boolean;
  status?: string;
  reason?: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function trackChatEvent(event: ChatAnalyticsEvent, payload: ChatAnalyticsPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  const detail = {
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  window.dispatchEvent(new CustomEvent('outcome:chat-event', { detail }));
  window.dataLayer?.push({ event, ...payload });
  window.gtag?.('event', event, payload);
  window.posthog?.capture(event, payload);
}

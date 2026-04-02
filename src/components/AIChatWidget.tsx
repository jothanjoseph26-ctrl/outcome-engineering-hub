import { useEffect, useRef, useState } from 'react';
import { openrouter, type Message } from '@/lib/openrouter';
import { trackChatEvent } from '@/lib/chat-analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, X, Bot, User, Sparkles, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatWidgetProps {
  onClose?: () => void;
}

type ChatStatus = 'idle' | 'opening' | 'sending' | 'retrying' | 'degraded' | 'blocked' | 'handoff' | 'error';

const WELCOME_MESSAGE = [
  "Hello. I'm an AI assistant for Outcome Labs.",
  'I can help with:',
  '- SEO optimization strategies',
  '- Programmatic content generation',
  '- Server-side tracking setup',
  '- WhatsApp business solutions',
  '- Digital transformation guidance',
].join('\n');

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('office') || lower.includes('address') || lower.includes('location') || lower.includes('where are you') || lower.includes('where is your office')) {
    return 'Outcome Labs does not currently list a public office street address in the approved site content. You can contact the team at info@outcomelabs.online or call +234 700 000 0000.';
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('reach you')) {
    return 'You can reach Outcome Labs at info@outcomelabs.online or call +234 700 000 0000. A public office street address is not currently listed in the approved site content.';
  }

  if (
    lower.includes('competitive advantage') ||
    lower.includes('competitive edge') ||
    lower.includes('what makes you different') ||
    lower.includes('why choose you') ||
    lower.includes('why outcome labs') ||
    lower.includes('advantage') ||
    lower.includes('different from') ||
    lower.includes('differentiate')
  ) {
    return 'Outcome Labs differentiates itself by building and operating proprietary growth systems instead of relying only on manual agency workflows.\n\nOur main advantages are:\n- Edge SEO infrastructure at the network layer, not just on-page tuning\n- Automated systems for programmatic content, tracking, and WhatsApp operations\n- Technical execution across data, decision, and execution layers\n- A focus on measurable revenue outcomes rather than reporting activity\n\nIf you want, I can break that down by SEO, WhatsApp, or data infrastructure.';
  }

  return 'Sorry, I encountered an error. Please try again.';
}

function buildHistory(messages: ChatMessage[]): Message[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function getStatusLabel(status: ChatStatus) {
  switch (status) {
    case 'sending':
      return 'Sending';
    case 'retrying':
      return 'Retrying';
    case 'degraded':
      return 'Degraded';
    case 'blocked':
      return 'Blocked';
    case 'handoff':
      return 'Needs handoff';
    case 'error':
      return 'Error';
    case 'opening':
      return 'Connecting';
    default:
      return 'Online';
  }
}

export const AIChatWidget = ({ onClose }: AIChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [chatStatus, setChatStatus] = useState<ChatStatus>('idle');
  const [isOpen, setIsOpen] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setChatStatus('opening');
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
      trackChatEvent('chat_opened', { widget: 'assistant', sessionId });
      setChatStatus('idle');
    }
  }, [messages.length, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatStatus]);

  const submitMessage = async (content: string, isRetry = false) => {
    if (!content || chatStatus === 'sending') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLastUserMessage(content);
    setLastError(null);
    setChatStatus(isRetry ? 'retrying' : 'sending');

    trackChatEvent(isRetry ? 'retry_clicked' : 'message_sent', {
      widget: 'assistant',
      sessionId,
      messageLength: content.length,
      status: chatStatus,
    });

    try {
      const response = await openrouter.sendChatMessage(content, buildHistory(nextMessages));
      const responseSessionId = response.sessionId ?? sessionId;

      if (responseSessionId && responseSessionId !== sessionId) {
        setSessionId(responseSessionId);
        trackChatEvent('session_started', {
          widget: 'assistant',
          sessionId: responseSessionId,
          messageLength: content.length,
        });
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
        },
      ]);

      trackChatEvent('response_received', {
        widget: 'assistant',
        sessionId: responseSessionId,
        fallbackUsed: response.fallbackUsed,
        status: response.status,
      });

      if (response.status === 'blocked' || response.moderationResult?.allowed === false) {
        setChatStatus('blocked');
        setLastError(response.message || 'Your message was blocked by policy.');
        trackChatEvent('moderation_block_shown', {
          widget: 'assistant',
          sessionId: responseSessionId,
          reason: response.moderationResult?.reason,
        });
        return;
      }

      if (response.requiresHumanHandoff) {
        setChatStatus('handoff');
        trackChatEvent('handoff_requested', {
          widget: 'assistant',
          sessionId: responseSessionId,
          reason: response.modelMetadata?.model,
        });
        return;
      }

      if (response.fallbackUsed) {
        setChatStatus('degraded');
        trackChatEvent('fallback_response_shown', {
          widget: 'assistant',
          sessionId: responseSessionId,
          fallbackUsed: true,
        });
        return;
      }

      setChatStatus('idle');
    } catch (error) {
      const fallbackMessage = getFallbackResponse(content);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date(),
        },
      ]);
      setChatStatus('error');
      setLastError(error instanceof Error ? error.message : 'The assistant is temporarily unavailable.');
      trackChatEvent('message_failed', {
        widget: 'assistant',
        sessionId,
        messageLength: content.length,
        reason: error instanceof Error ? error.message : 'unknown_error',
      });
    } finally {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMessage(input.trim());
  };

  const handleRetry = async () => {
    if (!lastUserMessage) {
      return;
    }

    await submitMessage(lastUserMessage, true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg transition-all hover:scale-105 hover:bg-gold/90"
        aria-label="Open AI assistant"
      >
        <Sparkles className="h-6 w-6 text-background" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-pulse" />
      </button>
    );
  }

  const canRetry = Boolean(lastUserMessage) && (chatStatus === 'degraded' || chatStatus === 'error');

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-[640px] overflow-hidden border-border/60 shadow-2xl">
      <CardHeader className="pb-2 -mx-4 -mt-4 rounded-t-lg bg-gradient-to-r from-gold to-amber-500 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm text-white">AI Assistant</CardTitle>
              <p className="text-xs text-white/75">{getStatusLabel(chatStatus)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/75">Online</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onClose?.();
              }}
              className="ml-2 rounded p-1 hover:bg-white/20"
              aria-label="Close AI assistant"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {(chatStatus === 'blocked' || chatStatus === 'handoff' || chatStatus === 'degraded' || chatStatus === 'error') && (
            <div className="rounded-lg border border-border bg-muted/60 p-3 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>
                  {chatStatus === 'blocked' && 'Policy review required.'}
                  {chatStatus === 'handoff' && 'A human follow-up may be required.'}
                  {chatStatus === 'degraded' && 'The assistant is using a fallback response.'}
                  {chatStatus === 'error' && 'The assistant is temporarily unavailable.'}
                </span>
              </div>
              {lastError && <p className="mt-1 text-muted-foreground">{lastError}</p>}
              {canRetry && (
                <Button variant="outline" size="sm" className="mt-3" onClick={handleRetry}>
                  Retry last message
                </Button>
              )}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Bot className="h-4 w-4 text-amber-700" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === 'user' ? 'bg-gold text-background' : 'border border-border bg-muted text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                <p className={`mt-1 text-xs ${message.role === 'user' ? 'text-background/60' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <User className="h-4 w-4 text-gold" />
                </div>
              )}
            </div>
          ))}

          {chatStatus === 'sending' || chatStatus === 'retrying' ? (
            <div className="flex justify-start">
              <div className="rounded-lg border border-border bg-muted px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-gold" />
              </div>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="border-t p-3">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder={chatStatus === 'degraded' ? 'Try again or ask a new question...' : 'Ask about SEO, content, tracking...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={chatStatus === 'sending' || chatStatus === 'retrying'}
              className="flex-1"
              aria-label="AI assistant input"
            />
            <Button
              type="submit"
              size="icon"
              disabled={chatStatus === 'sending' || chatStatus === 'retrying' || !input.trim()}
              className="bg-gold text-background hover:bg-gold/90"
              aria-label="Send message"
            >
              {chatStatus === 'sending' || chatStatus === 'retrying' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChatWidget;

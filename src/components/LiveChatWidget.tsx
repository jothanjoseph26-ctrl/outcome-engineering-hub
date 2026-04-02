import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Phone, Loader2, Sparkles, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { openrouter, type Message as AIMessage } from '@/lib/openrouter';
import { trackChatEvent } from '@/lib/chat-analytics';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

type ChatStatus = 'idle' | 'opening' | 'sending' | 'retrying' | 'degraded' | 'blocked' | 'handoff' | 'error';

const WELCOME_MESSAGES = [
  "Hi there. I'm Outcome Labs' AI assistant. How can I help you today?",
  'I can help with:',
  '- SEO engineering and optimization',
  '- Programmatic content generation',
  '- Server-side tracking',
  '- WhatsApp business solutions',
  '- Scheduling a free audit',
];

const FALLBACK_RESPONSES: Record<string, string> = {
  location: 'Outcome Labs does not currently list a public office street address in the approved site content. You can contact the team at info@outcomelabs.online or call +234 700 000 0000.',
  contact: 'You can reach Outcome Labs at info@outcomelabs.online or call +234 700 000 0000. A public office street address is not currently listed in the approved site content.',
  advantage: 'Outcome Labs differentiates itself by building and operating proprietary growth systems instead of relying only on manual agency workflows.\n\nOur main advantages are:\n- Edge SEO infrastructure at the network layer, not just on-page tuning\n- Automated systems for programmatic content, tracking, and WhatsApp operations\n- Technical execution across data, decision, and execution layers\n- A focus on measurable revenue outcomes rather than reporting activity\n\nIf you want, I can break that down by SEO, WhatsApp, or data infrastructure.',
  seo: 'Great question about SEO. OutcomeLabs specializes in edge SEO engineering and technical optimization.\n\nWe can help with:\n- Technical SEO audits\n- Schema markup injection\n- Core Web Vitals optimization\n- Server-side rendering support\n\nWould you like to schedule a consultation?',
  programmatic: 'OutcomeLabs can help with programmatic content systems that scale production while staying SEO-aware.\n\nTypical workflow:\n1. Detect target topics\n2. Generate optimized content\n3. Publish or route for review\n\nWant a demo of the workflow?',
  whatsapp: 'WhatsApp business solutions from OutcomeLabs can include:\n- Automated lead qualification\n- CRM integration\n- Broadcast messaging\n- Conversion analytics\n\nInterested in a demo?',
  pricing: 'Pricing depends on scope and delivery needs.\n\nCommon starting points:\n- SEO engineering: from $2,500/month\n- Programmatic content: from $1,500/month\n- WhatsApp solutions: from $1,000/month\n\nAsk for a tailored quote if you want a precise estimate.',
  default: 'Thanks for your message. I can help with:\n- SEO and technical optimization\n- Programmatic content generation\n- Server-side tracking\n- WhatsApp business solutions\n\nYou can also ask for a consultation or audit.',
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('office') || lower.includes('address') || lower.includes('location') || lower.includes('where are you') || lower.includes('where is your office')) {
    return FALLBACK_RESPONSES.location;
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('reach you')) {
    return FALLBACK_RESPONSES.contact;
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
    return FALLBACK_RESPONSES.advantage;
  }
  if (lower.includes('seo') || lower.includes('search') || lower.includes('ranking') || lower.includes('google')) {
    return FALLBACK_RESPONSES.seo;
  }
  if (lower.includes('programmatic') || lower.includes('content') || lower.includes('blog') || lower.includes('article')) {
    return FALLBACK_RESPONSES.programmatic;
  }
  if (lower.includes('whatsapp') || lower.includes('message') || lower.includes('chatbot')) {
    return FALLBACK_RESPONSES.whatsapp;
  }
  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('price') || lower.includes('expensive')) {
    return FALLBACK_RESPONSES.pricing;
  }
  return FALLBACK_RESPONSES.default;
}

function buildHistory(messages: ChatMessage[]): AIMessage[] {
  return messages.map((message) => ({
    role: message.sender === 'user' ? 'user' : 'assistant',
    content: message.text,
  }));
}

function statusLabel(status: ChatStatus) {
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

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatStatus, setChatStatus] = useState<ChatStatus>('idle');
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeTimers = useRef<number[]>([]);
  const openTrackedRef = useRef(false);
  const welcomeStartedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      openTrackedRef.current = false;
      welcomeStartedRef.current = false;
      welcomeTimers.current.forEach((timer) => window.clearTimeout(timer));
      welcomeTimers.current = [];
      return;
    }

    if (!openTrackedRef.current) {
      trackChatEvent('chat_opened', { widget: 'live', sessionId });
      openTrackedRef.current = true;
    }

    if (messages.length === 0 && !welcomeStartedRef.current) {
      welcomeStartedRef.current = true;
      setChatStatus('opening');
      let delay = 0;
      WELCOME_MESSAGES.forEach((message, index) => {
        const timer = window.setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `welcome-${index}`,
              text: message,
              sender: 'assistant',
              timestamp: new Date(),
            },
          ]);

          if (index === WELCOME_MESSAGES.length - 1) {
            setChatStatus((current) => (current === 'opening' ? 'idle' : current));
          }
        }, delay);
        welcomeTimers.current.push(timer);
        delay += 700;
      });
    }

    return () => {
      if (!isOpen) {
        welcomeTimers.current.forEach((timer) => window.clearTimeout(timer));
        welcomeTimers.current = [];
      }
    };
  }, [isOpen, messages.length, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatStatus]);

  const handleSend = async (overrideValue?: string, isRetry = false) => {
    const content = (overrideValue ?? inputValue).trim();
    if (!content || chatStatus === 'sending') {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: content,
      sender: 'user',
      timestamp: new Date(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue('');
    setLastUserMessage(content);
    setLastError(null);
    setChatStatus(isRetry ? 'retrying' : 'sending');

    trackChatEvent(isRetry ? 'retry_clicked' : 'message_sent', {
      widget: 'live',
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
          widget: 'live',
          sessionId: responseSessionId,
          messageLength: content.length,
        });
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          text: response.message || FALLBACK_RESPONSES.default,
          sender: 'assistant',
          timestamp: new Date(),
        },
      ]);

      trackChatEvent('response_received', {
        widget: 'live',
        sessionId: responseSessionId,
        fallbackUsed: response.fallbackUsed,
        status: response.status,
      });

      if (response.status === 'blocked' || response.moderationResult?.allowed === false) {
        setChatStatus('blocked');
        setLastError(response.message || 'Your message was blocked by policy.');
        trackChatEvent('moderation_block_shown', {
          widget: 'live',
          sessionId: responseSessionId,
          reason: response.moderationResult?.reason,
        });
        return;
      }

      if (response.requiresHumanHandoff) {
        setChatStatus('handoff');
        trackChatEvent('handoff_requested', {
          widget: 'live',
          sessionId: responseSessionId,
          reason: response.modelMetadata?.model,
        });
        return;
      }

      if (response.fallbackUsed) {
        setChatStatus('degraded');
        trackChatEvent('fallback_response_shown', {
          widget: 'live',
          sessionId: responseSessionId,
          fallbackUsed: true,
        });
        return;
      }

      setChatStatus('idle');
    } catch (error) {
      const fallback = getFallbackResponse(content);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          text: fallback,
          sender: 'assistant',
          timestamp: new Date(),
        },
      ]);
      setChatStatus('degraded');
      setLastError(error instanceof Error ? error.message : 'The assistant is temporarily unavailable.');
      trackChatEvent('message_failed', {
        widget: 'live',
        sessionId,
        messageLength: content.length,
        reason: error instanceof Error ? error.message : 'unknown_error',
      });
      trackChatEvent('fallback_response_shown', {
        widget: 'live',
        sessionId,
        fallbackUsed: true,
      });
    }
  };

  const handleRetry = async () => {
    if (!lastUserMessage) {
      return;
    }

    await handleSend(lastUserMessage, true);
  };

  if (!isOpen) {
    return (
      <button
        aria-label="Open AI chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg transition-transform hover:scale-105 hover:bg-gold/90"
      >
        <Sparkles className="h-6 w-6 text-background" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-success animate-pulse" />
      </button>
    );
  }

  const canRetry = Boolean(lastUserMessage) && (chatStatus === 'degraded' || chatStatus === 'error');

  return (
    <Card className={`fixed bottom-6 right-6 z-50 flex w-96 flex-col overflow-hidden shadow-2xl border-border/60 ${isMinimized ? 'h-auto' : 'h-[520px]'}`}>
      <div className="flex items-center justify-between bg-gradient-to-r from-gold to-amber-500 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background/20">
            <Bot className="h-5 w-5 text-background" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gold bg-success" />
          </div>
          <div>
            <h3 className="font-semibold text-background">Outcome Labs AI</h3>
            <p className="text-xs text-background/75">{statusLabel(chatStatus)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-background hover:bg-background/20"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Restore chat' : 'Minimize chat'}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-background hover:bg-background/20"
            onClick={() => setIsOpen(false)}
            aria-label="Close AI chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(chatStatus === 'blocked' || chatStatus === 'handoff' || chatStatus === 'degraded' || chatStatus === 'error') && (
              <div className="rounded-xl border border-border/70 bg-muted/60 p-3 text-sm">
                <div className="font-medium">
                  {chatStatus === 'blocked' && 'Policy review required.'}
                  {chatStatus === 'handoff' && 'A human follow-up may be required.'}
                  {chatStatus === 'degraded' && 'The assistant is using a degraded fallback path.'}
                  {chatStatus === 'error' && 'The assistant is temporarily unavailable.'}
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
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <MessageCircle className="h-4 w-4 text-amber-700" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${message.sender === 'user' ? 'bg-gold text-background' : 'border border-border bg-card text-foreground'}`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                  <p className={`mt-1 text-xs ${message.sender === 'user' ? 'text-background/60' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {chatStatus === 'sending' || chatStatus === 'retrying' ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-border bg-card p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 4 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {[
                'Tell me about SEO services',
                'How does programmatic content work?',
                'Schedule a free audit',
                'WhatsApp solutions pricing',
              ].map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputValue(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          )}

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={chatStatus === 'degraded' ? 'Retry your message or ask another question...' : 'Ask about our services...'}
                className="border-border bg-background"
                disabled={chatStatus === 'sending' || chatStatus === 'retrying'}
                aria-label="Chat message input"
              />
              <Button
                variant="gold"
                size="icon"
                onClick={() => handleSend()}
                disabled={chatStatus === 'sending' || chatStatus === 'retrying' || !inputValue.trim()}
                aria-label="Send chat message"
              >
                {chatStatus === 'sending' || chatStatus === 'retrying' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>Or call us: +234 700 000 0000</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

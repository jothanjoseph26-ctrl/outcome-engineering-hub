import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Phone, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { openrouter, type Message as AIMessage } from '@/lib/openrouter';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const WELCOME_MESSAGES = [
  "Hi there! I am Outcome Labs' AI assistant powered by Claude. How can I help you today?",
  "I can help you with:\n• SEO engineering & optimization\n• Programmatic content generation\n• Server-side tracking\n• WhatsApp business solutions\n• Scheduling a free audit",
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiConnected, setAiConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      let delay = 0;
      WELCOME_MESSAGES.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `welcome-${index}`,
            text: msg,
            sender: 'assistant',
            timestamp: new Date()
          }]);
          if (index === WELCOME_MESSAGES.length - 1) {
            setIsTyping(false);
          }
        }, delay);
        delay += 1200;
      });
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const conversationHistory: AIMessage[] = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const response = await openrouter.chatWithUser(userMessage.text, conversationHistory);

      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      }]);
      setAiConnected(true);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        text: "I apologize, but I'm having trouble connecting to my AI services right now. Please try again or contact us directly.",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    "Tell me about SEO services",
    "How does programmatic content work?",
    "Schedule a free audit",
    "WhatsApp solutions pricing"
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold hover:bg-gold/90 shadow-lg flex items-center justify-center transition-transform ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <Sparkles className="h-6 w-6 text-background" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 ${
              isMinimized 
                ? 'bottom-6 right-6 w-80' 
                : 'bottom-6 right-6 w-96 h-[500px]'
            }`}
          >
            <Card className="glass-card h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gold to-amber-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-background" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-background">Outcome Labs AI</h3>
                    <p className="text-xs text-background/70 flex items-center gap-1">
                      {aiConnected ? (
                        <>Powered by Claude</>
                      ) : (
                        <>Connecting...</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-background hover:bg-background/20"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-background hover:bg-background/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] p-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-gold text-background'
                                : 'bg-card border border-border'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-background/60' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-card border border-border p-3 rounded-2xl">
                          <Loader2 className="h-4 w-4 animate-spin text-gold" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length <= 4 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setInputValue(reply);
                          }}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about our services..."
                        className="bg-background border-border"
                        disabled={isTyping}
                      />
                      <Button 
                        variant="gold" 
                        size="icon" 
                        onClick={handleSend}
                        disabled={isTyping || !inputValue.trim()}
                      >
                        {isTyping ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>Or call us: +234 700 000 0000</span>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

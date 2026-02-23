import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botMessages = [
  "Hi there! 👋 I'm Outcome Labs' AI assistant. How can I help you today?",
  "I can help you with:\n• Understanding our services\n• Scheduling a call\n• Getting a free audit\n• Answering pricing questions",
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      let delay = 0;
      botMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `bot-${index}`,
            text: msg,
            sender: 'bot',
            timestamp: new Date()
          }]);
          if (index === botMessages.length - 1) {
            setIsTyping(false);
          }
        }, delay);
        delay += 1500;
      });
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        text: "Thanks for reaching out! One of our experts will get back to you within 2 hours. Would you like to schedule a call now?",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "Book a call",
    "Get a free audit",
    "Pricing info"
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
        <MessageCircle className="h-6 w-6 text-background" />
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
              <div className="bg-gold p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-background" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-background">Outcome Labs</h3>
                    <p className="text-xs text-background/70">AI Assistant • Online</p>
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
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gold text-background'
                              : 'bg-card border border-border'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-card border border-border p-3 rounded-2xl">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Replies */}
                  {messages.length <= 2 && (
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
                        placeholder="Type your message..."
                        className="bg-background border-border"
                      />
                      <Button variant="gold" size="icon" onClick={handleSend}>
                        <Send className="h-4 w-4" />
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

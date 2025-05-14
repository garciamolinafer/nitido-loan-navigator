import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, MinusCircle, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface ContractsAIExtractorProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function ContractsAIExtractor({ onClose, onMinimize }: ContractsAIExtractorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I can help you analyze and extract information from your contract documents. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    // Add assistant response (mock for now)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      text: "I'll analyze that for you. Here's what I found in the documents...",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-lg border">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Contracts AI Extractor" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <span className="font-medium">Contract Analysis</span>
        </div>
        <div className="flex gap-2">
          {onMinimize && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={onMinimize}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-80 p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'assistant' && (
                <Avatar className="h-6 w-6 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="Contracts AI Extractor" />
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about your contracts..."
            className="min-h-[60px]"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
} 
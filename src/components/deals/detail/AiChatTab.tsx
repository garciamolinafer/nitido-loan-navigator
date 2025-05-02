
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const AiChatTab = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello, I'm Nítido Paralegal AI. I can help you with any legal questions about this deal. What would you like to know?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "I'm analyzing your question about the deal. While I'm still in demo mode, in the full product I would provide detailed legal insights based on all deal documents and market precedents.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'ai' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`p-4 rounded-lg max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.text}</p>
                <div className="text-xs mt-2 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <Input
            placeholder="Ask about the legal aspects of this deal..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="gap-2">
            <Send className="h-4 w-4" />
            Send
          </Button>
        </form>
        <div className="max-w-4xl mx-auto mt-2">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Try asking: "What are the key covenants in this deal?" or "Explain the change of control provisions"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiChatTab;

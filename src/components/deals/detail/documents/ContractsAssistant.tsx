
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, X, Minimize, BookText, BookOpen } from "lucide-react";
import { Document } from "@/data/mock-documents";

interface ContractsAssistantProps {
  selectedDocument: Document | null;
  onClose: () => void;
  onMinimize: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export const ContractsAssistant = ({ selectedDocument, onClose, onMinimize }: ContractsAssistantProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I can parse and summarize contract documents. Select a document (or multiple) for me to ingest, or upload new agreements for analysis.",
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
      
      // Simulate AI response based on user query and selected document
      setTimeout(() => {
        let responseText = "I can help analyze this document. What specific information are you looking for?";
        
        // Generate specific responses based on the selected document and user query
        if (selectedDocument) {
          const lowerCaseMessage = message.toLowerCase();
          
          if (selectedDocument.id === "doc-004" && lowerCaseMessage.includes("change")) {
            responseText = "This amendment increases the facility from $45M to $50M and extends the maturity by 6 months. It also relaxes the Net Leverage covenant from 3.5× to 4.0× until 2026 (see Section 4.2).";
          } else if (selectedDocument.id === "doc-001" && (lowerCaseMessage.includes("extract") || lowerCaseMessage.includes("covenant"))) {
            responseText = "Extracting key provisions... Done. I've identified 8 financial covenants, events of default, and other key terms. The data is now linked to the Covenants and Loan Admin sections.\n\nCovenant: Net Leverage ≤3.5× (Section 5.3), Current Status: Breach. I've updated the Covenants tab with this info.";
          } else if (lowerCaseMessage.includes("ingest") || lowerCaseMessage.includes("analyze")) {
            responseText = `I'll analyze ${selectedDocument.title}. This may take a moment...`;
            
            // Simulate a follow-up message after "processing"
            setTimeout(() => {
              const aiMessage: Message = {
                id: `ai-${Date.now() + 1}`,
                sender: "assistant",
                text: `${selectedDocument.title} successfully digested. Key terms and covenants are now available in the platform. Would you like me to summarize the main points?`,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, aiMessage]);
            }, 2000);
          }
        } else if (lowerCaseMessage.includes("summarize") || lowerCaseMessage.includes("summary")) {
          responseText = "Please select a document first so I know which one to summarize.";
        }
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: "assistant",
          text: responseText,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-md border-t-0 rounded-t-none">
      <CardHeader className="p-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Contracts Assistant" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm font-medium">Nítido Contracts AI</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onMinimize}>
              <Minimize className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 flex-grow overflow-y-auto">
        <div className="flex flex-col gap-3">
          {selectedDocument && (
            <div className="bg-blue-50 p-2 rounded-md text-xs border border-blue-100 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>
                Currently analyzing: <strong>{selectedDocument.title}</strong>
              </span>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'assistant' && (
                <Avatar className="h-6 w-6 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="Contracts Assistant" />
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder={selectedDocument 
              ? `Ask about "${selectedDocument.title}"`
              : "Select a document or ask a question..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export const MinimizedAssistant = ({ onMaximize }: { onMaximize: () => void }) => {
  return (
    <Card 
      className="flex items-center p-2 gap-2 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onMaximize}
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder.svg" alt="Contracts Assistant" />
        <AvatarFallback>CA</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">Nítido Contracts AI</span>
    </Card>
  );
};

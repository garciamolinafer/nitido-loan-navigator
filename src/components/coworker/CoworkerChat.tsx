
import { useState, useRef, useEffect } from "react";
import { useCoworker } from "@/hooks/useCoworker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CoworkerChat() {
  const [message, setMessage] = useState("");
  const { agenticMessages, addAgenticMessage } = useCoworker();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    addAgenticMessage({
      role: "user",
      content: message
    });
    
    // Process user message and generate AI response
    processUserMessage(message);
    
    // Clear input
    setMessage("");
  };
  
  const processUserMessage = (userMessage: string) => {
    // Simulate AI response based on user message
    setTimeout(() => {
      let response = "";
      
      const messageLower = userMessage.toLowerCase();
      
      if (messageLower.includes("create") && messageLower.includes("workflow")) {
        response = "I'd be happy to help you create a new workflow. Would you like to start from scratch or use one of our templates?";
      } 
      else if (messageLower.includes("run") && messageLower.includes("workflow")) {
        response = "Which workflow would you like to run? You can specify a name or select one from your My Workflows list.";
      }
      else if (messageLower.includes("template")) {
        response = "We have several templates available for common tasks like payment reminders, compliance certificates, and drawdown notices. Would you like to see the full list?";
      }
      else if (messageLower.includes("apollo") && messageLower.includes("energy")) {
        response = "I see you're interested in the Apollo Energy deal. Would you like to create a workflow for this deal, or check the status of existing ones?";
      }
      else if (messageLower.includes("help")) {
        response = "I can help you create and manage workflows for your loan deals. You can ask me to create a workflow, run an existing one, check approval status, or view your workflow history.";
      }
      else {
        response = "I understand you'd like my assistance. Could you provide more details about what you'd like to do? I can help with creating workflows, running automations, or monitoring your tasks.";
      }
      
      addAgenticMessage({
        role: "assistant",
        content: response
      });
    }, 1000);
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [agenticMessages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarImage src="/lovable-uploads/7d678ec7-7fbc-4476-90b4-b046b2c0ad1c.png" alt="Nítido Coworker" />
            <AvatarFallback><Bot size={16} /></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Nítido Coworker</h3>
            <p className="text-xs text-muted-foreground">AI Workflow Assistant</p>
          </div>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {agenticMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8 mt-1 bg-primary">
                  <AvatarImage src="/lovable-uploads/7d678ec7-7fbc-4476-90b4-b046b2c0ad1c.png" alt="Nítido Coworker" />
                  <AvatarFallback><Bot size={16} /></AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              
              {msg.role === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Message Nítido Coworker..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}


import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";
import { useNitidinaChat } from "@/hooks/useNitidinaChat";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export function NitidinaAssistant() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isNitidinaOpen: isOpen, 
    nitidinaMessage, 
    openNitidinaChat, 
    closeNitidinaChat,
    setNitidinaMessage 
  } = useNitidinaChat();

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  
  // Handle incoming messages from tasks
  useEffect(() => {
    if (nitidinaMessage && isOpen) {
      // Add system message based on the prompt
      handleNitidinaResponse(nitidinaMessage);
      // Clear the message from store after processing
      setNitidinaMessage("");
    }
  }, [nitidinaMessage, isOpen, setNitidinaMessage]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      if (!isOpen) {
        openNitidinaChat();
      } else {
        closeNitidinaChat();
      }
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        sender: "user",
        text: message,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      // Generate response based on user message
      handleNitidinaResponse(message);
      
      // Clear input
      setMessage("");
    }
  };
  
  const handleNitidinaResponse = (prompt: string) => {
    // This is a simplified mock of AI response generation
    // In a real implementation, this would call an AI service
    
    let response: string;
    
    // Check if this is a task-specific prompt
    if (prompt.includes("help with a") && prompt.includes("priority task")) {
      const taskMatch = prompt.match(/task: "([^"]+)"/);
      const taskTitle = taskMatch ? taskMatch[1] : "this task";
      const dealMatch = prompt.match(/for the ([^,]+) deal/);
      const dealName = dealMatch ? dealMatch[1] : "the deal";
      
      // Generate a helpful response based on the task type
      if (prompt.includes("covenant")) {
        response = `I see you need help with the covenant compliance task "${taskTitle}" for ${dealName}. I can help you review the financial data and ensure compliance with all covenants.\n\nWould you like me to:\n1. Pull the latest financial data from FinScan\n2. Show you a summary of covenant requirements\n3. Start preparing a waiver letter if there are breaches`;
      } else if (prompt.includes("document")) {
        response = `I can help you with the documentation task "${taskTitle}" for ${dealName}. Let's make sure all the necessary paperwork is in order.\n\nWould you like me to:\n1. Open IntraLinks to access the documents\n2. Draft a template document for you\n3. Create a document checklist for this deal`;
      } else if (prompt.includes("drawdown")) {
        response = `I see you're working on a drawdown request "${taskTitle}" for ${dealName}. I can help you prepare and process this request.\n\nWould you like me to:\n1. Check available facility amounts in LoanIQ\n2. Prepare a draft drawdown notice\n3. Create a workflow in Coworker to automate future drawdowns`;
      } else if (prompt.includes("market")) {
        response = `For your market data task "${taskTitle}" for ${dealName}, I can help gather and analyze the relevant market information.\n\nWould you like me to:\n1. Pull the latest rates from Versana\n2. Generate a market trends report\n3. Set up automated alerts for significant market changes`;
      } else if (prompt.includes("compliance")) {
        response = `I'll help you with the compliance task "${taskTitle}" for ${dealName}. Let's ensure everything meets regulatory requirements.\n\nWould you like me to:\n1. Check compliance status in FinScan\n2. Generate required compliance forms\n3. Create a recurring compliance workflow in Coworker`;
      } else {
        response = `I see you need help with "${taskTitle}" for ${dealName}. I'd be happy to assist with this task.\n\nWould you like me to:\n1. Help you create a step-by-step action plan\n2. Set up reminders for important deadlines\n3. Delegate parts of this task to the appropriate team members`;
      }
      
      if (prompt.includes("overdue")) {
        response += "\n\nSince this task is overdue, I recommend prioritizing it immediately. Would you like me to clear some time on your calendar to focus on this?";
      }
    } else {
      // Default responses for regular chat
      const greetings = ["hi", "hello", "hey"];
      const taskQueries = ["task", "todo", "to-do", "to do", "overdue"];
      
      const promptLower = prompt.toLowerCase();
      
      if (greetings.some(greeting => promptLower.includes(greeting))) {
        response = "Hello! How can I help you with your tasks today?";
      } else if (taskQueries.some(query => promptLower.includes(query))) {
        response = "You have several tasks that require your attention. Would you like to see your overdue tasks or upcoming deadlines?";
      } else if (promptLower.includes("coworker")) {
        response = "I can help you set up automated workflows in Nítido Coworker. Would you like to create a new workflow or check existing ones?";
      } else {
        response = "I'm here to help with your tasks and workflow. How can I assist you today?";
      }
    }
    
    // Add assistant message to chat with a slight delay to feel more natural
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        sender: "assistant",
        text: response,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 rounded-full h-12 w-12 shadow-lg p-0 animate-pulse hover:animate-none z-50"
        variant="default"
      >
        <NitidinaAvatar size="lg" />
      </Button>

      {/* Chat window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 flex flex-col border">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <NitidinaAvatar size="sm" />
              <span className="font-medium">Nitidina</span>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={minimizeChat}>
                <MinusCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => closeNitidinaChat()}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-3 h-80 flex flex-col gap-3">
            {chatHistory.length === 0 ? (
              <div className="flex gap-2">
                <NitidinaAvatar size="sm" className="mt-1" />
                <div>
                  <p className="bg-gray-100 rounded-lg p-3 text-sm">
                    Good morning, Marina. How can I help you today? You can ask me about your tasks, upcoming deadlines, or assistance with specific workflows.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => setMessage("Show me my overdue tasks")}>
                      Overdue tasks
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setMessage("Help me with covenants")}>
                      Covenant help
                    </Button>
                    <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                      <Link to="/coworker">Open Coworker</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
                  {msg.sender === "assistant" && <NitidinaAvatar size="sm" className="mt-1" />}
                  <div className={`max-w-[80%] ${msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100"} rounded-lg p-3 text-sm`}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                  {msg.sender === "user" && <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">M</div>}
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Minimized chat window */}
      {isMinimized && (
        <Card className="fixed bottom-20 right-6 w-60 shadow-lg z-50 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <CardContent className="p-3 flex items-center gap-2">
            <NitidinaAvatar size="sm" />
            <span className="text-sm">Chat with Nitidina</span>
          </CardContent>
        </Card>
      )}
    </>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export const LoanAdminAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm the Loan Admin Assistant. I can help with loan calculations, payment schedules, and more. What would you like to know?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Simulate AI response based on user query
    setTimeout(() => {
      let response = "";
      
      if (input.toLowerCase().includes("next payment")) {
        response = "The next payment due is an interest payment of $500,000 due on June 30, 2025.";
      } else if (input.toLowerCase().includes("draw") || input.toLowerCase().includes("additional")) {
        response = "Currently outstanding is $50M. With an additional $5M draw, outstanding would be $55M (assuming no repayments in between). Note: This would be within the accordion feature of the facility.";
      } else if (input.toLowerCase().includes("interest") && input.toLowerCase().includes("accrue")) {
        response = "Approximately $125,000 interest will accrue from Apr 1 to Jun 30 at the current rate of 6.75%.";
      } else if (input.toLowerCase().includes("notice") || input.toLowerCase().includes("generate")) {
        response = "Draft Notice: 'Dear Borrower, this is to notify you that an interest payment of $500,000 is due on June 30, 2025, per Section 2.4 of the Credit Agreement...'";
      } else {
        response = "I can help with loan calculations and payment information. Try asking about next payments, interest accruals, or draft notices.";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 600);
    
    setInput("");
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <Button 
          variant="outline" 
          className="fixed bottom-20 right-4 h-12 w-12 rounded-full p-0 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Calculator className="h-6 w-6" />
        </Button>
      ) : (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white border rounded-lg shadow-lg flex flex-col overflow-hidden z-10">
          <div className="bg-primary text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              <span className="font-medium">Loan Admin Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${
                  msg.isUser 
                    ? "ml-auto bg-primary text-white" 
                    : "mr-auto bg-muted text-foreground"
                } rounded-lg p-3 max-w-[85%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about payments, calculations..."
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
              <Button type="submit" size="sm">Send</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

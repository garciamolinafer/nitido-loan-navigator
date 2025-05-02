
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Sparkles, 
  FileText, 
  Mail, 
  Video,
  Copy,
  CheckCheck
} from "lucide-react";
import { format } from "date-fns";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  attachedDocument?: string;
}

const AiChatTab = () => {
  const [message, setMessage] = useState("");
  const [isLongMessage, setIsLongMessage] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello, I'm Nítido Paralegal AI. I can help you with any legal questions about this deal. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [isCopied, setIsCopied] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    
    // Check if message is long enough to switch to textarea
    setIsLongMessage(message.length > 100);
  }, [message]);

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
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      
      // Simulate AI response based on the question
      setTimeout(() => {
        let aiResponse = "";
        let attachedDoc: string | undefined = undefined;
        
        if (message.toLowerCase().includes("financial covenant") || message.toLowerCase().includes("covenants")) {
          aiResponse = "This deal has two key financial covenants: a Net Leverage Ratio ≤ 3.5× and a DSCR ≥ 1.20×. The borrower must provide quarterly compliance certificates. The next compliance certificate is due by April 30, 2025 (30 days after Q1 2025 end). As of last quarter, Net Leverage was 3.8× (a breach) and DSCR 1.35× (compliant). I'd advise monitoring the leverage breach – perhaps a waiver will be needed.";
          attachedDoc = "Credit Agreement - Section 6.1";
        } else if (message.toLowerCase().includes("default")) {
          aiResponse = "Events of Default are serious breaches that allow lenders to demand immediate repayment. The main ones in this deal include:\n\n• Non-payment: If the Borrower doesn't pay interest or principal on time\n• Breach of covenants: If the Borrower violates a covenant and doesn't fix it\n• Misrepresentation: If any important information provided turns out to be false\n• Cross-default: If the Borrower defaults on other significant debt\n• Insolvency: If the Borrower goes bankrupt or is unable to pay debts\n\nIf any Event of Default occurs, the agent bank can declare the loan immediately due and take enforcement actions.";
          attachedDoc = "Credit Agreement - Section 8";
        } else if (message.toLowerCase().includes("collateral") || message.toLowerCase().includes("proceeds")) {
          aiResponse = "Enforcement proceeds distribution is set by the security agreement's waterfall clause. For this deal, it would go roughly:\n\n1. First, to cover any enforcement expenses and unpaid fees\n2. Second, to the loans' interest and principal due (to lenders pro-rata)\n3. Finally, any leftover would return to the Borrower\n\nIn practice, if $10M is recovered from collateral sale and $100k fees incurred, about $9.9M goes to the lenders toward the outstanding loan.";
          attachedDoc = "Security Agreement - Section 9.4";
        } else if (message.toLowerCase().includes("waiver") || message.toLowerCase().includes("draft")) {
          aiResponse = "Certainly. Here's a draft of a waiver request letter:\n\nDear Lenders,\n\nWe are writing to request a waiver for the Q1 2025 breach of the Net Leverage Ratio covenant (3.8× vs 3.5× required). The breach is primarily due to a one-time expense that reduced EBITDA. The Borrower has secured an equity injection of $5 million, which will bring leverage back into compliance by Q2 2025.\n\nWe kindly ask the Required Lenders to waive this breach for Q1 2025. Enclosed are supporting financial statements and a certificate confirming the equity cure. This waiver will not prejudice any rights for future periods.\n\nSincerely,\nAlphaCo Industries\n\nPlease review and modify as needed.";
        } else if (message.toLowerCase().includes("certificate") || message.toLowerCase().includes("due soon")) {
          aiResponse = "Yes. The borrower must provide a quarterly compliance certificate for Q1 2025 by April 30, 2025 (within 30 days of quarter-end, per Section 5.1 of the Credit Agreement). That date is approaching. Also, an annual audited financial statement is due within 90 days of fiscal year end, which would be March 31, 2025.";
          attachedDoc = "Credit Agreement - Section 5.1";
        } else {
          aiResponse = "I understand you're asking about aspects of this deal. To give you the most accurate information, I'd need to analyze the specific clauses in the deal documentation. Based on the available information, I can tell you that this appears to be a term loan facility for AlphaCo Industries with standard covenant packages and reporting requirements. Could you provide more specific details about what you'd like to know?";
        }
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiResponse,
          timestamp: new Date(),
          attachedDocument: attachedDoc
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  const formatMessageTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col bg-background rounded-md">
      {/* Header with paralegal info */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/lovable-uploads/48b1cc5d-7d2e-4ad9-9b0b-e5608ebbee17.png" alt="Nítido Paralegal" />
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Nítido Paralegal</h3>
            <p className="text-xs text-muted-foreground">Deal Legal Assistant</p>
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View related documents</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email transcript</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Schedule video call with counsel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Chat messages area */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'ai' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/lovable-uploads/48b1cc5d-7d2e-4ad9-9b0b-e5608ebbee17.png" alt="AI" />
                  <AvatarFallback>NP</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <div 
                  className={`p-4 rounded-lg max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div className="text-xs mt-2 opacity-70 flex justify-between">
                    <span>{formatMessageTime(msg.timestamp)}</span>
                    {msg.sender === 'ai' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-2 opacity-50 hover:opacity-100"
                        onClick={() => copyToClipboard(msg.text)}
                      >
                        {isCopied ? 
                          <CheckCheck className="h-3 w-3" /> : 
                          <Copy className="h-3 w-3" />
                        }
                      </Button>
                    )}
                  </div>
                </div>
                {msg.attachedDocument && (
                  <div className="mt-2 text-xs">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 text-xs flex items-center gap-1"
                    >
                      <FileText className="h-3 w-3" />
                      {msg.attachedDocument}
                    </Button>
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            {isLongMessage ? (
              <Textarea
                ref={textareaRef}
                placeholder="Ask about the legal aspects of this deal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow min-h-[40px] max-h-[200px] resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            ) : (
              <Input
                placeholder="Ask about the legal aspects of this deal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
            )}
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </form>
        <div className="max-w-4xl mx-auto mt-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Try asking specific questions about covenants, defaults, or legal requirements
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setMessage("What financial covenants do we have and when is the next compliance certificate due?")}
              >
                Financial covenants?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setMessage("Explain the Events of Default in plain English")}
              >
                Events of Default?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setMessage("Draft a waiver request for the leverage covenant breach")}
              >
                Draft waiver request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatTab;

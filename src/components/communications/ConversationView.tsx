
import { useState, useRef, useEffect } from "react";
import { ThreadType } from "@/hooks/useCommsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNitidinaChat } from "@/hooks/useNitidinaChat";
import {
  Bot,
  User,
  MessageSquare,
  Mail,
  Video,
  PaperclipIcon,
  Send,
  Calendar,
  AlertCircle,
  FileText,
  Lightbulb,
  Star
} from "lucide-react";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface ConversationViewProps {
  thread?: ThreadType;
}

export function ConversationView({ thread }: ConversationViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { openNitidinaChat } = useNitidinaChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !thread) return;
    
    // Here you would implement sending a new message
    // For now we'll just clear the input
    setNewMessage("");
  };

  const handleNitidinaHelp = () => {
    if (!thread) return;
    
    // Build a context-aware prompt based on the current thread
    const contextPrompt = `help with a ${thread.priority === "high" ? "high" : "normal"} priority task: "${thread.title}" for the ${thread.deal} deal. This is related to ${thread.topics.join(', ')}.`;
    
    // Open Nitidina chat with this context
    openNitidinaChat(contextPrompt);
  };

  if (!thread) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No conversation selected</h3>
        <p className="text-muted-foreground">Select a conversation from the list</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="p-4 border-b bg-muted/10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{thread.title}</h2>
              {thread.priority === "high" && (
                <Badge variant="destructive" className="h-5">Urgent</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="outline" className="bg-blue-50">
                {thread.deal}
              </Badge>
              {thread.topics.map(topic => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleNitidinaHelp} size="sm" variant="outline" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span>Ask Nitidina</span>
            </Button>
            <Button size="icon" variant="ghost" title="Email summary">
              <Mail className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" title="Start video meeting">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">
            Participants:
          </span>
          <div className="flex -space-x-2">
            {thread.participants.map(participant => (
              <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>
                  {participant.isAI ? 
                    (participant.name === "Nitidina" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />) : 
                    getInitials(participant.name)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      {/* AI summary banner */}
      {thread.messages.some(msg => msg.isAI) && (
        <div className="bg-blue-50 p-3 flex items-start gap-3 border-b">
          <NitidinaAvatar size="sm" />
          <div className="text-sm">
            <p className="font-medium">Nitidina summary</p>
            <p className="text-muted-foreground">
              {thread.title === "Urgent Borrower Update" ? (
                <>Borrower requests expedited $5M drawdown, response needed today. <span className="text-blue-600">@Bob</span> is reviewing the cash flow model.</>
              ) : thread.title === "Covenant Breach Discussion" ? (
                <>Potential covenant breach detected - EBITDA below floor. Legal team has been notified. <span className="text-rose-600 font-medium">High priority</span></>
              ) : (
                <>This thread contains {thread.messages.length} messages. Last activity: {thread.timestamp}</>
              )}
            </p>
            
            {thread.title === "Urgent Borrower Update" && (
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs font-medium">Response needed by: Today (May 1, 2025)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Attachments section */}
      {thread.title === "Urgent Borrower Update" && (
        <div className="flex items-center gap-3 p-3 border-b overflow-x-auto">
          <div className="min-w-max flex items-center gap-1.5 bg-muted p-2 rounded">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">CashFlowModel_AE.xlsx</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-6 pb-6">
          {thread.messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar className="h-8 w-8 mt-1">
                {message.isAI ? (
                  <NitidinaAvatar size="sm" />
                ) : (
                  <>
                    <AvatarImage src="/placeholder.svg" alt={message.sender} />
                    <AvatarFallback>
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.sender}</span>
                    {message.isAI && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        AI Assistant
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                
                <div className={`p-3 rounded-lg text-sm ${
                  message.isAI ? 'bg-blue-50' : 'bg-muted/50'
                }`}>
                  {message.content}
                </div>
                
                {/* Action suggestions from Nitidina */}
                {message.senderId === "3" && message.id === "1-1" && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      <AlertCircle className="h-3 w-3" />
                      <span>Urgent</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      <span>Due today</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Flag
                    </Button>
                  </div>
                )}
                
                {/* Suggested reply */}
                {message.senderId === "7" && message.id === "1-4" && (
                  <div className="mt-2 p-2 border border-blue-200 rounded-md bg-blue-50 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <div className="text-xs">
                      <p className="font-medium text-blue-700">Suggested reply:</p>
                      <p className="text-muted-foreground">"Thank you Bob, let me know if you need any additional information."</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <Separator />
      <div className="p-4">
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
          <Textarea
            placeholder="Type a message... (@Nitidina for AI help)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" size="icon" variant="ghost" title="Attach files">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

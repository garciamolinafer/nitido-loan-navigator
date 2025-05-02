
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Mail, 
  Video, 
  PaperclipIcon, 
  Send, 
  Plus,
  Bot,
  User
} from "lucide-react";

// Types
type ThreadType = {
  id: string;
  title: string;
  lastMessage: string;
  lastSender: string;
  timestamp: string;
  unreadCount: number;
  participants: Participant[];
  messages: MessageType[];
};

type Participant = {
  id: string;
  name: string;
  avatar?: string;
  isAI?: boolean;
};

type MessageType = {
  id: string;
  senderId: string;
  sender: string;
  content: string;
  timestamp: string;
  isAI?: boolean;
  aiType?: "nitidina" | "paralegal";
};

// Mock data
const mockParticipants: Participant[] = [
  { id: "1", name: "Marina", avatar: "/placeholder.svg" },
  { id: "2", name: "John", avatar: "/placeholder.svg" },
  { id: "3", name: "Alice", avatar: "/placeholder.svg" },
  { id: "4", name: "Michael", avatar: "/placeholder.svg" },
  { id: "5", name: "Nitidina", avatar: "/placeholder.svg", isAI: true },
  { id: "6", name: "Paralegal", avatar: "/placeholder.svg", isAI: true }
];

const mockThreads: ThreadType[] = [
  {
    id: "1",
    title: "General Updates",
    lastMessage: "Could you provide a summary of the security package?",
    lastSender: "Marina",
    timestamp: "1h ago",
    unreadCount: 2,
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[4]],
    messages: [
      {
        id: "1-1",
        senderId: "1",
        sender: "Marina",
        content: "@Nitidina, could you provide a summary of the security package for this deal?",
        timestamp: "May 1, 2025 10:30 AM"
      },
      {
        id: "1-2",
        senderId: "5", 
        sender: "Nitidina",
        content: "Sure. The security package includes: 1) a first-lien mortgage on the AlphaCo factory, 2) a pledge of 100% of the equity of AlphaCo's subsidiary, and 3) assignment of AlphaCo's key contracts. (See Sections 3.1-3.3 of the Security Agreement for details.)",
        timestamp: "May 1, 2025 10:31 AM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "1-3",
        senderId: "1",
        sender: "Marina",
        content: "Thank you. Could you also advise on the timing of the next rollover for Tranche A?",
        timestamp: "May 1, 2025 10:35 AM"
      },
      {
        id: "1-4",
        senderId: "5",
        sender: "Nitidina",
        content: "The current interest period ends on June 30, 2025, so that's the next rollover date for Tranche A. On that date, interest will be paid and a new interest period will begin (assuming no repayment).",
        timestamp: "May 1, 2025 10:36 AM",
        isAI: true,
        aiType: "nitidina"
      }
    ]
  },
  {
    id: "2",
    title: "Documents Review",
    lastMessage: "Clause 4.2 is still unclear regarding covenants.",
    lastSender: "Alice",
    timestamp: "3h ago",
    unreadCount: 0,
    participants: [mockParticipants[0], mockParticipants[2], mockParticipants[5]],
    messages: [
      {
        id: "2-1",
        senderId: "3",
        sender: "Alice",
        content: "We've reviewed the draft Amendment. Clause 4.2 is still unclear regarding covenants. @Paralegal, can you clarify what happens to the leverage ratio covenant in this amendment?",
        timestamp: "May 1, 2025 8:15 AM"
      },
      {
        id: "2-2",
        senderId: "6",
        sender: "Paralegal",
        content: "According to Amendment No.1, Clause 4.2 revises the Net Leverage covenant: it temporarily raises the limit from 3.5× to 4.0× for fiscal year 2025. After Dec 2025, it reverts to 3.5×. Essentially, it gives the borrower flexibility for one year. All other covenants remain unchanged.",
        timestamp: "May 1, 2025 8:17 AM",
        isAI: true,
        aiType: "paralegal"
      },
      {
        id: "2-3",
        senderId: "4",
        sender: "Michael",
        content: "Thanks. That matches our understanding. We'll proceed with that language.",
        timestamp: "May 1, 2025 8:30 AM"
      },
      {
        id: "2-4",
        senderId: "1",
        sender: "Marina",
        content: "Once finalized, I will upload the executed amendment in Documents and share the link here.",
        timestamp: "May 1, 2025 9:00 AM"
      }
    ]
  },
  {
    id: "3",
    title: "Covenants",
    lastMessage: "Projected Net Leverage for Q2 2025 is ~3.4×",
    lastSender: "Nitidina",
    timestamp: "Yesterday",
    unreadCount: 1,
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[4]],
    messages: [
      {
        id: "3-1",
        senderId: "1",
        sender: "Marina",
        content: "Q1 covenants are tested. We have a breach on Net Leverage (3.8× vs 3.5×). @Nitidina, what are the typical remedies we should consider?",
        timestamp: "Apr 30, 2025 2:15 PM"
      },
      {
        id: "3-2",
        senderId: "5",
        sender: "Nitidina",
        content: "Options for a breach of Net Leverage: 1) Borrower may use an equity cure (inject cash to reduce leverage) if allowed – in this deal, yes, within 30 days; 2) Seek a waiver or amendment from lenders to relax the covenant (likely via majority vote); 3) Increase EBITDA or pay down debt by next quarter. I can help draft a waiver request if needed.",
        timestamp: "Apr 30, 2025 2:17 PM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "3-3",
        senderId: "2",
        sender: "John",
        content: "Also, @Nitidina, what's the projected leverage next quarter if no action is taken?",
        timestamp: "Apr 30, 2025 2:20 PM"
      },
      {
        id: "3-4",
        senderId: "5",
        sender: "Nitidina",
        content: "Projected Net Leverage for Q2 2025 is ~3.4× assuming forecasted EBITDA, which would actually fall back into compliance. The breach might resolve itself next quarter due to higher projected earnings.",
        timestamp: "Apr 30, 2025 2:22 PM",
        isAI: true,
        aiType: "nitidina"
      }
    ]
  }
];

export const CommunicationsTab = () => {
  const [threads, setThreads] = useState<ThreadType[]>(mockThreads);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("1");
  const [newMessage, setNewMessage] = useState<string>("");
  
  const selectedThread = threads.find(thread => thread.id === selectedThreadId);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return;
    
    const updatedThreads = threads.map(thread => {
      if (thread.id === selectedThreadId) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              id: `${thread.id}-${thread.messages.length + 1}`,
              senderId: "1",
              sender: "Marina",
              content: newMessage,
              timestamp: new Date().toLocaleString()
            }
          ],
          lastMessage: newMessage,
          lastSender: "Marina",
          timestamp: "Just now"
        };
      }
      return thread;
    });
    
    setThreads(updatedThreads);
    setNewMessage("");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="flex h-[calc(100vh-300px)] min-h-[500px]">
      {/* Thread List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Conversations</h3>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Thread</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search threads..." className="flex-grow" />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100%-5rem)]">
          <div className="p-2">
            {threads.map(thread => (
              <div 
                key={thread.id}
                className={`p-3 rounded-md cursor-pointer mb-2 hover:bg-accent ${
                  selectedThreadId === thread.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedThreadId(thread.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className={`font-medium ${thread.unreadCount > 0 ? 'font-semibold' : ''}`}>
                    {thread.title}
                  </h4>
                  <div className="text-xs text-muted-foreground">{thread.timestamp}</div>
                </div>
                <div className="flex justify-between items-start mt-1">
                  <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                    <span className={thread.unreadCount > 0 ? 'font-medium' : ''}>
                      {thread.lastSender}: 
                    </span>{" "}
                    {thread.lastMessage}
                  </p>
                  {thread.unreadCount > 0 && (
                    <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-primary text-[10px] text-primary-foreground font-medium px-1">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Message Panel */}
      <div className="w-2/3 flex flex-col">
        {selectedThread && (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold mr-4">{selectedThread.title}</h3>
                  <div className="flex -space-x-2">
                    {selectedThread.participants.map(participant => (
                      <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" title="Email summary">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="Start video meeting">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Participants: {selectedThread.participants.map(p => p.name).join(', ')}
              </p>
            </div>
            
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {selectedThread.messages.map(message => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={message.sender} />
                      <AvatarFallback>
                        {message.isAI ? 
                          (message.aiType === "nitidina" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />) : 
                          getInitials(message.sender)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.sender}</span>
                          {message.isAI && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {message.aiType === "nitidina" ? "Nitidina AI" : "Paralegal AI"}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-lg text-sm ${message.isAI ? 'bg-blue-50' : 'bg-gray-100'}`}>
                        {message.content.split('@Nitidina').map((part, i, arr) => {
                          if (i === 0 && arr.length === 1) return part;
                          return i === 0 ? (
                            <span key={i}>{part}<span className="text-blue-600 font-medium">@Nitidina</span></span>
                          ) : (
                            <span key={i}>{part}</span>
                          );
                        }).map(part => {
                          if (typeof part === 'string') {
                            return part.split('@Paralegal').map((subPart, j, subArr) => {
                              if (j === 0 && subArr.length === 1) return subPart;
                              return j === 0 ? (
                                <span key={`p-${j}`}>{subPart}<span className="text-blue-600 font-medium">@Paralegal</span></span>
                              ) : (
                                <span key={`p-${j}`}>{subPart}</span>
                              );
                            });
                          }
                          return part;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex flex-col gap-3"
              >
                <Textarea
                  placeholder="Type a message... (@Nitidina or @Paralegal for AI help)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button type="button" size="icon" variant="ghost">
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
          </>
        )}
      </div>
    </div>
  );
};

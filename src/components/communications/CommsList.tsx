
import { useState } from "react";
import { ThreadType } from "@/hooks/useCommsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommsListProps {
  threads: ThreadType[];
  activeThreadId: string;
  onSelectThread: (id: string) => void;
}

export function CommsList({ threads, activeThreadId, onSelectThread }: CommsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Filter threads by search query
  const filteredThreads = searchQuery
    ? threads.filter(thread => 
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : threads;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Conversations</h3>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>New</span>
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search threads..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredThreads.map(thread => (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`p-3 rounded-md cursor-pointer transition-colors
                  ${activeThreadId === thread.id 
                    ? 'bg-primary/10' 
                    : 'hover:bg-accent'}`}
              >
                {/* Thread Header */}
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-medium ${thread.unreadCount > 0 ? 'font-semibold' : ''}`}>
                    {thread.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    {thread.priority === "high" && (
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {thread.timestamp}
                    </span>
                  </div>
                </div>
                
                {/* Thread Info */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="outline" className="text-xs bg-blue-50">
                    {thread.deal}
                  </Badge>
                  
                  {thread.topics.slice(0, 2).map(topic => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  
                  {thread.topics.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{thread.topics.length - 2} more
                    </span>
                  )}
                </div>
                
                {/* Participants and Preview */}
                <div className="flex justify-between items-start">
                  <div className="flex -space-x-2 mr-2">
                    {thread.participants.slice(0, 3).map(participant => (
                      <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {thread.participants.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                        +{thread.participants.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground truncate">
                      <span className={`${thread.unreadCount > 0 ? 'font-medium' : ''}`}>
                        {thread.lastSender}:
                      </span>{" "}
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
                
                {/* Unread indicator */}
                {thread.unreadCount > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-primary text-[10px] text-primary-foreground font-medium px-1">
                      {thread.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { mockThreads } from '@/data/mock-communications';

// Types
export type Participant = {
  id: string;
  name: string;
  avatar?: string;
  isAI?: boolean;
};

export type MessageType = {
  id: string;
  senderId: string;
  sender: string;
  content: string;
  timestamp: string;
  isAI?: boolean;
  aiType?: "nitidina" | "paralegal";
};

export type ThreadType = {
  id: string;
  title: string;
  lastMessage: string;
  lastSender: string;
  timestamp: string;
  unreadCount: number;
  deal: string;
  topics: string[];
  priority?: "normal" | "high" | "low";
  participants: Participant[];
  messages: MessageType[];
};

export type CommsFilters = {
  deals: string[];
  topics: string[];
  status: string[];
  search: string;
};

export function useCommsData() {
  const [threads, setThreads] = useState<ThreadType[]>(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || "");
  const [filters, setFilters] = useState<CommsFilters>({
    deals: [],
    topics: [],
    status: [],
    search: "",
  });

  // Function to filter threads based on selected filters
  const filterThreads = (newFilters: Partial<CommsFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Apply filters to threads
    let filtered = [...mockThreads];
    
    // Filter by deal
    if (updatedFilters.deals.length > 0) {
      filtered = filtered.filter(thread => 
        updatedFilters.deals.includes(thread.deal)
      );
    }
    
    // Filter by topic
    if (updatedFilters.topics.length > 0) {
      filtered = filtered.filter(thread => 
        thread.topics.some(topic => updatedFilters.topics.includes(topic))
      );
    }
    
    // Filter by status
    if (updatedFilters.status.length > 0) {
      if (updatedFilters.status.includes('unread')) {
        filtered = filtered.filter(thread => thread.unreadCount > 0);
      }
      if (updatedFilters.status.includes('priority')) {
        filtered = filtered.filter(thread => thread.priority === 'high');
      }
    }
    
    // Filter by search text
    if (updatedFilters.search) {
      const searchLower = updatedFilters.search.toLowerCase();
      filtered = filtered.filter(thread => 
        thread.title.toLowerCase().includes(searchLower) || 
        thread.lastMessage.toLowerCase().includes(searchLower) || 
        thread.messages.some(msg => msg.content.toLowerCase().includes(searchLower))
      );
    }
    
    setThreads(filtered);
    
    // If the active thread is filtered out, select the first available thread
    if (filtered.length > 0 && !filtered.find(t => t.id === activeThreadId)) {
      setActiveThreadId(filtered[0].id);
    }
  };
  
  // Mark a thread as read when selected
  useEffect(() => {
    if (activeThreadId) {
      setThreads(prev => prev.map(thread => 
        thread.id === activeThreadId 
          ? { ...thread, unreadCount: 0 } 
          : thread
      ));
    }
  }, [activeThreadId]);

  return {
    threads,
    activeThreadId,
    setActiveThreadId,
    filterThreads,
    filters,
  };
}

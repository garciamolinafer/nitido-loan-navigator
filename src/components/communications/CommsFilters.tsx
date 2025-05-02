
import { useState } from "react";
import { filterOptions } from "@/data/mock-communications";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CommsFilters as FiltersType } from "@/hooks/useCommsData";
import { Separator } from "@/components/ui/separator";
import { 
  Inbox,
  Star,
  Archive,
  Search,
  Bell,
  MessageSquare,
  Calendar
} from "lucide-react";

interface CommsFiltersProps {
  onFilter: (filters: Partial<FiltersType>) => void;
}

export function CommsFilters({ onFilter }: CommsFiltersProps) {
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  
  const handleDealToggle = (deal: string) => {
    const updatedDeals = selectedDeals.includes(deal)
      ? selectedDeals.filter(d => d !== deal)
      : [...selectedDeals, deal];
    
    setSelectedDeals(updatedDeals);
    onFilter({ deals: updatedDeals });
  };
  
  const handleTopicToggle = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    setSelectedTopics(updatedTopics);
    onFilter({ topics: updatedTopics });
  };
  
  const handleStatusToggle = (status: string) => {
    const updatedStatus = selectedStatus.includes(status)
      ? selectedStatus.filter(s => s !== status)
      : [...selectedStatus, status];
    
    setSelectedStatus(updatedStatus);
    onFilter({ status: updatedStatus });
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onFilter({ search: e.target.value });
  };
  
  return (
    <div className="p-4 h-full overflow-y-auto space-y-6">
      <div className="mb-2">
        <h2 className="text-lg font-semibold mb-2">Communications</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 font-medium">
            <Inbox className="h-4 w-4" />
            <span>Inbox</span>
          </div>
          <Badge variant="secondary">12</Badge>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Starred</span>
          </div>
          <Badge variant="secondary">3</Badge>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </div>
          <Badge variant="secondary">5</Badge>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </div>
        </div>
      </div>

      <Separator />
      
      <div>
        <h3 className="font-semibold mb-2 text-sm">By Deal</h3>
        <div className="space-y-1">
          {filterOptions.deals.map(deal => (
            <div 
              key={deal} 
              className={`flex items-center justify-between px-2 py-2 rounded-md cursor-pointer ${
                selectedDeals.includes(deal) ? 'bg-primary/10' : 'hover:bg-muted'
              }`}
              onClick={() => handleDealToggle(deal)}
            >
              <span className="text-sm">{deal}</span>
              {selectedDeals.includes(deal) && (
                <Badge>Selected</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-2 text-sm">By Topic</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.topics.map(topic => (
            <Badge 
              key={topic} 
              variant={selectedTopics.includes(topic) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTopicToggle(topic)}
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-2 text-sm">Status</h3>
        <div className="space-y-1">
          <div 
            className={`flex items-center px-2 py-2 rounded-md cursor-pointer ${
              selectedStatus.includes('unread') ? 'bg-primary/10' : 'hover:bg-muted'
            }`}
            onClick={() => handleStatusToggle('unread')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm">Unread</span>
          </div>
          <div 
            className={`flex items-center px-2 py-2 rounded-md cursor-pointer ${
              selectedStatus.includes('priority') ? 'bg-primary/10' : 'hover:bg-muted'
            }`}
            onClick={() => handleStatusToggle('priority')}
          >
            <Star className="h-4 w-4 mr-2" />
            <span className="text-sm">High Priority</span>
          </div>
          <div className="flex items-center px-2 py-2 rounded-md cursor-pointer hover:bg-muted">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">This Week</span>
          </div>
        </div>
      </div>
    </div>
  );
}

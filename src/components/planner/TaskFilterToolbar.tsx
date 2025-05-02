
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar as CalendarIcon, ListFilter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface TaskFilterToolbarProps {
  onFilterChange: (filters: {
    search: string;
    dealNames: string[];
    categories: string[];
    statuses: string[];
  }) => void;
  onViewChange: (view: "list" | "calendar") => void;
  currentView: "list" | "calendar";
  deals: { id: string; name: string }[];
}

export function TaskFilterToolbar({ 
  onFilterChange, 
  onViewChange,
  currentView,
  deals
}: TaskFilterToolbarProps) {
  const [search, setSearch] = useState("");
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const categories = [
    "Document", 
    "LoanIQ", 
    "Compliance", 
    "KYC", 
    "Communications", 
    "Versana",
    "IntraLinks",
    "Other"
  ];
  
  const statuses = [
    "Overdue",
    "Due Today",
    "Upcoming",
    "Open",
    "Scheduled",
    "Completed"
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    applyFilters(value, selectedDeals, selectedCategories, selectedStatuses);
  };

  const toggleDeal = (dealName: string) => {
    const newSelectedDeals = selectedDeals.includes(dealName)
      ? selectedDeals.filter(d => d !== dealName)
      : [...selectedDeals, dealName];
    
    setSelectedDeals(newSelectedDeals);
    applyFilters(search, newSelectedDeals, selectedCategories, selectedStatuses);
  };
  
  const toggleCategory = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    applyFilters(search, selectedDeals, newSelectedCategories, selectedStatuses);
  };
  
  const toggleStatus = (status: string) => {
    const newSelectedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    
    setSelectedStatuses(newSelectedStatuses);
    applyFilters(search, selectedDeals, selectedCategories, newSelectedStatuses);
  };

  const applyFilters = (
    search: string, 
    dealNames: string[], 
    categories: string[],
    statuses: string[]
  ) => {
    onFilterChange({
      search,
      dealNames,
      categories,
      statuses
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search tasks..."
          className="pl-9"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Deal</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {deals.map(deal => (
              <DropdownMenuCheckboxItem
                key={deal.id}
                checked={selectedDeals.includes(deal.name)}
                onCheckedChange={() => toggleDeal(deal.name)}
              >
                {deal.name}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map(category => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={currentView === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-none"
            onClick={() => onViewChange("list")}
          >
            <ListFilter className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">List</span>
          </Button>
          <Button
            variant={currentView === "calendar" ? "default" : "ghost"}
            size="sm"
            className="rounded-none"
            onClick={() => onViewChange("calendar")}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Calendar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

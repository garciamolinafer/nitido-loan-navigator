
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationCategory, IntegrationStatus, IntegrationFilters } from "@/types/integration";

interface AppSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: IntegrationFilters;
  setFilter: (key: keyof IntegrationFilters, value: string | null) => void;
  clearFilters: () => void;
}

export function AppSearchBar({ searchTerm, setSearchTerm, activeFilters, setFilter, clearFilters }: AppSearchBarProps) {
  const categories: IntegrationCategory[] = ["document", "communication", "data", "compliance"];
  const statuses: IntegrationStatus[] = ["connected", "disconnected", "action-needed"];
  
  const statusColors = {
    "connected": "success",
    "disconnected": "secondary",
    "action-needed": "warning",
  };

  return (
    <div className="flex flex-col gap-3 w-full sm:max-w-md">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 h-full rounded-l-none"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <select 
          className="h-8 rounded-md border border-input px-3 py-1 text-sm bg-background"
          onChange={(e) => setFilter("category", e.target.value || null)}
          value={activeFilters.category || ""}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select 
          className="h-8 rounded-md border border-input px-3 py-1 text-sm bg-background"
          onChange={(e) => setFilter("status", e.target.value || null)}
          value={activeFilters.status || ""}
        >
          <option value="">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters display */}
      {(activeFilters.category || activeFilters.status) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.category && (
            <Badge variant="outline" className="flex gap-1 items-center">
              Category: {activeFilters.category.charAt(0).toUpperCase() + activeFilters.category.slice(1)}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => setFilter("category", null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {activeFilters.status && (
            <Badge 
              variant={statusColors[activeFilters.status as keyof typeof statusColors] as any} 
              className="flex gap-1 items-center"
            >
              Status: {activeFilters.status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => setFilter("status", null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {(activeFilters.category || activeFilters.status) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="text-xs h-7"
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

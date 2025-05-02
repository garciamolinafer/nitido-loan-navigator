
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { DealStatus, SortConfig } from "@/types/deals";
import { Badge } from "@/components/ui/badge";

type DealsFilterBarProps = {
  onSearch: (query: string) => void;
  searchValue: string;
  onSort: (field: any) => void;
  sortConfig: SortConfig;
  onReset: () => void;
};

const DealsFilterBar = ({ onSearch, searchValue, onSort, sortConfig, onReset }: DealsFilterBarProps) => {
  const isFiltered = !!searchValue;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search deals by name or borrower..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchValue && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1 h-8 w-8" 
            onClick={() => onSearch("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={sortConfig.key as string || ""}
              onValueChange={(value) => onSort(value || null)}
            >
              <DropdownMenuRadioItem value="name">Deal Name</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="amount">Deal Size</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="signedDate">Signed Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="maturityDate">Maturity Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onSort("status")}>Status</DropdownMenuItem>
            <DropdownMenuItem>Deal Type</DropdownMenuItem>
            <DropdownMenuItem>Lead Arranger</DropdownMenuItem>
            <DropdownMenuItem>Geography</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Show All With Flags</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isFiltered && (
          <Button variant="ghost" onClick={onReset}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default DealsFilterBar;

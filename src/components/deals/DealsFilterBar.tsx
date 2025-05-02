
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Filter, Search, ArrowDown, ArrowUp } from "lucide-react";

interface DealsFilterBarProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
  onSort: (field: string) => void;
  currentSort: { field: string; direction: string; };
}

export function DealsFilterBar({ 
  onSearch, 
  onFilterChange, 
  onSort,
  currentSort 
}: DealsFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    status: [],
    type: [],
    region: []
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterSelect = (category: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getSortIcon = (field: string) => {
    if (currentSort.field !== field) return null;
    return currentSort.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-grow max-w-md">
          <form onSubmit={handleSearch} className="flex">
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" variant="secondary" className="rounded-l-none">
              <Search size={18} />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Status
                {activeFilters.status.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.status.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Deal Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Active", "Pending Review", "Monitoring", "Closed"].map(status => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={activeFilters.status.includes(status)}
                  onCheckedChange={() => handleFilterSelect('status', status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Deal Type
                {activeFilters.type.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.type.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Deal Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Project Finance", "Term Loan", "RCF", "Bridge Loan", "Leveraged Loan", "Syndicated Mortgage"].map(type => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={activeFilters.type.includes(type)}
                  onCheckedChange={() => handleFilterSelect('type', type)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Region
                {activeFilters.region.length > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.region.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Region</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["UK", "US", "ES", "DE", "FR", "NL", "PT", "IT", "CY/GR"].map(region => (
                <DropdownMenuCheckboxItem
                  key={region}
                  checked={activeFilters.region.includes(region)}
                  onCheckedChange={() => handleFilterSelect('region', region)}
                >
                  {region}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort Deals</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSort('name')} className="flex justify-between">
                <span>Deal Name</span> {getSortIcon('name')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSort('amount')} className="flex justify-between">
                <span>Amount</span> {getSortIcon('amount')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSort('lenders')} className="flex justify-between">
                <span>Lenders</span> {getSortIcon('lenders')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSort('status')} className="flex justify-between">
                <span>Status</span> {getSortIcon('status')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSort('signedDate')} className="flex justify-between">
                <span>Signed Date</span> {getSortIcon('signedDate')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSort('maturityDate')} className="flex justify-between">
                <span>Maturity Date</span> {getSortIcon('maturityDate')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Active filters display */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(activeFilters).map(([category, values]) => 
          values.map(value => (
            <div 
              key={`${category}-${value}`} 
              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <span className="capitalize">{category}</span>: {value}
              <button 
                onClick={() => handleFilterSelect(category, value)} 
                className="ml-1 hover:text-slate-900"
              >
                <X size={14} />
                <span className="sr-only">Remove filter</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

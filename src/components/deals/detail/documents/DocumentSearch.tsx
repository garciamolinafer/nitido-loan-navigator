import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DocumentCategory, DocumentSearchFilters, CATEGORY_COLORS } from '@/types/documents';
import { Search, Filter, X } from 'lucide-react';

interface DocumentSearchProps {
  onSearch: (filters: DocumentSearchFilters) => void;
}

export const DocumentSearch = ({ onSearch }: DocumentSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<DocumentCategory[]>([]);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      dateRange: dateRange.start && dateRange.end ? {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString()
      } : undefined
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setDateRange({});
    handleSearch();
  };

  const toggleCategory = (category: DocumentCategory) => {
    setSelectedCategories(current => 
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  const categories: { id: DocumentCategory; label: string }[] = [
    { id: 'loan_agreement', label: 'Loan Agreement' },
    { id: 'securities', label: 'Securities' },
    { id: 'other_agreements', label: 'Other Agreements' },
    { id: 'financials', label: 'Financials' },
    { id: 'technical', label: 'Technical' },
    { id: 'legal', label: 'Legal' },
    { id: 'aml', label: 'AML' },
    { id: 'others', label: 'Others' }
  ];

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch();
          }}
          className="pl-9"
        />
      </div>

      <Popover open={showFilters} onOpenChange={setShowFilters}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className={showFilters ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label
                      htmlFor={category.id}
                      className="text-sm flex items-center gap-1.5"
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[category.id] }}
                      />
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Calendar
                  mode="single"
                  selected={dateRange.start}
                  onSelect={(date) => 
                    setDateRange(current => ({ ...current, start: date || undefined }))
                  }
                  disabled={(date) =>
                    date > new Date() || (dateRange.end ? date > dateRange.end : false)
                  }
                />
                <Calendar
                  mode="single"
                  selected={dateRange.end}
                  onSelect={(date) =>
                    setDateRange(current => ({ ...current, end: date || undefined }))
                  }
                  disabled={(date) =>
                    date > new Date() || (dateRange.start ? date < dateRange.start : false)
                  }
                />
              </div>
            </div>

            {/* Apply Filters */}
            <Button className="w-full" onClick={() => {
              handleSearch();
              setShowFilters(false);
            }}>
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || dateRange.start || dateRange.end) && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="gap-1"
            >
              {category.replace('_', ' ')}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {dateRange.start && dateRange.end && (
            <Badge variant="secondary" className="gap-1">
              {`${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setDateRange({})}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}; 
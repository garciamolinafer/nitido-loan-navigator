
import { Link } from "react-router-dom";
import { Deal } from "@/hooks/useDealData"; 
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";

interface DealsTableProps {
  deals: Deal[];
  currentSort: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onSort: (field: string) => void;
}

export function DealsTable({ deals, onSort, currentSort }: DealsTableProps) {
  const renderSortIcon = (field: string) => {
    if (currentSort.field === field) {
      return currentSort.direction === 'asc' ? 
        <ArrowUp className="h-3 w-3 ml-1" /> : 
        <ArrowDown className="h-3 w-3 ml-1" />;
    }
    return null;
  };

  const renderSortableHeader = (field: string, label: string) => (
    <div 
      className="flex items-center cursor-pointer hover:text-gray-900" 
      onClick={() => onSort(field)}
    >
      {label}
      {renderSortIcon(field)}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'pending review': return 'bg-amber-500';
      case 'monitoring': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{renderSortableHeader('name', 'Deal Name')}</TableHead>
            <TableHead className="hidden md:table-cell">
              {renderSortableHeader('type', 'Type')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('amount', 'Amount')}
            </TableHead>
            <TableHead className="hidden md:table-cell">
              {renderSortableHeader('lead', 'Lead Arranger')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('status', 'Status')}
            </TableHead>
            <TableHead>
              <span>Flags</span>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                No deals found
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal) => (
              <TableRow key={deal.id} className="hover:bg-muted/30">
                <TableCell>
                  <Link to={`/deals/${deal.id}`} className="font-medium text-blue-600 hover:underline">
                    {deal.name}
                  </Link>
                  <div className="text-xs text-muted-foreground md:hidden">
                    {deal.type} • {deal.lead}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{deal.type}</TableCell>
                <TableCell>{deal.amount}</TableCell>
                <TableCell className="hidden md:table-cell">{deal.lead}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(deal.status)}`} />
                    <span>{deal.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {deal.flag && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{deal.flag}</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/deals/${deal.id}`}
                    className="p-2 rounded-full hover:bg-muted flex items-center justify-center"
                    title="View Deal Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

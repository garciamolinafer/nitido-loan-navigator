
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp, ArrowDown, Users } from "lucide-react";
import { Deal } from "@/hooks/useDealData";
import { Link } from "react-router-dom";

interface DealsTableProps {
  deals: Deal[];
  onSort: (field: string) => void;
  currentSort: { field: string; direction: string; };
}

export function DealsTable({ deals, onSort, currentSort }: DealsTableProps) {
  const getSortIcon = (field: string) => {
    if (currentSort.field !== field) return null;
    return currentSort.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const renderSortableHeader = (field: string, label: string) => (
    <div 
      className="flex items-center cursor-pointer hover:text-primary"
      onClick={() => onSort(field)}
    >
      {label}
      <span className="ml-1 flex items-center h-4 w-4">
        {getSortIcon(field)}
      </span>
    </div>
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return "bg-green-100 text-green-800";
      case 'Pending Review':
        return "bg-amber-100 text-amber-800";
      case 'Monitoring':
        return "bg-blue-100 text-blue-800";
      case 'Closed':
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFlagBadgeClass = (type: string) => {
    switch (type) {
      case 'error':
        return "bg-red-100 text-red-800";
      case 'warning':
        return "bg-amber-100 text-amber-800";
      case 'info':
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              {renderSortableHeader('name', 'Deal Name & Borrower')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('type', 'Deal Type')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('amount', 'Amount')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('lenders', 'Lenders')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('region', 'Region')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('leadArranger', 'Lead Arranger')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('signedDate', 'Signed Date')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('maturityDate', 'Maturity')}
            </TableHead>
            <TableHead>
              {renderSortableHeader('status', 'Status')}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
                No deals found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal) => (
              <TableRow key={deal.id} className="group">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <Link to="#" className="hover:text-primary hover:underline">
                      {deal.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">{deal.description}</span>
                  </div>
                </TableCell>
                <TableCell>{deal.type}</TableCell>
                <TableCell>{deal.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {deal.lenders}
                  </div>
                </TableCell>
                <TableCell>{deal.region}</TableCell>
                <TableCell>{deal.leadArranger}</TableCell>
                <TableCell>{deal.signedDate}</TableCell>
                <TableCell>{deal.maturityDate}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium inline-block w-fit ${getStatusBadgeClass(deal.status)}`}>
                      {deal.status}
                    </span>
                    
                    {deal.flag && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium inline-block w-fit ${getFlagBadgeClass(deal.flag.type)}`}>
                        {deal.flag.message}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                    <ArrowRight size={16} />
                    <span className="sr-only">View deal details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

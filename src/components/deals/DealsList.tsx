
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Deal } from "@/types/deals";
import DealStatusBadge from "./DealStatusBadge";
import DealFlagBadge from "./DealFlagBadge";
import { Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type DealsListProps = {
  deals: Deal[];
}

const DealsList = ({ deals }: DealsListProps) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Deal Name</TableHead>
            <TableHead>Structure</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Lead Arranger</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No deals found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium flex gap-2 items-center">
                      {deal.name}
                      {deal.flag && <DealFlagBadge flag={deal.flag} />}
                    </div>
                    <div className="text-muted-foreground text-sm flex items-center gap-1">
                      <span>{deal.region}</span> • 
                      <Users className="h-3 w-3 ml-1" />
                      <span>{deal.lenders} lenders</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {deal.type}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{deal.amount}</TableCell>
                <TableCell>{deal.leadArranger}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="text-sm">Signed: {deal.signedDate}</div>
                    <div className="text-sm">Maturity: {deal.maturityDate}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <DealStatusBadge status={deal.status} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/deals/${deal.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DealsList;

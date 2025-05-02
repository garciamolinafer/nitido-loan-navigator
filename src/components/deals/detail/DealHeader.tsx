
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DealHeaderProps {
  deal: {
    name: string;
    amount: string;
    status: string;
    borrower: string;
    agent: string;
  };
}

const DealHeader = ({ deal }: DealHeaderProps) => {
  return (
    <div className="mb-6">
      <Link to="/deals">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Deals
        </Button>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {deal.name}
            <span className="text-lg sm:text-xl text-muted-foreground ml-2">
              – {deal.amount} – {deal.status}
            </span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Borrower: {deal.borrower}; Agent Bank: {deal.agent}; 
          Last Updated: Apr 15, 2025
        </p>
        {/* Integration indicators */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-muted-foreground">Connected Systems:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="LoanIQ for loan servicing data">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              LoanIQ
            </div>
            <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="FinScan for AML/KYC screening">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              FinScan
            </div>
            <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="Intralinks for document vault/VDR">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              Intralinks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealHeader;

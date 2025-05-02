
import { LoanAdminSummary } from "./LoanAdminSummary";
import { LoanAdminPayments } from "./LoanAdminPayments";
import { LoanAdminHistory } from "./LoanAdminHistory";
import { LoanAdminAssistant } from "./LoanAdminAssistant";

interface LoanAdminTabProps {
  deal: {
    amount: string;
    signedDate: string;
    maturityDate: string;
    interestRate: string;
    currentRate: string;
    timeRemaining: string;
  };
}

export const LoanAdminTab = ({ deal }: LoanAdminTabProps) => {
  return (
    <div className="space-y-8">
      {/* Financial Summary Cards */}
      <LoanAdminSummary deal={deal} />
      
      {/* Payment Schedule */}
      <LoanAdminPayments />
      
      {/* Transaction History */}
      <LoanAdminHistory />
      
      {/* Loan Admin Assistant */}
      <LoanAdminAssistant />
      
      <div className="text-sm text-muted-foreground mt-8 flex items-center">
        <div className="flex items-center gap-2 text-xs">
          <span>Data sourced from:</span>
          <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="LoanIQ for loan servicing data">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            LoanIQ
          </div>
          <span className="text-xs">Updated: May 1, 2025</span>
        </div>
      </div>
    </div>
  );
};

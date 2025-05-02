
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowDown, 
  ArrowUp,
  Calendar,
  CalendarCheck, 
  Clock, 
  DollarSign
} from "lucide-react";

interface LoanAdminSummaryProps {
  deal: {
    amount: string;
    signedDate: string;
    maturityDate: string;
    interestRate: string;
    currentRate: string;
    timeRemaining: string;
  };
}

export const LoanAdminSummary = ({ deal }: LoanAdminSummaryProps) => {
  // This would come from the API in a real application
  const financialData = {
    totalCommitment: deal.amount,
    outstandingPrincipal: deal.amount, // Assuming fully drawn
    undrawnAvailability: "$0", // Assuming fully drawn
    nextPaymentDue: "June 30, 2025",
    nextPaymentAmount: "$500,000",
    interestRateBase: "LIBOR 4.25%",
    interestRateMargin: "2.50%",
    interestRateTotal: "6.75%",
    nextRateReset: "June 30, 2025",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Loan Balance</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Commitment:</span>
                <span className="font-medium">{financialData.totalCommitment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Outstanding Principal:</span>
                <span className="font-medium">{financialData.outstandingPrincipal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Undrawn Availability:</span>
                <span className="font-medium">{financialData.undrawnAvailability}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Next Payment</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{financialData.nextPaymentDue}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{financialData.nextPaymentAmount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <span className="font-medium">Interest Payment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Interest Rate</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base Rate:</span>
                <span className="font-medium">{financialData.interestRateBase}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Margin:</span>
                <span className="font-medium">{financialData.interestRateMargin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Rate:</span>
                <span className="font-medium">{financialData.interestRateTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Reset:</span>
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-medium">{financialData.nextRateReset}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

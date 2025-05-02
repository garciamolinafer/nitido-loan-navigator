
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DealSummaryProps {
  deal: {
    id: string;
    name: string;
    amount: string;
    type: string;
    status: string;
    borrower: string;
    country: string;
    agent: string;
    lendersCount: number;
    signedDate: string;
    maturityDate: string;
    timeRemaining: string;
    interestRate: string;
    currentRate: string;
    guarantor: string;
    coverImageUrl?: string;
  };
}

const DealSummary = ({ deal }: DealSummaryProps) => {
  // Sample recent activity entries
  const recentActivity = [
    {
      id: "1",
      date: "Apr 15, 2025",
      description: "Borrower submitted Q1 2025 Financial Statements",
      type: "document",
      link: "/documents"
    },
    {
      id: "2",
      date: "Apr 1, 2025",
      description: "Interest Payment of $500,000 received from Borrower (on time)",
      type: "payment",
      link: "/loanAdmin"
    },
    {
      id: "3",
      date: "Mar 20, 2025",
      description: "Amendment No.1 executed (increased facility by $5M; all lenders signed)",
      type: "amendment",
      link: "/documents"
    },
    {
      id: "4",
      date: "Mar 1, 2025",
      description: "Covenant testing completed for Q4 2024: Net Leverage 3.8× (Breach), DSCR 1.35× (Compliant)",
      type: "covenant",
      link: "/covenants",
      hasIssue: true
    },
    {
      id: "5",
      date: "Feb 10, 2025",
      description: "New lender Delta Bank joined the syndicate (transferred $5M commitment)",
      type: "participant",
      link: "/contacts"
    },
    {
      id: "6",
      date: "Jan 30, 2025",
      description: "KYC checks completed for Delta Bank (no issues found via FinScan)",
      type: "kyc",
      link: "/kyc"
    },
    {
      id: "7",
      date: "Jan 15, 2025",
      description: "First Utilization: Borrower drew $50M (initial funding of term loan)",
      type: "payment",
      link: "/loanAdmin"
    },
    {
      id: "8",
      date: "Jan 5, 2025",
      description: "Deal Active – Credit Agreement signed and transaction closed",
      type: "status",
      link: "/documents"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key deal parameters grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Deal Information</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="text-muted-foreground">Facility Amount:</div>
              <div>{deal.amount} ({deal.type})</div>
              
              <div className="text-muted-foreground">Interest Rate:</div>
              <div>{deal.interestRate} ({deal.currentRate})</div>
              
              <div className="text-muted-foreground">Maturity Date:</div>
              <div>{deal.maturityDate} ({deal.timeRemaining})</div>
              
              <div className="text-muted-foreground">Status:</div>
              <div>{deal.status} (Funded {deal.signedDate})</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Participants</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="text-muted-foreground">Borrower:</div>
              <div>{deal.borrower} ({deal.country})</div>
              
              <div className="text-muted-foreground">Guarantor:</div>
              <div>{deal.guarantor}</div>
              
              <div className="text-muted-foreground">Agent Bank:</div>
              <div>{deal.agent} (Facility Agent)</div>
              
              <div className="text-muted-foreground">Lenders:</div>
              <div>{deal.lendersCount} participating banks</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status summaries */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Covenant summary */}
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm">Covenants</h3>
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link to={`/deals/${deal.id}/covenants`}>View details</Link>
                </Button>
              </div>
              <div className="flex items-center bg-red-50 text-red-800 p-2 rounded-md text-sm mt-2">
                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                <p>5/6 Covenants in Compliance (1 Breach)</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Open tasks summary */}
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm">Open Tasks</h3>
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link to={`/deals/${deal.id}/tasks`}>View all tasks</Link>
                </Button>
              </div>
              <div className="text-sm mt-2">
                <p>2 tasks due soon:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Prepare waiver for covenant breach (due May 5)</li>
                  <li>Submit KYC for Delta Bank (due May 10)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent activity timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Recent Events</h3>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
            >
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${
                  activity.hasIssue ? 'bg-red-500' : 
                  idx === 0 ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                {idx < recentActivity.length - 1 && (
                  <div className="w-0.5 bg-gray-200 h-full mt-1"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="font-medium text-sm">{activity.description}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
                </div>
                <div className="flex mt-1">
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
                    <Link to={activity.link}>View details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealSummary;

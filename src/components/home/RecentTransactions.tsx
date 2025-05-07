import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, Book, User, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { dealData } from "@/data/deals";

const getRole = (index: number) => {
  if (index === 0) return "Agent";
  if (index === 1) return "Lender";
  if (index === 2) return "MLA";
  return "Lender";
};

const getAlerts = (deal: any) => {
  const alerts = [];
  if (deal.flag) {
    const msg = deal.flag.message.toLowerCase();
    if (msg.includes("kyc")) {
      alerts.push({ type: "kyc", label: "Missing KYC", icon: User, color: "bg-red-500" });
    }
    if (msg.includes("document")) {
      alerts.push({ type: "document", label: "Pending Document", icon: FileText, color: "bg-orange-400" });
    }
    if (msg.includes("covenant")) {
      alerts.push({ type: "covenant", label: "Overdue Covenant", icon: Book, color: "bg-red-500" });
    }
    if (msg.includes("message")) {
      alerts.push({ type: "message", label: "Pending Message", icon: Mail, color: "bg-orange-400" });
    }
    if (msg.includes("task")) {
      alerts.push({ type: "task", label: "Open Tasks", icon: Clock, color: "bg-orange-400" });
    }
  }
  return alerts;
};

export function RecentTransactions() {
  const transactions = dealData.slice(0, 4);
  return (
    <Card className="mt-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          {transactions.length === 0 ? (
            <div className="text-muted-foreground text-sm">No recent transactions to display.</div>
          ) : (
            transactions.map((tx, idx) => {
              const alerts = getAlerts(tx);
              return (
                <Link
                  to={`/deals/${tx.id}`}
                  key={tx.id}
                  className="w-56 block border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex-shrink-0"
                >
                  <div className="font-semibold text-base mb-1">{tx.name}</div>
                  <div className="text-primary font-bold text-sm mb-2">{tx.amount}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-700 bg-gray-50">{getRole(idx)}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    {alerts.map(alert => (
                      <div key={alert.type} className="flex items-center gap-2 text-xs" style={{ fontSize: "0.8rem" }}>
                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${alert.color}`}>
                          <alert.icon className="h-3.5 w-3.5 text-white" />
                        </span>
                        <span className="text-gray-700">{alert.label}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
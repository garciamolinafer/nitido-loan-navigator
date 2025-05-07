import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, UserX } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      text: "You received 3 new covenant updates.",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      time: "today",
      link: "/deals",
    },
    {
      id: 2,
      text: "2 tasks are overdue since yesterday.",
      icon: Clock,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      time: "yesterday",
      link: "/planner",
    },
    {
      id: 3,
      text: "Lender ABC posted a comment on Project Titan.",
      icon: MessageSquare,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      time: "today",
      link: "/communications",
    },
  ];

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: "1",
      name: "Apollo Energy Drawdown",
      amount: "$5,000,000",
      role: "Agent",
      hasPendingTasks: true,
      hasPendingMessages: false,
      hasOverdueCovenants: true,
      hasMissingKyc: false,
    },
    {
      id: "2",
      name: "Project Titan Repayment",
      amount: "$2,500,000",
      role: "Lender",
      hasPendingTasks: false,
      hasPendingMessages: true,
      hasOverdueCovenants: false,
      hasMissingKyc: true,
    },
    {
      id: "3",
      name: "Solaris Bridge Loan",
      amount: "$1,200,000",
      role: "MLA",
      hasPendingTasks: false,
      hasPendingMessages: false,
      hasOverdueCovenants: false,
      hasMissingKyc: false,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${activity.iconBg} ${activity.iconColor}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{activity.text}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <Link to={activity.link} className="text-xs text-blue-600 hover:underline">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

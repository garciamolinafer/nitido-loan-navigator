
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck } from "lucide-react";

export const LoanAdminPayments = () => {
  // This would come from the API in a real application
  const scheduledPayments = [
    {
      id: "1",
      date: "June 30, 2025",
      type: "Interest Payment",
      amount: "$500,000",
      status: "Scheduled"
    },
    {
      id: "2",
      date: "December 31, 2025",
      type: "Principal Repayment",
      amount: "$5,000,000",
      status: "Scheduled"
    },
    {
      id: "3",
      date: "December 31, 2025",
      type: "Interest Payment",
      amount: "$450,000",
      status: "Scheduled"
    },
    {
      id: "4",
      date: "March 31, 2025",
      type: "Interest Payment",
      amount: "$480,000",
      status: "Paid"
    },
    {
      id: "5",
      date: "January 1, 2025",
      type: "Initial Funding Interest",
      amount: "$75,000",
      status: "Paid"
    }
  ];

  // Separate upcoming and past payments
  const upcomingPayments = scheduledPayments.filter(payment => payment.status === "Scheduled");
  const pastPayments = scheduledPayments.filter(payment => payment.status === "Paid");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Upcoming Payments</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingPayments.map(payment => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    {payment.date}
                  </div>
                </TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell className="text-right font-medium">{payment.amount}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastPayments.map(payment => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell className="text-right font-medium">{payment.amount}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

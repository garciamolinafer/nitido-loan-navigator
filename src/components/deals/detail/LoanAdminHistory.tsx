
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, DollarSign, Clock } from "lucide-react";

export const LoanAdminHistory = () => {
  // This would come from the API in a real application
  const transactions = [
    {
      id: "1",
      date: "April 15, 2025",
      type: "Fee Payment",
      amount: "$50,000",
      description: "Borrower paid administrative agency fee."
    },
    {
      id: "2",
      date: "March 31, 2025",
      type: "LIBOR Reset",
      amount: "",
      description: "New Rate: 4.0% - LIBOR updated for next quarter."
    },
    {
      id: "3",
      date: "March 31, 2025",
      type: "Interest Payment",
      amount: "$480,000",
      description: "Received from Borrower (covering Jan-Mar period)."
    },
    {
      id: "4",
      date: "January 15, 2025",
      type: "Drawdown",
      amount: "$50,000,000",
      description: "Borrower drew full term loan amount on closing date."
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case "Drawdown":
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case "Interest Payment":
      case "Fee Payment":
        return <ArrowUp className="h-4 w-4 text-red-600" />;
      case "LIBOR Reset":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Transaction History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getTransactionIcon(transaction.type)}
                  <span className="ml-2">{transaction.type}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
              <TableCell>{transaction.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

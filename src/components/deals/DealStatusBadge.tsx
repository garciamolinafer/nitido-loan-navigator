
import { Badge } from "@/components/ui/badge";
import { DealStatus } from "@/types/deals";

type DealStatusBadgeProps = {
  status: DealStatus;
};

const DealStatusBadge = ({ status }: DealStatusBadgeProps) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Pending Review":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
    case "Monitoring":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    case "Closed":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default DealStatusBadge;

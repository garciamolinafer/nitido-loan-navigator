
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types/deals";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DealFlagBadgeProps = {
  flag: NonNullable<Deal['flag']>;
};

const DealFlagBadge = ({ flag }: DealFlagBadgeProps) => {
  const getIcon = () => {
    switch (flag.type) {
      case "error":
        return <AlertCircle className="h-3 w-3" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3" />;
      case "info":
        return <Info className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (flag.type) {
      case "error":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`flex gap-1 items-center cursor-help ${getColor()}`}>
            {getIcon()}
            {flag.message}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{flag.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DealFlagBadge;

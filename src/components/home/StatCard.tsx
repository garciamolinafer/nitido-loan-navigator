
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  linkTo: string;
  variant?: "default" | "warning" | "danger";
}

export function StatCard({ 
  title, 
  count, 
  icon: Icon, 
  linkTo,
  variant = "default" 
}: StatCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-amber-50 border-amber-200 hover:bg-amber-100";
      case "danger":
        return "bg-red-50 border-red-200 hover:bg-red-100";
      default:
        return "bg-white hover:bg-slate-50";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-amber-100 text-amber-600";
      case "danger":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <Link to={linkTo}>
      <Card className={`border transition-colors ${getVariantClasses()}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-600">{title}</h3>
              <p className="text-3xl font-bold mt-1">{count}</p>
            </div>
            <div className={`rounded-full p-3 ${getIconClasses()}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

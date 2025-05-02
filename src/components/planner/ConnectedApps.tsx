
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ConnectedApps() {
  const apps = [
    { name: "LoanIQ", logo: "🏦", color: "bg-blue-100" },
    { name: "FinScan", logo: "🔍", color: "bg-purple-100" },
    { name: "IntraLinks", logo: "📁", color: "bg-green-100" },
    { name: "Versana", logo: "📊", color: "bg-amber-100" },
  ];

  return (
    <div className="bg-white border rounded-lg p-3 flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Connected Apps:</span>
      <div className="flex gap-2">
        <TooltipProvider>
          {apps.map((app) => (
            <Tooltip key={app.name}>
              <TooltipTrigger asChild>
                <div className={`${app.color} w-8 h-8 rounded-md flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-primary transition-all`}>
                  <span className="text-lg">{app.logo}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{app.name} Connected</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="ml-auto">
        <span className="text-xs text-green-600 font-medium flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          All systems online
        </span>
      </div>
    </div>
  );
}

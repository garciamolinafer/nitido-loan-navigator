
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ConnectedApp {
  name: string;
  logoSrc: string;
  status: "connected" | "syncing" | "error";
}

interface ConnectedAppsProps {
  apps: ConnectedApp[];
}

export function ConnectedApps({ apps }: ConnectedAppsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-muted-foreground">Connected Apps:</div>
      <div className="flex items-center gap-2">
        {apps.map((app) => (
          <Tooltip key={app.name}>
            <TooltipTrigger asChild>
              <div className="relative">
                <img 
                  src={app.logoSrc} 
                  alt={app.name} 
                  className="h-6 w-6 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
                <div 
                  className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                    app.status === "connected" ? "bg-green-500" :
                    app.status === "syncing" ? "bg-blue-500 animate-pulse" :
                    "bg-red-500"
                  }`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs">
                <p className="font-medium">{app.name}</p>
                <p className="capitalize">Status: {app.status}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

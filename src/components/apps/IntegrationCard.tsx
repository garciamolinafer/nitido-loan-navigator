
import { Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Integration } from "@/types/integration";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface IntegrationCardProps {
  integration: Integration;
  isExpanded: boolean;
  onClick: () => void;
}

export function IntegrationCard({ integration, isExpanded, onClick }: IntegrationCardProps) {
  const { toast } = useToast();

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would connect to the integration here
    toast({
      title: "Connecting to " + integration.name,
      description: "Please wait while we establish the connection...",
    });
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would open configuration modal
    toast({
      title: "Configure " + integration.name,
      description: "Opening configuration settings...",
    });
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would disconnect from the integration here
    toast({
      title: "Disconnect " + integration.name,
      description: "Are you sure you want to disconnect?",
    });
  };

  const getStatusColor = () => {
    switch (integration.status) {
      case "connected": return "success";
      case "disconnected": return "secondary";
      case "action-needed": return "warning";
      default: return "secondary";
    }
  };

  const getStatusText = () => {
    switch (integration.status) {
      case "connected": return "Connected";
      case "disconnected": return "Disconnected";
      case "action-needed": return "Action Needed";
      default: return "Unknown";
    }
  };

  const formatSyncTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer",
        isExpanded ? "border-primary shadow-lg" : "hover:shadow-md hover:-translate-y-1"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2 space-y-1 flex flex-row justify-between items-start">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary-foreground rounded-md flex items-center justify-center mr-3">
            {integration.icon && 
              <integration.icon className="h-5 w-5 text-primary" />
            }
          </div>
          <div>
            <h3 className="font-medium">{integration.name}</h3>
            <p className="text-xs text-muted-foreground">{integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}</p>
          </div>
        </div>
        <Badge variant={getStatusColor() as any} className="ml-auto">
          {integration.status === "connected" && <Check className="h-3 w-3 mr-1" />}
          {integration.status === "action-needed" && <AlertTriangle className="h-3 w-3 mr-1" />}
          {getStatusText()}
        </Badge>
      </CardHeader>

      <CardContent className="pt-2">
        <p className="text-sm">{integration.description}</p>
        
        <div className="mt-4 space-y-1">
          {integration.capabilities && integration.capabilities.map((capability, idx) => (
            <div key={idx} className="flex items-start text-xs">
              <span className="text-primary mr-2">•</span>
              <span>{capability}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch pt-4 space-y-4">
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-muted-foreground">
            {integration.status === "connected" && integration.lastSync && (
              <>Last synced: {formatSyncTime(integration.lastSync)}</>
            )}
            {integration.status === "disconnected" && (
              <>Not connected</>
            )}
            {integration.status === "action-needed" && (
              <>Attention required</>
            )}
          </p>
          
          <div className="flex justify-end gap-2">
            {integration.status === "disconnected" && (
              <Button size="sm" onClick={handleConnect}>Connect</Button>
            )}
            
            {integration.status === "connected" && (
              <>
                <Button size="sm" variant="outline" onClick={handleDisconnect}>Disconnect</Button>
                <Button size="sm" onClick={handleConfigure}>Configure</Button>
              </>
            )}
            
            {integration.status === "action-needed" && (
              // Changed "warning" to "destructive" as warning is not a valid variant
              <Button size="sm" variant="destructive" onClick={handleConfigure}>Fix Issue</Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

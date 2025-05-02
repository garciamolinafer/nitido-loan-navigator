
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCoworker } from "@/hooks/useCoworker";
import { Badge } from "@/components/ui/badge";

interface CoworkerHeaderProps {
  activeView: "builder" | "dashboard";
  onViewChange: (view: "builder" | "dashboard") => void;
}

export function CoworkerHeader({ activeView, onViewChange }: CoworkerHeaderProps) {
  const { approvals } = useCoworker();
  
  return (
    <div className="p-4 bg-white border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Coworker Hub</h1>
        <p className="text-muted-foreground text-sm">AI-powered workflow automation</p>
      </div>
      
      <div className="flex items-center gap-4">
        {approvals.length > 0 && (
          <Badge variant="destructive" className="px-2 py-1">
            {approvals.length} Approval{approvals.length > 1 ? 's' : ''} Pending
          </Badge>
        )}
        
        <Tabs value={activeView} onValueChange={(v) => onViewChange(v as "builder" | "dashboard")}>
          <TabsList>
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}


import { CoworkerChat } from "./CoworkerChat";
import { CoworkerWorkflowBuilder } from "./CoworkerWorkflowBuilder";
import { CoworkerDashboard } from "./CoworkerDashboard";
import { Separator } from "@/components/ui/separator";

interface CoworkerWorkflowPanelProps {
  activeView: "builder" | "dashboard";
}

export function CoworkerWorkflowPanel({ activeView }: CoworkerWorkflowPanelProps) {
  if (activeView === "dashboard") {
    return <CoworkerDashboard />;
  }
  
  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 border-r h-[350px] md:h-full">
        <CoworkerChat />
      </div>
      <div className="w-full md:w-1/2 overflow-auto">
        <CoworkerWorkflowBuilder />
      </div>
    </div>
  );
}

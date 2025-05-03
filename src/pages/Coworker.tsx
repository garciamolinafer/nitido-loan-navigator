
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { CoworkerHeader } from "@/components/coworker/CoworkerHeader";
import { CoworkerWorkflowPanel } from "@/components/coworker/CoworkerWorkflowPanel";
import { CoworkerSidebar } from "@/components/coworker/CoworkerSidebar";
import { CoworkerProvider } from "@/hooks/useCoworker";

const Coworker = () => {
  const [activeView, setActiveView] = useState<"builder" | "dashboard">("builder");
  
  return (
    <Layout title="Coworker (Nítido Hub)">
      <CoworkerProvider>
        <div className="flex h-[calc(100vh-120px)] overflow-hidden">
          <CoworkerSidebar />
          <div className="flex-1 flex flex-col">
            <CoworkerHeader 
              activeView={activeView} 
              onViewChange={setActiveView} 
            />
            <CoworkerWorkflowPanel activeView={activeView} />
          </div>
        </div>
      </CoworkerProvider>
    </Layout>
  );
};

export default Coworker;

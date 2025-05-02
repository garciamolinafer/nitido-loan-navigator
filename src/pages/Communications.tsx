
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { CommsList } from "@/components/communications/CommsList";
import { ConversationView } from "@/components/communications/ConversationView";
import { CommsFilters } from "@/components/communications/CommsFilters";
import { useCommsData } from "@/hooks/useCommsData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, Menu } from "lucide-react";

const Communications = () => {
  const { threads, activeThreadId, setActiveThreadId, filterThreads } = useCommsData();
  const [mobileView, setMobileView] = useState<"list" | "conversation">("list");
  
  // Get the active thread from the thread list
  const activeThread = threads.find(thread => thread.id === activeThreadId);
  
  // Function to handle thread selection
  const handleSelectThread = (id: string) => {
    setActiveThreadId(id);
    setMobileView("conversation"); // On mobile, switch to conversation view
  };
  
  return (
    <Layout title="Communications">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex h-[calc(100vh-140px)] min-h-[500px] overflow-hidden rounded-lg border">
          {/* Sidebar/Filters - Hidden on mobile, visible in sheet */}
          <div className="hidden md:block w-64 border-r bg-muted/30">
            <CommsFilters onFilter={filterThreads} />
          </div>
          
          {/* Mobile Filters Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="absolute left-4 top-4 z-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <CommsFilters onFilter={filterThreads} />
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Thread List - Conditionally shown on mobile */}
          <div className={`${mobileView === "conversation" ? "hidden" : "block"} md:block md:w-1/3 border-r`}>
            <CommsList 
              threads={threads} 
              activeThreadId={activeThreadId} 
              onSelectThread={handleSelectThread} 
            />
          </div>
          
          {/* Mobile Menu Toggle */}
          {mobileView === "conversation" && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-4 md:hidden z-10"
              onClick={() => setMobileView("list")}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          
          {/* Conversation View - Conditionally shown on mobile */}
          <div className={`${mobileView === "list" ? "hidden" : "block"} md:block flex-1`}>
            <ConversationView thread={activeThread} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Communications;

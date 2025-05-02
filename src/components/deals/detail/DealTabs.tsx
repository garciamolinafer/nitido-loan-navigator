
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

interface DealTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DealTabs = ({ activeTab, onTabChange }: DealTabsProps) => {
  return (
    <div className="border-b">
      <TabsList className="bg-transparent h-auto p-0">
        <TabsTrigger 
          value="summary" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Summary
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="tasks" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Tasks
        </TabsTrigger>
        <TabsTrigger 
          value="covenants" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          <div className="flex items-center gap-1.5">
            Covenants
            <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-red-500 text-[10px] text-white font-medium px-1">
              1
            </span>
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="loanAdmin" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Loan Admin
        </TabsTrigger>
        <TabsTrigger 
          value="contacts" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Contacts
        </TabsTrigger>
        <TabsTrigger 
          value="communications" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Communications
        </TabsTrigger>
        <TabsTrigger 
          value="kyc" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          KYC/AML
        </TabsTrigger>
        <TabsTrigger 
          value="aiChat" 
          className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          <div className="flex items-center gap-1">
            AI Chat
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default DealTabs;

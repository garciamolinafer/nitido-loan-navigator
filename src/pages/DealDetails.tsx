
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { mockDeal } from "@/data/mock-deal";
import DealHeader from "@/components/deals/detail/DealHeader";
import DealTabs from "@/components/deals/detail/DealTabs";
import DealSummary from "@/components/deals/detail/DealSummary";
import { LoanAdminTab } from "@/components/deals/detail/LoanAdminTab";
import { CommunicationsTab } from "@/components/deals/detail/CommunicationsTab";
import DocumentsTab from "@/components/deals/detail/DocumentsTab";
import TasksTab from "@/components/deals/detail/TasksTab";
import CovenantsTab from "@/components/deals/detail/CovenantsTab";
import ContactsTab from "@/components/deals/detail/ContactsTab";
import KycAmlTab from "@/components/deals/detail/KycAmlTab";
import AiChatTab from "@/components/deals/detail/AiChatTab";

const DealDetails = () => {
  const { dealId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("summary");

  // Handle hash changes to switch tabs
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ["summary", "documents", "tasks", "covenants", "loanAdmin", "contacts", "communications", "kyc", "aiChat"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Use dealId to fetch the deal data, or fall back to mock data
  const deal = {
    ...mockDeal,
    id: dealId || mockDeal.id,
  };

  return (
    <Layout title={deal.name}>
      <div className="max-w-7xl mx-auto">
        {/* Deal header with key info */}
        <DealHeader deal={deal} />

        {/* Tab navigation */}
        <Tabs 
          defaultValue="summary" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <DealTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab content */}
          <TabsContent value="summary" className="space-y-4 pt-2">
            <DealSummary deal={deal} />
          </TabsContent>
          
          <TabsContent value="documents" className="pt-2">
            <DocumentsTab />
          </TabsContent>
          
          <TabsContent value="tasks" className="pt-2">
            <TasksTab />
          </TabsContent>
          
          <TabsContent value="covenants" className="pt-2">
            <CovenantsTab />
          </TabsContent>
          
          <TabsContent value="loanAdmin" className="pt-2">
            <LoanAdminTab deal={deal} />
          </TabsContent>
          
          <TabsContent value="contacts" className="pt-2">
            <ContactsTab />
          </TabsContent>
          
          <TabsContent value="communications" className="pt-2">
            <CommunicationsTab />
          </TabsContent>
          
          <TabsContent value="kyc" className="pt-2">
            <KycAmlTab />
          </TabsContent>
          
          <TabsContent value="aiChat" className="pt-2">
            <AiChatTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DealDetails;

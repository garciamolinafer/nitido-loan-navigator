
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import DealSummary from "@/components/deals/detail/DealSummary";
import { Button } from "@/components/ui/button";

const DealDetails = () => {
  const { dealId } = useParams();
  const [activeTab, setActiveTab] = useState("summary");

  // Mock deal data for the prototype
  const deal = {
    id: dealId || "1",
    name: "AlphaCo Term Loan",
    amount: "$50,000,000",
    type: "Term Loan",
    status: "Active",
    borrower: "AlphaCo Industries",
    country: "U.S.",
    agent: "YourBank",
    lendersCount: 8,
    signedDate: "Jan 2025",
    maturityDate: "Dec 31, 2027",
    timeRemaining: "2.5 years remaining",
    interestRate: "LIBOR + 2.5%",
    currentRate: "6.75% total",
    guarantor: "AlphaCo Manufacturing Ltd.",
    coverImageUrl: "/placeholder.svg"
  };

  return (
    <Layout title={deal.name}>
      <div className="max-w-7xl mx-auto">
        {/* Deal header with key info */}
        <div className="mb-6">
          <Link to="/deals">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Deals
            </Button>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {deal.name}
                <span className="text-lg sm:text-xl text-muted-foreground ml-2">
                  – {deal.amount} – {deal.status}
                </span>
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Borrower: {deal.borrower}; Agent Bank: {deal.agent}; 
              Last Updated: Apr 15, 2025
            </p>
            {/* Integration indicators */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-muted-foreground">Connected Systems:</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="LoanIQ for loan servicing data">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  LoanIQ
                </div>
                <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="FinScan for AML/KYC screening">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  FinScan
                </div>
                <div className="flex items-center text-xs bg-muted px-2 py-1 rounded-md" title="Intralinks for document vault/VDR">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  Intralinks
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <Tabs 
          defaultValue="summary" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
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
                AI Chat
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab content */}
          <TabsContent value="summary" className="space-y-4 pt-2">
            <DealSummary deal={deal} />
          </TabsContent>
          
          <TabsContent value="documents" className="pt-2">
            <p>Documents tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="tasks" className="pt-2">
            <p>Tasks tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="covenants" className="pt-2">
            <div className="p-4 border rounded-lg">
              <p className="text-lg font-medium mb-2">Covenants Overview</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Check className="text-green-500 h-5 w-5" />
                  <span>Compliant: 4</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="text-red-500 h-5 w-5" />
                  <span>Breached: 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Untested/Upcoming: 1</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="loanAdmin" className="pt-2">
            <p>Loan Admin tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="contacts" className="pt-2">
            <p>Contacts tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="communications" className="pt-2">
            <p>Communications tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="kyc" className="pt-2">
            <p>KYC/AML tab content will go here.</p>
          </TabsContent>
          
          <TabsContent value="aiChat" className="pt-2">
            <p>AI Chat tab content will go here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DealDetails;

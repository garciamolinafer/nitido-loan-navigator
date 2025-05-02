
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { NitidinaGreeting } from "@/components/deals/NitidinaGreeting";
import { DealsFilterBar } from "@/components/deals/DealsFilterBar";
import { DealsTable } from "@/components/deals/DealsTable";
import { useDealData } from "@/hooks/useDealData";

const Deals = () => {
  const { deals, filteredDeals, filterDeals, sortDeals, currentSort } = useDealData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterDeals({ searchTerm: term });
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    filterDeals({ ...filters, searchTerm });
  };

  const handleSort = (field: string) => {
    sortDeals(field);
  };

  return (
    <Layout title="Deals Dashboard">
      <div className="max-w-7xl mx-auto">
        <NitidinaGreeting 
          activeDeals={deals.filter(d => d.status === "Active").length} 
          issueCount={deals.filter(d => d.flag).length}
        />
        
        <div className="mt-6">
          <DealsFilterBar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSort={handleSort}
            currentSort={currentSort}
          />
          
          <DealsTable 
            deals={filteredDeals}
            onSort={handleSort}
            currentSort={currentSort} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default Deals;

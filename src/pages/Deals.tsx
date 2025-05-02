
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DealsList from "@/components/deals/DealsList";
import NitidinaDealsGreeting from "@/components/deals/NitidinaDealsGreeting";
import DealsFilterBar from "@/components/deals/DealsFilterBar";
import { useDeals } from "@/hooks/useDeals";

const Deals = () => {
  const { deals, filteredDeals, filterDeals, sortDeals, sortConfig, resetFilters } = useDeals();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDeals({ search: query });
  };

  return (
    <Layout title="Deals Dashboard">
      <div className="max-w-7xl mx-auto">
        <NitidinaDealsGreeting dealCount={deals.length} />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Deals Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Manage and monitor all your syndicated loan deals in one place.
          </p>
          
          <DealsFilterBar 
            onSearch={handleSearch} 
            searchValue={searchQuery}
            onSort={(field) => sortDeals(field)}
            sortConfig={sortConfig}
            onReset={resetFilters}
          />
        </div>
        
        <DealsList deals={filteredDeals} />
      </div>
    </Layout>
  );
};

export default Deals;

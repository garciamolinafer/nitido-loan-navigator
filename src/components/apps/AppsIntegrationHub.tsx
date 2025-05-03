
import { useState } from "react";
import { AppSearchBar } from "./AppSearchBar";
import { IntegrationGrid } from "./IntegrationGrid";
import { AddIntegrationButton } from "./AddIntegrationButton";
import { useIntegrations } from "@/hooks/useIntegrations";
import { IntegrationAddModal } from "./IntegrationAddModal";

export function AppsIntegrationHub() {
  const { integrations, filteredIntegrations, searchTerm, setSearchTerm, activeFilters, setFilter, clearFilters } = useIntegrations();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Integration Management</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <AppSearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          activeFilters={activeFilters}
          setFilter={setFilter}
          clearFilters={clearFilters}
        />
        <AddIntegrationButton onClick={() => setIsAddModalOpen(true)} />
      </div>
      
      <IntegrationGrid integrations={filteredIntegrations} />
      
      <IntegrationAddModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableIntegrations={integrations.filter(i => i.status === "disconnected")}
      />
    </div>
  );
}

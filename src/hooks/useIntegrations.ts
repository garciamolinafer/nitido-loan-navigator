
import { useState, useEffect, useMemo } from "react";
import { Integration, IntegrationFilters } from "@/types/integration";
import { getMockIntegrations } from "@/data/mock-integrations";

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<IntegrationFilters>({
    category: null,
    status: null,
  });

  useEffect(() => {
    // In a real app, we would fetch integrations from API
    setIntegrations(getMockIntegrations());
  }, []);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter(integration => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || 
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = !activeFilters.category || 
        integration.category === activeFilters.category;
      
      // Filter by status
      const matchesStatus = !activeFilters.status ||
        integration.status === activeFilters.status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [integrations, searchTerm, activeFilters]);

  const setFilter = (key: keyof IntegrationFilters, value: string | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: null,
      status: null
    });
  };

  return {
    integrations,
    filteredIntegrations,
    searchTerm,
    setSearchTerm,
    activeFilters,
    setFilter,
    clearFilters
  };
}


import { useState, useMemo } from "react";
import { Deal, DealStatus, DealFilter, SortConfig } from "@/types/deals";
import { sampleDeals } from "@/data/sampleDeals";

export const useDeals = () => {
  const [deals] = useState<Deal[]>(sampleDeals);
  const [filters, setFilters] = useState<DealFilter>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      // Apply search filter
      if (filters.search && !deal.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (filters.status && deal.status !== filters.status) {
        return false;
      }
      
      // Apply flag filter
      if (filters.hasFlag === true && !deal.flag) {
        return false;
      }
      
      // Apply lead arranger filter
      if (filters.leadArranger && deal.leadArranger !== filters.leadArranger) {
        return false;
      }
      
      // Apply deal type filter
      if (filters.dealType && deal.type !== filters.dealType) {
        return false;
      }
      
      // Apply region filter
      if (filters.region && deal.region !== filters.region) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const key = sortConfig.key as keyof Deal;
      
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [deals, filters, sortConfig]);

  const filterDeals = (newFilters: Partial<DealFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const sortDeals = (key: keyof Deal | null) => {
    let direction = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction: direction as 'asc' | 'desc' });
  };

  const resetFilters = () => {
    setFilters({});
    setSortConfig({ key: null, direction: 'asc' });
  };

  return {
    deals,
    filteredDeals,
    filterDeals,
    sortDeals,
    sortConfig,
    resetFilters
  };
};

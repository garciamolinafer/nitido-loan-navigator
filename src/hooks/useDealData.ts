import { useState, useEffect } from "react";
import { dealData } from "@/data/deals";

export interface Deal {
  id: string;
  name: string;
  type: string;
  amount: string;
  lenders: number;
  region: string;
  leadArranger: string;
  signedDate: string;
  maturityDate: string;
  status: "Active" | "Pending Review" | "Monitoring" | "Closed";
  flag?: {
    type: "warning" | "error" | "info";
    message: string;
  };
  description?: string;
}

type FilterOptions = {
  status?: string[];
  type?: string[];
  region?: string[];
  leadArranger?: string[];
  hasFlag?: boolean;
  searchTerm?: string;
};

export function useDealData() {
  const [deals] = useState<Deal[]>(dealData);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(dealData);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [currentSort, setCurrentSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: "name", direction: "asc" });

  const filterDeals = (newFilters: FilterOptions) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    let result = [...deals];
    
    // Apply filters
    if (updatedFilters.status?.length) {
      result = result.filter(deal => updatedFilters.status!.includes(deal.status));
    }
    
    if (updatedFilters.type?.length) {
      result = result.filter(deal => updatedFilters.type!.some(type => deal.type.includes(type)));
    }
    
    if (updatedFilters.region?.length) {
      result = result.filter(deal => updatedFilters.region!.includes(deal.region));
    }
    
    if (updatedFilters.leadArranger?.length) {
      result = result.filter(deal => updatedFilters.leadArranger!.includes(deal.leadArranger));
    }
    
    if (updatedFilters.hasFlag) {
      result = result.filter(deal => deal.flag !== undefined);
    }
    
    if (updatedFilters.searchTerm) {
      const term = updatedFilters.searchTerm.toLowerCase();
      result = result.filter(deal => 
        deal.name.toLowerCase().includes(term) || 
        deal.leadArranger.toLowerCase().includes(term) ||
        deal.type.toLowerCase().includes(term) ||
        deal.region.toLowerCase().includes(term)
      );
    }
    
    // Apply current sorting
    sortDealsArray(result, currentSort.field, currentSort.direction);
    
    setFilteredDeals(result);
  };

  const sortDealsArray = (deals: Deal[], field: string, direction: 'asc' | 'desc') => {
    return deals.sort((a: any, b: any) => {
      // Handle numeric fields
      if (field === 'lenders') {
        return direction === 'asc' 
          ? a[field] - b[field]
          : b[field] - a[field];
      }
      
      // Handle amount (string with currency symbol)
      if (field === 'amount') {
        const amountA = parseFloat(a[field].replace(/[^0-9.-]+/g, ""));
        const amountB = parseFloat(b[field].replace(/[^0-9.-]+/g, ""));
        return direction === 'asc' 
          ? amountA - amountB
          : amountB - amountA;
      }
      
      // Handle string fields
      if (direction === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
  };

  const sortDeals = (field: string) => {
    const direction = 
      field === currentSort.field 
        ? currentSort.direction === 'asc' ? 'desc' : 'asc'
        : 'asc';
    
    setCurrentSort({ field, direction });
    
    const sorted = [...filteredDeals];
    sortDealsArray(sorted, field, direction);
    setFilteredDeals(sorted);
  };

  return {
    deals,
    filteredDeals,
    filterDeals,
    sortDeals,
    currentSort,
  };
}

import { useState, useMemo } from 'react';
import type { Pop } from '../types';

interface UsePopFiltersOptions {
  pops: Pop[];
  initialBrand?: string;
  initialSearch?: string;
  initialCustomOnly?: boolean;
}

export interface PopFiltersState {
  selectedBrand: string;
  searchTerm: string;
  showCustomOnly: boolean;
}

export interface PopFiltersActions {
  setSelectedBrand: (brand: string) => void;
  setSearchTerm: (term: string) => void;
  setShowCustomOnly: (showCustom: boolean) => void;
  clearSearch: () => void;
  resetFilters: () => void;
}

export interface UsePopFiltersReturn {
  // State
  filters: PopFiltersState;

  // Actions
  actions: PopFiltersActions;

  // Computed values
  filteredPops: Pop[];
  standardPops: Pop[];
  customPops: Pop[];

  // Helper values
  hasActiveFilters: boolean;
  resultsCount: number;
}

/**
 * Custom hook for managing pop filtering logic
 * Consolidates filtering state and logic used across PopLibrary and CollectionBrowser
 */
export const usePopFilters = ({
  pops,
  initialBrand = 'all',
  initialSearch = '',
  initialCustomOnly = false
}: UsePopFiltersOptions): UsePopFiltersReturn => {
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [showCustomOnly, setShowCustomOnly] = useState<boolean>(initialCustomOnly);

  // Memoized filtered pops
  const filteredPops = useMemo(() => {
    return pops.filter(pop => {
      const matchesBrand = selectedBrand === 'all' || pop.brand === selectedBrand;
      const matchesSearch = pop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (pop.flavor && pop.flavor.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCustomFilter = !showCustomOnly || pop.isCustom;

      return matchesBrand && matchesSearch && matchesCustomFilter;
    });
  }, [pops, selectedBrand, searchTerm, showCustomOnly]);

  // Separate standard and custom pops
  const standardPops = useMemo(() =>
    filteredPops.filter(pop => !pop.isCustom),
    [filteredPops]
  );

  const customPops = useMemo(() =>
    filteredPops.filter(pop => pop.isCustom),
    [filteredPops]
  );

  // Helper functions
  const clearSearch = () => setSearchTerm('');

  const resetFilters = () => {
    setSelectedBrand('all');
    setSearchTerm('');
    setShowCustomOnly(false);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedBrand !== 'all' || searchTerm !== '' || showCustomOnly;

  return {
    filters: {
      selectedBrand,
      searchTerm,
      showCustomOnly
    },
    actions: {
      setSelectedBrand,
      setSearchTerm,
      setShowCustomOnly,
      clearSearch,
      resetFilters
    },
    filteredPops,
    standardPops,
    customPops,
    hasActiveFilters,
    resultsCount: filteredPops.length
  };
};
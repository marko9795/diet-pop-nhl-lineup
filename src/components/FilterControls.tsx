import React from 'react';
import type { PopFiltersState, PopFiltersActions } from '../hooks/usePopFilters';
import { getAllBrands } from '../data/pops';

interface FilterControlsProps {
  filters: PopFiltersState;
  actions: PopFiltersActions;
  searchPlaceholder?: string;
  showCreateButton?: boolean;
  onAddCustomPop?: () => void;
  resultsCount: number;
  hasActiveFilters: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  actions,
  searchPlaceholder = "Search pops...",
  showCreateButton = false,
  onAddCustomPop,
  resultsCount,
  hasActiveFilters
}) => {
  const brands = getAllBrands();

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="text-neon-cyan text-lg">🔍</div>
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={filters.searchTerm}
          onChange={(e) => actions.setSearchTerm(e.target.value)}
          className="
            retro-input w-full pl-12 pr-4 py-3 rounded-lg
            text-lg font-retro tracking-wide
            transition-all duration-300
            placeholder:text-ice-500
          "
        />
        {filters.searchTerm && (
          <button
            onClick={actions.clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neon-cyan hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Control Panel */}
      <div className={`grid grid-cols-1 gap-4 ${showCreateButton ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {/* Brand Selector */}
        <div className="relative">
          <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
            Brand Filter
          </label>
          <select
            value={filters.selectedBrand}
            onChange={(e) => actions.setSelectedBrand(e.target.value)}
            className="
              retro-input w-full px-4 py-2 rounded-lg
              font-retro tracking-wide
              transition-all duration-300
              cursor-pointer
            "
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Custom Filter Toggle */}
        <div className="flex flex-col">
          <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
            Collection Type
          </label>
          <button
            onClick={() => actions.setShowCustomOnly(!filters.showCustomOnly)}
            className={`
              chrome-button px-4 py-2 rounded-lg
              font-retro font-semibold tracking-wide uppercase
              transition-all duration-300
              ${filters.showCustomOnly
                ? 'bg-gradient-to-r from-hockey-gold to-yellow-500 text-black'
                : ''
              }
            `}
          >
            {filters.showCustomOnly ? '⭐ Custom Only' : '🌐 Show All'}
          </button>
        </div>

        {/* Add Custom Button */}
        {showCreateButton && (
          <div className="flex flex-col">
            <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
              Create New
            </label>
            {onAddCustomPop && (
              <button
                onClick={onAddCustomPop}
                className="
                  chrome-button px-4 py-2 rounded-lg
                  font-retro font-bold tracking-wide uppercase
                  transition-all duration-300
                  transform hover:scale-105 active:scale-95
                "
              >
                + New Pop
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-center">
        <div className="font-retro text-ice-400 tracking-wide text-center">
          <span className="text-neon-cyan font-bold text-xl">{resultsCount}</span>
          <span className="mx-2">pop{resultsCount !== 1 ? 's' : ''}</span>
          {hasActiveFilters ? 'match your filters' : 'in collection'}
          {filters.searchTerm && (
            <span className="block text-sm mt-1 text-hockey-gold">
              Filtered by: "{filters.searchTerm}"
            </span>
          )}
        </div>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <div className="text-center">
          <button
            onClick={actions.resetFilters}
            className="
              text-sm font-retro text-ice-500 hover:text-neon-cyan
              transition-colors duration-300 underline
            "
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};
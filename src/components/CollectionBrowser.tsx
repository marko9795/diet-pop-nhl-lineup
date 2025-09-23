import React from 'react';
import type { Pop } from '../types';
import { PopCan } from './PopCan';
import { usePopFilters } from '../hooks/usePopFilters';
import { FilterControls } from './FilterControls';

interface CollectionBrowserProps {
  pops: Pop[];
}

export const CollectionBrowser: React.FC<CollectionBrowserProps> = ({ pops }) => {
  const {
    filters,
    actions,
    filteredPops,
    standardPops,
    customPops,
    hasActiveFilters,
    resultsCount
  } = usePopFilters({ pops });

  return (
    <div className="space-y-8">
      {/* Collection Header */}
      <div className="arena-display p-8 animate-fade-in">
        <div className="text-center mb-8 relative">
          <div className="hockey-line-header inline-block text-lg px-8 py-3">
            🏆 COMPLETE COLLECTION VIEW 🏆
          </div>
        </div>


        {/* Enhanced Search and Control Panel */}
        <FilterControls
          filters={filters}
          actions={actions}
          searchPlaceholder="Search the complete collection..."
          showCreateButton={false}
          resultsCount={resultsCount}
          hasActiveFilters={hasActiveFilters}
        />
      </div>


      {/* Standard Pops Collection - Improved Spacing */}
      {(!filters.showCustomOnly && standardPops.length > 0) && (
        <div className="arena-display p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-silver to-transparent flex-1"></div>
            <h3 className="text-2xl font-hockey font-black text-hockey-silver mx-6 tracking-widest">
              STANDARD COLLECTION
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-silver to-transparent flex-1"></div>
          </div>

          {/* Improved Grid with Better Spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {standardPops.map(pop => (
              <div
                key={pop.id}
                className="
                  relative group
                  transform transition-all duration-300
                  hover:scale-105 hover:z-10
                  p-2 rounded-xl
                  hover:bg-neon-blue hover:bg-opacity-8
                  hover:border hover:border-neon-blue hover:border-opacity-30
                  hover:shadow-lg hover:shadow-neon-blue hover:shadow-opacity-20
                "
              >
                <PopCan
                  pop={pop}
                  size="medium"
                  showName={true}
                  allowTextWrap={true} // Allow full text display
                  className="transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Pops Collection - Improved Spacing */}
      {customPops.length > 0 && (
        <div className="arena-display p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-gold to-transparent flex-1"></div>
            <div className="flex items-center gap-3 mx-6">
              <h3 className="text-2xl font-hockey font-black text-hockey-gold tracking-widest">
                CUSTOM COLLECTION
              </h3>
              <div className="w-3 h-3 bg-hockey-gold rounded-full animate-neon-pulse" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-gold to-transparent flex-1"></div>
          </div>

          {/* Improved Grid with Better Spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {customPops.map(pop => (
              <div
                key={pop.id}
                className="
                  relative group
                  transform transition-all duration-300
                  hover:scale-105 hover:z-10
                  p-2 rounded-xl
                  hover:bg-neon-blue hover:bg-opacity-8
                  hover:border hover:border-hockey-gold hover:border-opacity-40
                  hover:shadow-lg hover:shadow-hockey-gold hover:shadow-opacity-20
                "
              >
                <PopCan
                  pop={pop}
                  size="medium"
                  showName={true}
                  allowTextWrap={true} // Allow full text display
                  className="transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {filteredPops.length === 0 && (
        <div className="arena-display p-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🥤</div>
            <div className="text-xl font-hockey text-ice-500 mb-4 tracking-wide uppercase">
              {hasActiveFilters
                ? 'No Pops Match Your Filters'
                : 'Collection Empty'
              }
            </div>
            <div className="text-sm font-retro text-ice-600 mb-6">
              {hasActiveFilters
                ? 'Try adjusting your search or filters'
                : 'Start building your collection'
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
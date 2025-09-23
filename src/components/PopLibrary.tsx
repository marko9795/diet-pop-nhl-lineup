import React from 'react';
import type { Pop } from '../types';
import { PopCan } from './PopCan';
import { usePopFilters } from '../hooks/usePopFilters';
import { FilterControls } from './FilterControls';

interface PopLibraryProps {
  pops: Pop[];
  onPopClick: (pop: Pop) => void;
  onAddCustomPop?: () => void;
  selectedPop?: Pop | null;
}

export const PopLibrary: React.FC<PopLibraryProps> = ({
  pops,
  onPopClick,
  onAddCustomPop,
  selectedPop
}) => {
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
    <div className="arena-display p-8 animate-fade-in">
      {/* Arena Display Header */}
      <div className="text-center mb-8 relative">
        <div className="hockey-line-header inline-block text-lg px-8 py-3">
          🥤 DIET SODA COMMAND CENTER 🥤
        </div>
      </div>

      {/* Enhanced Search and Control Panel */}
      <div className="mb-8">
        <FilterControls
          filters={filters}
          actions={actions}
          searchPlaceholder="Search the arsenal..."
          showCreateButton={true}
          onAddCustomPop={onAddCustomPop}
          resultsCount={resultsCount}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Selected Pop Indicator */}
        {selectedPop && (
          <div className="flex items-center justify-center gap-2 text-sm font-retro text-hockey-gold mt-4">
            <div className="w-2 h-2 bg-hockey-gold rounded-full animate-pulse" />
            {selectedPop.name} selected
          </div>
        )}
      </div>

      {/* Standard Pops Collection */}
      {(!filters.showCustomOnly && standardPops.length > 0) && (
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-silver to-transparent flex-1"></div>
            <h3 className="text-xl font-hockey font-black text-hockey-silver mx-4 tracking-widest">
              STANDARD COLLECTION
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-silver to-transparent flex-1"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {standardPops.map(pop => (
              <div
                key={pop.id}
                className="
                  relative group
                  transform transition-all duration-300
                  hover:scale-105 hover:z-10
                "
              >
                <PopCan
                  pop={pop}
                  onClick={() => onPopClick(pop)}
                  size="medium"
                  showName={true}
                  selected={selectedPop?.id === pop.id}
                  className="transition-all duration-300"
                />
                {/* Selection indicator */}
                {selectedPop?.id === pop.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-neon-blue text-black px-2 py-1 rounded-full text-xs font-bold">
                      SELECTED
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Pops Collection */}
      {customPops.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-gold to-transparent flex-1"></div>
            <div className="flex items-center gap-3 mx-4">
              <h3 className="text-xl font-hockey font-black text-hockey-gold tracking-widest">
                CUSTOM COLLECTION
              </h3>
              <div className="w-3 h-3 bg-hockey-gold rounded-full animate-neon-pulse" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-hockey-gold to-transparent flex-1"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {customPops.map(pop => (
              <div
                key={pop.id}
                className="
                  relative group
                  transform transition-all duration-300
                  hover:scale-105 hover:z-10
                "
              >
                <PopCan
                  pop={pop}
                  onClick={() => onPopClick(pop)}
                  size="medium"
                  showName={true}
                  selected={selectedPop?.id === pop.id}
                  className="transition-all duration-300"
                />
                {/* Selection indicator */}
                {selectedPop?.id === pop.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-hockey-gold text-black px-2 py-1 rounded-full text-xs font-bold">
                      SELECTED
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {filteredPops.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 opacity-50">🥤</div>
          <div className="text-xl font-hockey text-ice-500 mb-4 tracking-wide uppercase">
            {hasActiveFilters
              ? 'No Pops Match Your Filters'
              : 'Arsenal Empty'
            }
          </div>
          <div className="text-sm font-retro text-ice-600 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your search or filters'
              : 'Start building your collection'
            }
          </div>
          {filters.showCustomOnly && customPops.length === 0 && onAddCustomPop && (
            <button
              onClick={onAddCustomPop}
              className="
                bg-gradient-to-r from-hockey-gold to-yellow-500
                hover:from-yellow-500 hover:to-hockey-gold
                text-black font-hockey font-black tracking-wider uppercase
                px-6 py-3 rounded-lg
                transition-all duration-300
                transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl
              "
            >
              Create Your First Custom Pop
            </button>
          )}
        </div>
      )}
    </div>
  );
};
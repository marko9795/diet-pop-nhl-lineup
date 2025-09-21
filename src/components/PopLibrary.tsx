import React, { useState, useMemo } from 'react';
import type { Pop } from '../types';
import { PopCan } from './PopCan';
import { getAllBrands } from '../data/pops';

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
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomOnly, setShowCustomOnly] = useState(false);

  const brands = useMemo(() => getAllBrands(), []);

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

  const standardPops = filteredPops.filter(pop => !pop.isCustom);
  const customPops = filteredPops.filter(pop => pop.isCustom);

  return (
    <div className="arena-display p-8 animate-fade-in">
      {/* Arena Display Header */}
      <div className="text-center mb-8 relative">
        <div className="hockey-line-header inline-block text-lg px-8 py-3">
          🥤 DIET SODA COMMAND CENTER 🥤
        </div>
      </div>

      {/* Enhanced Search and Control Panel */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-neon-cyan text-lg">🔍</div>
          </div>
          <input
            type="text"
            placeholder="Search the arsenal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              retro-input w-full pl-12 pr-4 py-3 rounded-lg
              text-lg font-retro tracking-wide
              transition-all duration-300
              placeholder:text-ice-500
            "
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neon-cyan hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand Selector */}
          <div className="relative">
            <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
              Brand Filter
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
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
              onClick={() => setShowCustomOnly(!showCustomOnly)}
              className={`
                chrome-button px-4 py-2 rounded-lg
                font-retro font-semibold tracking-wide uppercase
                transition-all duration-300
                ${showCustomOnly
                  ? 'bg-gradient-to-r from-hockey-gold to-yellow-500 text-black'
                  : ''
                }
              `}
            >
              {showCustomOnly ? '⭐ Custom Only' : '🌐 Show All'}
            </button>
          </div>

          {/* Add Custom Button */}
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
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="font-retro text-ice-400 tracking-wide">
            <span className="text-neon-cyan font-bold">{filteredPops.length}</span> pop{filteredPops.length !== 1 ? 's' : ''} in arsenal
          </div>
          {selectedPop && (
            <div className="flex items-center gap-2 text-sm font-retro text-hockey-gold">
              <div className="w-2 h-2 bg-hockey-gold rounded-full animate-pulse" />
              {selectedPop.name} selected
            </div>
          )}
        </div>
      </div>

      {/* Standard Pops Collection */}
      {(!showCustomOnly && standardPops.length > 0) && (
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
            {searchTerm || selectedBrand !== 'all' || showCustomOnly
              ? 'No Pops Match Your Filters'
              : 'Arsenal Empty'
            }
          </div>
          <div className="text-sm font-retro text-ice-600 mb-6">
            {searchTerm || selectedBrand !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start building your collection'
            }
          </div>
          {showCustomOnly && customPops.length === 0 && onAddCustomPop && (
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
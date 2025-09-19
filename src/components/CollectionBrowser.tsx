import React, { useState, useMemo } from 'react';
import type { Pop } from '../types';
import { PopCan } from './PopCan';
import { PopDropdown } from './PopDropdown';
import { PopStatsCard } from './PopStatsCard';
import { getAllBrands } from '../data/pops';

interface CollectionBrowserProps {
  pops: Pop[];
}

export const CollectionBrowser: React.FC<CollectionBrowserProps> = ({ pops }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomOnly, setShowCustomOnly] = useState(false);
  const [selectedPopForStats, setSelectedPopForStats] = useState<Pop | null>(null);

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
    <div className="space-y-8">
      {/* Collection Header */}
      <div className="arena-display p-8 animate-fade-in">
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h2 className="text-4xl font-hockey font-black text-white mb-2 tracking-wider uppercase">
              Collection Browser
            </h2>
            <div className="absolute inset-0 text-4xl font-hockey font-black text-hockey-gold opacity-30 blur-sm tracking-wider uppercase">
              Collection Browser
            </div>
          </div>
          <div className="hockey-line-header inline-block text-sm mt-3 px-4 py-1">
            🏆 COMPLETE COLLECTION VIEW 🏆
          </div>
        </div>

        {/* Pop Stats Selector */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-xl font-hockey font-black text-neon-cyan tracking-widest uppercase mb-2">
              Pop Inspector
            </h3>
            <p className="text-ice-400 font-retro tracking-wide">
              Select any pop to view detailed stats and information
            </p>
          </div>

          <PopDropdown
            pops={pops}
            selectedPop={selectedPopForStats}
            onPopSelect={setSelectedPopForStats}
            placeholder="Choose a pop to inspect..."
          />
        </div>

        {/* Enhanced Search and Control Panel */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-neon-cyan text-lg">🔍</div>
            </div>
            <input
              type="text"
              placeholder="Search the complete collection..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-center">
            <div className="font-retro text-ice-400 tracking-wide text-center">
              <span className="text-neon-cyan font-bold text-xl">{filteredPops.length}</span>
              <span className="mx-2">pop{filteredPops.length !== 1 ? 's' : ''} in collection</span>
              {searchTerm && (
                <span className="block text-sm mt-1 text-hockey-gold">
                  Filtered by: "{searchTerm}"
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pop Stats Display */}
      {selectedPopForStats && (
        <PopStatsCard pop={selectedPopForStats} />
      )}

      {/* Standard Pops Collection - Improved Spacing */}
      {(!showCustomOnly && standardPops.length > 0) && (
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
                  hover:bg-white hover:bg-opacity-5
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
                  hover:bg-white hover:bg-opacity-5
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
              {searchTerm || selectedBrand !== 'all' || showCustomOnly
                ? 'No Pops Match Your Filters'
                : 'Collection Empty'
              }
            </div>
            <div className="text-sm font-retro text-ice-600 mb-6">
              {searchTerm || selectedBrand !== 'all'
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
import React, { useState, useMemo } from 'react';
import { Pop } from '../types';
import { PopCan } from './PopCan';
import { getAllBrands } from '../data/pops';

interface PopLibraryProps {
  pops: Pop[];
  onPopClick: (pop: Pop) => void;
  onAddCustomPop?: () => void;
}

export const PopLibrary: React.FC<PopLibraryProps> = ({
  pops,
  onPopClick,
  onAddCustomPop
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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white font-hockey mb-4">
          Pop Library
        </h2>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search pops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-2">
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Custom Filter */}
            <button
              onClick={() => setShowCustomOnly(!showCustomOnly)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                showCustomOnly
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {showCustomOnly ? 'Custom Only' : 'Show All'}
            </button>

            {/* Add Custom Button */}
            {onAddCustomPop && (
              <button
                onClick={onAddCustomPop}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
              >
                + Add Custom Pop
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-400">
            {filteredPops.length} pop{filteredPops.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Standard Pops */}
      {(!showCustomOnly && standardPops.length > 0) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Standard Pops</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {standardPops.map(pop => (
              <PopCan
                key={pop.id}
                pop={pop}
                onClick={() => onPopClick(pop)}
                size="medium"
                showName={true}
                className="hover:transform hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      )}

      {/* Custom Pops */}
      {customPops.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold text-white">My Custom Pops</h3>
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {customPops.map(pop => (
              <PopCan
                key={pop.id}
                pop={pop}
                onClick={() => onPopClick(pop)}
                size="medium"
                showName={true}
                className="hover:transform hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPops.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            {searchTerm || selectedBrand !== 'all' || showCustomOnly
              ? 'No pops match your filters'
              : 'No pops available'
            }
          </div>
          {showCustomOnly && customPops.length === 0 && onAddCustomPop && (
            <button
              onClick={onAddCustomPop}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Create Your First Custom Pop
            </button>
          )}
        </div>
      )}
    </div>
  );
};
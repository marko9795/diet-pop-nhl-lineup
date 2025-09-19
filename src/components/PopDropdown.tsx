import React, { useState, useMemo } from 'react';
import type { Pop } from '../types';

interface PopDropdownProps {
  pops: Pop[];
  selectedPop: Pop | null;
  onPopSelect: (pop: Pop | null) => void;
  placeholder?: string;
}

export const PopDropdown: React.FC<PopDropdownProps> = ({
  pops,
  selectedPop,
  onPopSelect,
  placeholder = "Select a pop to view details..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPops = useMemo(() => {
    if (!searchTerm) return pops;
    return pops.filter(pop =>
      pop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pop.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pops, searchTerm]);

  const handlePopSelect = (pop: Pop) => {
    onPopSelect(pop);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onPopSelect(null);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-6 py-4 rounded-xl
          retro-input font-retro text-lg tracking-wide text-left
          flex items-center justify-between
          transition-all duration-300
          hover:shadow-neon focus:shadow-neon-strong
        "
      >
        <div className="flex items-center gap-3">
          <span className="text-neon-cyan text-xl">🥤</span>
          <span className={selectedPop ? 'text-white' : 'text-ice-400'}>
            {selectedPop ? selectedPop.name : placeholder}
          </span>
        </div>
        <div className={`
          transition-transform duration-300 text-neon-cyan
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}>
          ▼
        </div>
      </button>

      {/* Clear Button */}
      {selectedPop && (
        <button
          onClick={handleClear}
          className="
            absolute right-12 top-1/2 transform -translate-y-1/2
            w-8 h-8 rounded-full
            bg-red-500 hover:bg-red-600
            text-white font-bold text-sm
            transition-all duration-300
            hover:scale-110 active:scale-95
          "
        >
          ✕
        </button>
      )}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="
          absolute top-full left-0 right-0 mt-2 z-50
          bg-gray-900 bg-opacity-95 backdrop-blur-md
          border border-neon-blue border-opacity-50
          rounded-xl shadow-neon-strong
          max-h-96 overflow-hidden
        ">
          {/* Search Input */}
          <div className="p-4 border-b border-ice-700">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neon-cyan">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search pops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 rounded-lg
                  bg-gray-800 border border-ice-600
                  text-white placeholder-ice-500
                  font-retro tracking-wide
                  focus:border-neon-cyan focus:outline-none
                  transition-all duration-300
                "
                autoFocus
              />
            </div>
          </div>

          {/* Pop List */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {filteredPops.length > 0 ? (
              <div className="p-2">
                {filteredPops.map(pop => (
                  <button
                    key={pop.id}
                    onClick={() => handlePopSelect(pop)}
                    className="
                      w-full p-3 rounded-lg text-left
                      hover:bg-neon-blue hover:bg-opacity-20
                      transition-all duration-300
                      group
                    "
                  >
                    <div className="flex items-center gap-3">
                      {/* Mini Color Indicator */}
                      <div
                        className="w-4 h-4 rounded-full border border-white border-opacity-30"
                        style={{ backgroundColor: pop.primaryColor }}
                      />

                      <div className="flex-1">
                        <div className="font-retro font-semibold text-white group-hover:text-neon-cyan">
                          {pop.name}
                        </div>
                        <div className="text-sm text-ice-400 font-retro">
                          {pop.brand}
                          {pop.caffeine !== undefined && (
                            <span className="ml-2 text-hockey-gold">
                              {pop.caffeine}mg
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Custom Pop Indicator */}
                      {pop.isCustom && (
                        <div className="w-3 h-3 bg-hockey-gold rounded-full animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2 opacity-50">🔍</div>
                <div className="text-ice-500 font-retro">
                  No pops found matching "{searchTerm}"
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
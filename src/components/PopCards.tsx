import React, { useState } from 'react';
import type { Pop } from '../types';
import { PopDropdown } from './PopDropdown';
import { PopStatsCard } from './PopStatsCard';

interface PopCardsProps {
  pops: Pop[];
}

export const PopCards: React.FC<PopCardsProps> = ({ pops }) => {
  const [selectedPop, setSelectedPop] = useState<Pop | null>(null);

  return (
    <div className="space-y-8 max-w-[2000px] mx-auto">
      {/* Pop Cards Header */}
      <div className="arena-display pop-inspector-container p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="hockey-line-header inline-block text-lg px-8 py-3">
            🃏 POP CARDS INSPECTOR 🃏
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-hockey font-black text-neon-cyan tracking-widest uppercase mb-2">
            Pop Inspector
          </h3>
          <p className="text-ice-400 font-retro tracking-wide">
            Select any pop to view detailed stats and information
          </p>
        </div>

        <PopDropdown
          pops={pops}
          selectedPop={selectedPop}
          onPopSelect={setSelectedPop}
          placeholder="Choose a pop to inspect..."
        />
      </div>

      {/* Pop Stats Display */}
      {selectedPop && (
        <PopStatsCard pop={selectedPop} />
      )}

      {/* Empty State when no pop selected */}
      {!selectedPop && (
        <div className="arena-display p-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🥤</div>
            <div className="text-xl font-hockey text-ice-500 mb-4 tracking-wide uppercase">
              No Pop Selected
            </div>
            <div className="text-sm font-retro text-ice-600 mb-6">
              Use the dropdown above to select a pop and view its detailed information
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
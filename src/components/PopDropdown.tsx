import React from 'react';
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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const popId = event.target.value;
    if (popId === '') {
      onPopSelect(null);
    } else {
      const selectedPop = pops.find(pop => pop.id === popId);
      if (selectedPop) {
        onPopSelect(selectedPop);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-neon-cyan text-xl">🥤</span>
        </div>
        <select
          value={selectedPop?.id || ''}
          onChange={handleSelectChange}
          className="
            retro-input w-full pl-12 pr-4 py-4 rounded-xl
            font-retro text-lg tracking-wide
            transition-all duration-300
            cursor-pointer
            hover:shadow-neon focus:shadow-neon-strong
          "
        >
          <option value="">{placeholder}</option>
          {pops.map(pop => (
            <option key={pop.id} value={pop.id}>
              {pop.name} - {pop.brand}
              {pop.caffeine !== undefined && ` (${pop.caffeine}mg)`}
              {pop.isCustom && ' ⭐'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
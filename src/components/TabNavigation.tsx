import React from 'react';

interface TabNavigationProps {
  activeTab: 'lineup' | 'collection' | 'pop-cards';
  onTabChange: (tab: 'lineup' | 'collection' | 'pop-cards') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="arena-display inline-flex p-2 rounded-xl">
        {/* Lineup Builder Tab */}
        <button
          onClick={() => onTabChange('lineup')}
          className={`
            relative px-8 py-4 rounded-lg font-hockey font-black text-lg tracking-wider uppercase
            transition-all duration-300 transform hover:scale-105
            ${activeTab === 'lineup'
              ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-black shadow-neon-strong'
              : 'text-ice-300 hover:text-white hover:bg-white hover:bg-opacity-10'
            }
          `}
        >
          {/* Active tab glow effect */}
          {activeTab === 'lineup' && (
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-cyan opacity-20 rounded-lg animate-pulse" />
          )}
          <div className="relative z-10 flex items-center gap-3">
            <span>🏒</span>
            <span>Lineup Builder</span>
          </div>
        </button>

        {/* Collection Browser Tab */}
        <button
          onClick={() => onTabChange('collection')}
          className={`
            relative px-8 py-4 rounded-lg font-hockey font-black text-lg tracking-wider uppercase
            transition-all duration-300 transform hover:scale-105 ml-2
            ${activeTab === 'collection'
              ? 'bg-gradient-to-r from-hockey-gold to-yellow-500 text-black shadow-xl'
              : 'text-ice-300 hover:text-white hover:bg-white hover:bg-opacity-10'
            }
          `}
        >
          {/* Active tab glow effect */}
          {activeTab === 'collection' && (
            <div className="absolute inset-0 bg-gradient-to-r from-hockey-gold to-yellow-500 opacity-20 rounded-lg animate-pulse" />
          )}
          <div className="relative z-10 flex items-center gap-3">
            <span>🥤</span>
            <span>Collection Browser</span>
          </div>
        </button>

        {/* Pop Cards Tab */}
        <button
          onClick={() => onTabChange('pop-cards')}
          className={`
            relative px-8 py-4 rounded-lg font-hockey font-black text-lg tracking-wider uppercase
            transition-all duration-300 transform hover:scale-105 ml-2
            ${activeTab === 'pop-cards'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl'
              : 'text-ice-300 hover:text-white hover:bg-white hover:bg-opacity-10'
            }
          `}
        >
          {/* Active tab glow effect */}
          {activeTab === 'pop-cards' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-lg animate-pulse" />
          )}
          <div className="relative z-10 flex items-center gap-3">
            <span>🃏</span>
            <span>Pop Cards</span>
          </div>
        </button>
      </div>
    </div>
  );
};
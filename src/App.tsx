import { useState } from 'react';

// Import centralized types, data, and components with proper type imports
import type { Position, Pop, Lineup } from './types';
import { INITIAL_POPS } from './data/pops';
import { LineupCard } from './components/LineupCard';
import { PopLibrary } from './components/PopLibrary';
import { TabNavigation } from './components/TabNavigation';
import { CollectionBrowser } from './components/CollectionBrowser';

// Enhanced lineup utility with vintage naming
const createEmptyLineup = (): Lineup => ({
  id: crypto.randomUUID(),
  name: 'Dream Team',
  positions: {
    '1C': null, '1LW': null, '1RW': null,
    '2C': null, '2LW': null, '2RW': null,
    '3C': null, '3LW': null, '3RW': null,
    '4C': null, '4LW': null, '4RW': null,
    '1LD': null, '1RD': null,
    '2LD': null, '2RD': null,
    '3LD': null, '3RD': null
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

function App() {
  console.log('🥤⚡ Diet Pop NHL Lineup - Vintage 80s Hockey Edition! ⚡🥤');

  // Enhanced state management
  const [currentLineup, setCurrentLineup] = useState<Lineup>(() => createEmptyLineup());
  const [selectedPop, setSelectedPop] = useState<Pop | null>(null);
  const [availablePops] = useState<Pop[]>(INITIAL_POPS);
  const [activeTab, setActiveTab] = useState<'lineup' | 'collection'>('lineup');

  // Enhanced pop assignment with better UX
  const handlePositionClick = (position: Position) => {
    const currentPop = getPopForPosition(position);

    if (currentPop) {
      // Remove pop from position
      removePop(position);
    } else if (selectedPop) {
      // Assign selected pop to position
      assignPop(selectedPop.id, position);
    }
  };

  const assignPop = (popId: string, position: Position) => {
    setCurrentLineup(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [position]: popId
      },
      updatedAt: new Date()
    }));
    // Keep pop selected for multiple assignments
  };

  const removePop = (position: Position) => {
    setCurrentLineup(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [position]: null
      },
      updatedAt: new Date()
    }));
  };

  const clearLineup = () => {
    setCurrentLineup(createEmptyLineup());
    setSelectedPop(null);
  };

  const handlePopClick = (pop: Pop) => {
    setSelectedPop(selectedPop?.id === pop.id ? null : pop);
  };

  const getPopForPosition = (position: Position): Pop | null => {
    const popId = currentLineup.positions[position];
    if (!popId) return null;
    return availablePops.find(pop => pop.id === popId) || null;
  };

  const assignedCount = Object.values(currentLineup.positions).filter(Boolean).length;
  const completionPercentage = Math.round((assignedCount / 18) * 100);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Vintage Arena Header/Scoreboard */}
      <header className="relative z-10 mb-8">
        <div className="arena-display mx-4 lg:mx-8 p-8 animate-slide-in">
          {/* Main Title */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <h1 className="text-4xl lg:text-6xl font-hockey font-black text-hockey-gold mb-4 tracking-wider uppercase">
                Hockey Lineup System
              </h1>
              <div className="absolute inset-0 text-4xl lg:text-6xl font-hockey font-black text-yellow-500 opacity-30 blur-sm tracking-wider uppercase">
                Hockey Lineup System
              </div>
            </div>

            <p className="text-ice-400 font-retro tracking-wide text-lg max-w-2xl mx-auto">
              Build your ultimate diet soda hockey team with authentic vintage styling
            </p>
          </div>

          {/* Enhanced Scoreboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Team Name */}
            <div className="text-center">
              <div className="hockey-line-header bg-gradient-to-r from-neon-blue to-neon-cyan text-black mb-2">
                Team Name
              </div>
              <div className="text-2xl font-hockey font-black text-neon-blue">
                {currentLineup.name.toUpperCase()}
              </div>
            </div>

            {/* Completion */}
            <div className="text-center">
              <div className="hockey-line-header bg-gradient-to-r from-hockey-gold to-yellow-500 text-black mb-2">
                Completion
              </div>
              <div className="text-2xl font-hockey font-black text-hockey-gold">
                {completionPercentage}%
              </div>
            </div>

            {/* Players */}
            <div className="text-center">
              <div className="hockey-line-header bg-gradient-to-r from-neon-green to-green-400 text-black mb-2">
                Players
              </div>
              <div className="text-2xl font-hockey font-black text-neon-green">
                {assignedCount}/18
              </div>
            </div>

            {/* Available Pops */}
            <div className="text-center">
              <div className="hockey-line-header bg-gradient-to-r from-hockey-silver to-gray-400 text-black mb-2">
                Arsenal
              </div>
              <div className="text-2xl font-hockey font-black text-hockey-silver">
                {availablePops.length}
              </div>
            </div>
          </div>

          {/* Enhanced Control Panel */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Clear Lineup Button */}
            <button
              onClick={clearLineup}
              className="
                chrome-button px-6 py-3 rounded-lg
                font-retro font-bold tracking-wide uppercase
                transition-all duration-300
                transform hover:scale-105 active:scale-95
                bg-gradient-to-r from-red-500 to-red-700
                hover:from-red-600 hover:to-red-800
                text-white shadow-lg hover:shadow-xl
              "
            >
              🔄 Reset Team
            </button>

            {/* Quick Stats */}
            {selectedPop && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 bg-opacity-80 rounded-lg border border-neon-blue border-opacity-50">
                <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse" />
                <span className="font-retro text-neon-blue font-semibold tracking-wide">
                  {selectedPop.name} selected
                </span>
              </div>
            )}

            {/* Completion Badge */}
            {completionPercentage === 100 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-hockey-gold to-yellow-500 rounded-lg text-black">
                <div className="text-xl">🏆</div>
                <span className="font-hockey font-black tracking-wide uppercase">
                  Team Complete!
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Application Content */}
      <main className="px-4 lg:px-8 pb-8">
        {activeTab === 'lineup' ? (
          // Lineup Builder View
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[2000px] mx-auto">
            {/* Pop Arsenal/Library */}
            <div className="order-2 xl:order-1">
              <PopLibrary
                pops={availablePops}
                onPopClick={handlePopClick}
                selectedPop={selectedPop}
              />
            </div>

            {/* Hockey Lineup Card */}
            <div className="order-1 xl:order-2">
              <LineupCard
                lineup={currentLineup}
                availablePops={availablePops}
                onPositionClick={handlePositionClick}
                onPopRemove={removePop}
                selectedPop={selectedPop}
              />
            </div>
          </div>
        ) : (
          // Collection Browser View
          <div className="max-w-[2000px] mx-auto">
            <CollectionBrowser pops={availablePops} />
          </div>
        )}
      </main>

      {/* Enhanced Instructions Panel */}
      <footer className="px-4 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="arena-display p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-hockey font-black text-neon-cyan tracking-widest uppercase mb-2">
                How to Play
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-retro text-ice-400 text-sm tracking-wide">
                  <strong className="text-neon-blue">Select</strong> a pop from the arsenal
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">🏒</div>
                <div className="font-retro text-ice-400 text-sm tracking-wide">
                  <strong className="text-hockey-gold">Assign</strong> to any lineup position
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-retro text-ice-400 text-sm tracking-wide">
                  <strong className="text-neon-green">Click</strong> filled slots to remove
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-retro text-ice-400 text-sm tracking-wide">
                  <strong className="text-hockey-silver">Complete</strong> your dream team
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 pt-4 border-t border-ice-700 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-green bg-opacity-20 rounded-full border border-neon-green border-opacity-50">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-xs font-retro text-neon-green tracking-wide uppercase">
                  Arena Systems Online | {INITIAL_POPS.length} Pops Loaded | Vintage Mode Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';

// Import centralized types, data, and components with proper type imports
import type { Position, Pop, Lineup } from './types';
import { INITIAL_POPS } from './data/pops';
import { LineupCard } from './components/LineupCard';
import { PopLibrary } from './components/PopLibrary';
import { TabNavigation } from './components/TabNavigation';
import { CollectionBrowser } from './components/CollectionBrowser';
import { CreatePopModal } from './components/CreatePopModal';
import { PopCards } from './components/PopCards';

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
  const [availablePops, setAvailablePops] = useState<Pop[]>([]);
  const [activeTab, setActiveTab] = useState<'lineup' | 'collection' | 'pop-cards'>('lineup');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load pops from localStorage or use initial pops
  useEffect(() => {
    const savedCustomPops = localStorage.getItem('customPops');
    const customPops = savedCustomPops ? JSON.parse(savedCustomPops) : [];
    setAvailablePops([...INITIAL_POPS, ...customPops]);
  }, []);

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


  const handlePopClick = (pop: Pop) => {
    setSelectedPop(selectedPop?.id === pop.id ? null : pop);
  };

  const handleCreatePop = (newPop: Pop) => {
    // Add to available pops
    setAvailablePops(prev => [...prev, newPop]);

    // Save custom pops to localStorage
    const savedCustomPops = localStorage.getItem('customPops');
    const existingCustomPops = savedCustomPops ? JSON.parse(savedCustomPops) : [];
    const updatedCustomPops = [...existingCustomPops, newPop];
    localStorage.setItem('customPops', JSON.stringify(updatedCustomPops));

    // Auto-select the new pop
    setSelectedPop(newPop);
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
              Build your ultimate diet pop hockey team
            </p>
          </div>

          {/* Enhanced Scoreboard Stats */}
          <div className="flex justify-center mb-6">
            {/* Current Database */}
            <div className="text-center">
              <div className="hockey-line-header bg-gradient-to-r from-hockey-silver to-gray-400 text-black mb-2">
                Current Database
              </div>
              <div className="text-2xl font-hockey font-black text-hockey-silver">
                {availablePops.length}
              </div>
            </div>
          </div>

          {/* Enhanced Control Panel */}
          <div className="flex flex-wrap items-center justify-center gap-4">

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
          <div className="space-y-8 max-w-[2000px] mx-auto">
            {/* Arsenal and Lineup Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Pop Arsenal/Library */}
              <div className="order-2 xl:order-1">
                <PopLibrary
                  pops={availablePops}
                  onPopClick={handlePopClick}
                  selectedPop={selectedPop}
                  onAddCustomPop={() => setShowCreateModal(true)}
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
          </div>
        ) : activeTab === 'collection' ? (
          // Collection Browser View
          <div className="max-w-[2000px] mx-auto">
            <CollectionBrowser pops={availablePops} />
          </div>
        ) : (
          // Pop Cards View
          <PopCards pops={availablePops} />
        )}
      </main>


      {/* Create Pop Modal */}
      <CreatePopModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePop={handleCreatePop}
      />
    </div>
  );
}

export default App;
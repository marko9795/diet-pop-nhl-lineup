import React from 'react';
import { useAppState } from './hooks/useAppState';
import { Position } from './types';
import { LineupCard } from './components/LineupCard';
import { PopLibrary } from './components/PopLibrary';
import { PositionModal } from './components/PositionModal';
import { CreateCustomPopModal } from './components/CreateCustomPopModal';

function App() {
  const {
    currentLineup,
    availablePops,
    selectedPop,
    showPositionModal,
    showCreatePopModal,
    getAllPops,
    assignPop,
    removePop,
    clearLineup,
    addCustomPop,
    selectPop,
    setShowPositionModal,
    setShowCreatePopModal
  } = useAppState();

  // Get occupied positions for modal
  const occupiedPositions = new Set<Position>(
    Object.entries(currentLineup.positions)
      .filter(([_, popId]) => popId !== null)
      .map(([position, _]) => position as Position)
  );

  // Handle pop selection from library
  const handlePopClick = (pop: any) => {
    selectPop(pop);
  };

  // Handle position selection from modal
  const handlePositionSelect = (position: Position) => {
    if (selectedPop) {
      assignPop(selectedPop.id, position);
    }
  };

  // Handle position click from lineup (for reassignment)
  const handlePositionClick = (position: Position) => {
    const currentPopId = currentLineup.positions[position];
    if (currentPopId) {
      // If position is occupied, allow reassignment by opening the pop in selection modal
      const currentPop = availablePops.find(pop => pop.id === currentPopId);
      if (currentPop) {
        selectPop(currentPop);
      }
    } else {
      // If position is empty, we need to select a pop first
      // For now, just show a message. In a real app, you might want to highlight the library
      console.log('Select a pop from the library first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-hockey">
                🥤 Diet Pop NHL Lineup
              </h1>
              <p className="text-gray-400 mt-1">
                Organize your favorite diet sodas into hockey formations
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreatePopModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              >
                Add Custom Pop
              </button>
              <button
                onClick={clearLineup}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
                title="Clear entire lineup"
              >
                Clear Lineup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pop Library */}
          <div className="order-2 lg:order-1">
            <PopLibrary
              pops={availablePops}
              onPopClick={handlePopClick}
              onAddCustomPop={() => setShowCreatePopModal(true)}
            />
          </div>

          {/* Lineup Card */}
          <div className="order-1 lg:order-2">
            <LineupCard
              lineup={currentLineup}
              availablePops={availablePops}
              onPositionClick={handlePositionClick}
              onPopRemove={removePop}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <PositionModal
        isOpen={showPositionModal}
        pop={selectedPop}
        occupiedPositions={occupiedPositions}
        onSelectPosition={handlePositionSelect}
        onClose={() => {
          setShowPositionModal(false);
          selectPop(null);
        }}
      />

      {/* Custom Pop Modal */}
      <CreateCustomPopModal
        isOpen={showCreatePopModal}
        onCreatePop={addCustomPop}
        onClose={() => setShowCreatePopModal(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>
            Diet Pop NHL Lineup App - Organize your favorite diet sodas into hockey formations
          </p>
          <div className="mt-2 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
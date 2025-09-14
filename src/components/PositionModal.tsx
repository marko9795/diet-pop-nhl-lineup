import React from 'react';
import { Pop, Position, POSITION_INFO } from '../types';
import { PopCan } from './PopCan';

interface PositionModalProps {
  isOpen: boolean;
  pop: Pop | null;
  occupiedPositions: Set<Position>;
  onSelectPosition: (position: Position) => void;
  onClose: () => void;
}

export const PositionModal: React.FC<PositionModalProps> = ({
  isOpen,
  pop,
  occupiedPositions,
  onSelectPosition,
  onClose
}) => {
  if (!isOpen || !pop) return null;

  const forwardPositions: Position[] = [
    '1LW', '1C', '1RW',
    '2LW', '2C', '2RW',
    '3LW', '3C', '3RW',
    '4LW', '4C', '4RW'
  ];

  const defensePositions: Position[] = [
    '1LD', '1RD',
    '2LD', '2RD',
    '3LD', '3RD'
  ];

  const handlePositionClick = (position: Position) => {
    onSelectPosition(position);
    onClose();
  };

  const isPositionOccupied = (position: Position) => occupiedPositions.has(position);

  const PositionButton: React.FC<{ position: Position }> = ({ position }) => {
    const info = POSITION_INFO[position];
    const occupied = isPositionOccupied(position);

    return (
      <button
        onClick={() => !occupied && handlePositionClick(position)}
        disabled={occupied}
        className={`
          p-3 rounded-lg border text-center transition-all duration-200
          ${occupied
            ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 border-gray-600 text-white hover:bg-blue-900 hover:border-blue-500'
          }
        `}
      >
        <div className="font-semibold text-sm">{info.label}</div>
        {occupied && (
          <div className="text-xs text-gray-500 mt-1">Occupied</div>
        )}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <PopCan pop={pop} size="medium" showName={false} />
            <div>
              <h3 className="text-xl font-bold text-white">{pop.name}</h3>
              <p className="text-gray-400">Select a position for this pop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Forward Positions */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Forward Lines</h4>
          <div className="grid grid-cols-3 gap-2">
            {/* 1st Line */}
            <div className="col-span-3 text-sm text-gray-400 mb-1">1st Line</div>
            {forwardPositions.slice(0, 3).map(position => (
              <PositionButton key={position} position={position} />
            ))}

            {/* 2nd Line */}
            <div className="col-span-3 text-sm text-gray-400 mb-1 mt-3">2nd Line</div>
            {forwardPositions.slice(3, 6).map(position => (
              <PositionButton key={position} position={position} />
            ))}

            {/* 3rd Line */}
            <div className="col-span-3 text-sm text-gray-400 mb-1 mt-3">3rd Line</div>
            {forwardPositions.slice(6, 9).map(position => (
              <PositionButton key={position} position={position} />
            ))}

            {/* 4th Line */}
            <div className="col-span-3 text-sm text-gray-400 mb-1 mt-3">4th Line</div>
            {forwardPositions.slice(9, 12).map(position => (
              <PositionButton key={position} position={position} />
            ))}
          </div>
        </div>

        {/* Defense Positions */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Defense Pairs</h4>
          <div className="grid grid-cols-2 gap-2">
            {/* 1st Pair */}
            <div className="col-span-2 text-sm text-gray-400 mb-1">1st Pair</div>
            {defensePositions.slice(0, 2).map(position => (
              <PositionButton key={position} position={position} />
            ))}

            {/* 2nd Pair */}
            <div className="col-span-2 text-sm text-gray-400 mb-1 mt-3">2nd Pair</div>
            {defensePositions.slice(2, 4).map(position => (
              <PositionButton key={position} position={position} />
            ))}

            {/* 3rd Pair */}
            <div className="col-span-2 text-sm text-gray-400 mb-1 mt-3">3rd Pair</div>
            {defensePositions.slice(4, 6).map(position => (
              <PositionButton key={position} position={position} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
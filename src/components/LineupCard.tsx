import React from 'react';
import { Lineup, Position, POSITION_INFO, Pop } from '../types';
import { PopCan } from './PopCan';

interface LineupCardProps {
  lineup: Lineup;
  availablePops: Pop[];
  onPositionClick: (position: Position) => void;
  onPopRemove?: (position: Position) => void;
}

interface PositionSlotProps {
  position: Position;
  pop: Pop | null;
  onClick: () => void;
  onRemove?: () => void;
}

const PositionSlot: React.FC<PositionSlotProps> = ({ position, pop, onClick, onRemove }) => {
  const positionInfo = POSITION_INFO[position];

  return (
    <div className="flex flex-col items-center">
      {/* Position Label */}
      <div className="position-label text-center mb-1">
        {positionInfo.label}
      </div>

      {/* Position Slot */}
      <div
        className={`lineup-position ${pop ? 'filled' : 'empty'} relative group`}
        onClick={onClick}
      >
        {pop ? (
          <div className="relative">
            <PopCan
              pop={pop}
              size="small"
              showName={false}
              className="pointer-events-none"
            />
            {/* Remove button - shows on hover */}
            {onRemove && (
              <button
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                title="Remove from lineup"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            <div className="text-2xl">+</div>
            <div className="text-xs">Click to assign</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const LineupCard: React.FC<LineupCardProps> = ({
  lineup,
  availablePops,
  onPositionClick,
  onPopRemove
}) => {
  // Get pop for a position
  const getPopForPosition = (position: Position): Pop | null => {
    const popId = lineup.positions[position];
    if (!popId) return null;
    return availablePops.find(pop => pop.id === popId) || null;
  };

  // Forward lines configuration
  const forwardLines = [
    { line: 1, positions: ['1LW', '1C', '1RW'] as Position[], label: '1st Line' },
    { line: 2, positions: ['2LW', '2C', '2RW'] as Position[], label: '2nd Line' },
    { line: 3, positions: ['3LW', '3C', '3RW'] as Position[], label: '3rd Line' },
    { line: 4, positions: ['4LW', '4C', '4RW'] as Position[], label: '4th Line' },
  ];

  // Defense pairs configuration
  const defensePairs = [
    { pair: 1, positions: ['1LD', '1RD'] as Position[], label: '1st Pair' },
    { pair: 2, positions: ['2LD', '2RD'] as Position[], label: '2nd Pair' },
    { pair: 3, positions: ['3LD', '3RD'] as Position[], label: '3rd Pair' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white font-hockey">
          {lineup.name}
        </h2>
        <div className="text-sm text-gray-400 mt-1">
          Hockey Lineup Card
        </div>
      </div>

      {/* Forward Lines */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          Forward Lines
        </h3>
        <div className="space-y-4">
          {forwardLines.map(({ line, positions, label }) => (
            <div key={line} className="hockey-line">
              <div className="text-sm font-semibold text-gray-300 mb-2 text-center">
                {label}
              </div>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {positions.map((position) => (
                  <PositionSlot
                    key={position}
                    position={position}
                    pop={getPopForPosition(position)}
                    onClick={() => onPositionClick(position)}
                    onRemove={onPopRemove ? () => onPopRemove(position) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Pairs */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          Defense Pairs
        </h3>
        <div className="space-y-4">
          {defensePairs.map(({ pair, positions, label }) => (
            <div key={pair} className="hockey-line">
              <div className="text-sm font-semibold text-gray-300 mb-2 text-center">
                {label}
              </div>
              <div className="grid grid-cols-2 gap-8 justify-items-center">
                {positions.map((position) => (
                  <PositionSlot
                    key={position}
                    position={position}
                    pop={getPopForPosition(position)}
                    onClick={() => onPositionClick(position)}
                    onRemove={onPopRemove ? () => onPopRemove(position) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lineup Stats */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <span className="text-white font-semibold">Completion:</span>{' '}
            {Math.round((Object.values(lineup.positions).filter(Boolean).length / 18) * 100)}%
          </div>
          <div>
            <span className="text-white font-semibold">Assigned:</span>{' '}
            {Object.values(lineup.positions).filter(Boolean).length}/18
          </div>
        </div>
      </div>
    </div>
  );
};
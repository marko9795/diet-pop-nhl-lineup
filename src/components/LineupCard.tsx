import React from 'react';
import type { Lineup, Position, Pop } from '../types';
import { POSITION_INFO } from '../types';
import { PopCan } from './PopCan';

interface LineupCardProps {
  lineup: Lineup;
  availablePops: Pop[];
  onPositionClick: (position: Position) => void;
  onPopRemove?: (position: Position) => void;
  selectedPop?: Pop | null;
}

interface PositionSlotProps {
  position: Position;
  pop: Pop | null;
  onClick: () => void;
  onRemove?: () => void;
  isHighlighted?: boolean;
}

const PositionSlot: React.FC<PositionSlotProps> = ({
  position,
  pop,
  onClick,
  onRemove,
  isHighlighted = false
}) => {
  const positionInfo = POSITION_INFO[position];

  return (
    <div className="flex flex-col items-center group">
      {/* Enhanced Position Label */}
      <div className="position-label text-center mb-2 font-retro tracking-widest">
        {positionInfo.label}
      </div>

      {/* Enhanced Position Slot */}
      <div
        className={`
          lineup-position
          ${pop ? 'filled' : 'empty'}
          ${isHighlighted ? 'ring-2 ring-hockey-gold ring-opacity-80' : ''}
          relative group cursor-pointer
          transform transition-all duration-300
          hover:scale-105 active:scale-95
        `}
        onClick={onClick}
      >
        {pop ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <PopCan
              pop={pop}
              size="small"
              showName={false}
              className="pointer-events-none"
            />

            {/* Enhanced Remove button */}
            {onRemove && (
              <button
                className="
                  absolute -top-2 -right-2 w-6 h-6
                  bg-gradient-to-br from-red-500 to-red-700
                  text-white text-sm font-bold rounded-full
                  border-2 border-white
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                  hover:scale-110 active:scale-95
                  shadow-lg hover:shadow-xl
                  flex items-center justify-center
                "
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
          <div className="text-center flex flex-col items-center justify-center w-full h-full text-ice-400">
            <div className="text-3xl mb-1 opacity-60">+</div>
            <div className="text-xs font-retro tracking-wide opacity-80">
              ASSIGN
            </div>
          </div>
        )}

        {/* Slot Animation Effect */}
        {isHighlighted && (
          <div className="absolute inset-0 rounded-lg border-2 border-hockey-gold animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export const LineupCard: React.FC<LineupCardProps> = ({
  lineup,
  availablePops,
  onPositionClick,
  onPopRemove,
  selectedPop
}) => {
  // Get pop for a position
  const getPopForPosition = (position: Position): Pop | null => {
    const popId = lineup.positions[position];
    if (!popId) return null;
    return availablePops.find(pop => pop.id === popId) || null;
  };

  // Forward lines configuration with enhanced styling
  const forwardLines = [
    { line: 1, positions: ['1LW', '1C', '1RW'] as Position[], label: '1st Line', color: 'from-hockey-gold to-yellow-500' },
    { line: 2, positions: ['2LW', '2C', '2RW'] as Position[], label: '2nd Line', color: 'from-hockey-silver to-gray-400' },
    { line: 3, positions: ['3LW', '3C', '3RW'] as Position[], label: '3rd Line', color: 'from-hockey-bronze to-orange-600' },
    { line: 4, positions: ['4LW', '4C', '4RW'] as Position[], label: '4th Line', color: 'from-ice-400 to-blue-400' },
  ];

  // Defense pairs configuration with enhanced styling
  const defensePairs = [
    { pair: 1, positions: ['1LD', '1RD'] as Position[], label: '1st Pair', color: 'from-hockey-gold to-yellow-500' },
    { pair: 2, positions: ['2LD', '2RD'] as Position[], label: '2nd Pair', color: 'from-hockey-silver to-gray-400' },
    { pair: 3, positions: ['3LD', '3RD'] as Position[], label: '3rd Pair', color: 'from-hockey-bronze to-orange-600' },
  ];

  const completionPercentage = Math.round((Object.values(lineup.positions).filter(Boolean).length / 18) * 100);
  const assignedCount = Object.values(lineup.positions).filter(Boolean).length;

  return (
    <div className="hockey-card p-8 animate-fade-in">
      {/* Vintage Hockey Card Header */}
      <div className="text-center mb-8 relative">
        <div className="inline-block relative">
          <h2 className="text-4xl font-hockey font-black text-white mb-2 tracking-wider uppercase">
            {lineup.name}
          </h2>
          <div className="absolute inset-0 text-4xl font-hockey font-black text-neon-blue opacity-30 blur-sm tracking-wider uppercase">
            {lineup.name}
          </div>
        </div>
        <div className="hockey-line-header inline-block text-sm mt-3 px-4 py-1">
          ⚡ DIET POP HOCKEY LINEUP ⚡
        </div>
      </div>

      {/* Forward Lines Section */}
      <div className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent flex-1"></div>
          <h3 className="text-xl font-hockey font-black text-neon-blue mx-4 tracking-widest neon-text">
            FORWARDS
          </h3>
          <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent flex-1"></div>
        </div>

        <div className="space-y-6">
          {forwardLines.map(({ line, positions, label, color }) => (
            <div key={line} className="relative">
              {/* Line Header */}
              <div className="flex items-center justify-center mb-4">
                <div className={`hockey-line-header bg-gradient-to-r ${color} text-black`}>
                  {label}
                </div>
              </div>

              {/* Position Grid */}
              <div className="grid grid-cols-3 gap-6 justify-items-center px-4">
                {positions.map((position) => (
                  <PositionSlot
                    key={position}
                    position={position}
                    pop={getPopForPosition(position)}
                    onClick={() => onPositionClick(position)}
                    onRemove={onPopRemove ? () => onPopRemove(position) : undefined}
                    isHighlighted={selectedPop !== null && selectedPop !== undefined && !getPopForPosition(position)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Pairs Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent flex-1"></div>
          <h3 className="text-xl font-hockey font-black text-neon-green mx-4 tracking-widest neon-text">
            DEFENSE
          </h3>
          <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent flex-1"></div>
        </div>

        <div className="space-y-6">
          {defensePairs.map(({ pair, positions, label, color }) => (
            <div key={pair} className="relative">
              {/* Pair Header */}
              <div className="flex items-center justify-center mb-4">
                <div className={`hockey-line-header bg-gradient-to-r ${color} text-black`}>
                  {label}
                </div>
              </div>

              {/* Position Grid */}
              <div className="grid grid-cols-2 gap-12 justify-items-center px-8">
                {positions.map((position) => (
                  <PositionSlot
                    key={position}
                    position={position}
                    pop={getPopForPosition(position)}
                    onClick={() => onPositionClick(position)}
                    onRemove={onPopRemove ? () => onPopRemove(position) : undefined}
                    isHighlighted={selectedPop !== null && selectedPop !== undefined && !getPopForPosition(position)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Lineup Stats */}
      <div className="border-t border-ice-600 pt-6 mt-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          {/* Completion Percentage */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-hockey font-black text-neon-blue mb-1">
              {completionPercentage}%
            </div>
            <div className="text-xs font-retro text-ice-400 tracking-wide uppercase">
              Complete
            </div>
          </div>

          {/* Assigned Count */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-hockey font-black text-hockey-gold mb-1">
              {assignedCount}/18
            </div>
            <div className="text-xs font-retro text-ice-400 tracking-wide uppercase">
              Assigned
            </div>
          </div>

          {/* Empty Slots */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-hockey font-black text-ice-500 mb-1">
              {18 - assignedCount}
            </div>
            <div className="text-xs font-retro text-ice-400 tracking-wide uppercase">
              Empty
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-ice-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-hockey-gold transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
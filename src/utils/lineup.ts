import type { Lineup, Position, Pop } from '../types';
import { POSITION_INFO } from '../types';

// Create an empty lineup
export const createEmptyLineup = (name = 'My Lineup'): Lineup => ({
  id: crypto.randomUUID(),
  name,
  positions: {
    // Forward Lines
    '1C': null, '1LW': null, '1RW': null,
    '2C': null, '2LW': null, '2RW': null,
    '3C': null, '3LW': null, '3RW': null,
    '4C': null, '4LW': null, '4RW': null,
    // Defense Pairs
    '1LD': null, '1RD': null,
    '2LD': null, '2RD': null,
    '3LD': null, '3RD': null,
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Check if a pop is already assigned to any position
export const isPopAssigned = (lineup: Lineup, popId: string): Position | null => {
  for (const [position, assignedPopId] of Object.entries(lineup.positions)) {
    if (assignedPopId === popId) {
      return position as Position;
    }
  }
  return null;
};

// Assign a pop to a position
export const assignPopToPosition = (
  lineup: Lineup,
  popId: string,
  position: Position
): Lineup => {
  // First, check if the pop is already assigned elsewhere and remove it
  const currentPosition = isPopAssigned(lineup, popId);
  const updatedPositions = { ...lineup.positions };

  if (currentPosition) {
    updatedPositions[currentPosition] = null;
  }

  // Assign to new position
  updatedPositions[position] = popId;

  return {
    ...lineup,
    positions: updatedPositions,
    updatedAt: new Date()
  };
};

// Remove a pop from a position
export const removePopFromPosition = (lineup: Lineup, position: Position): Lineup => ({
  ...lineup,
  positions: {
    ...lineup.positions,
    [position]: null
  },
  updatedAt: new Date()
});

// Get all assigned pops in the lineup
export const getAssignedPops = (lineup: Lineup): string[] => {
  return Object.values(lineup.positions).filter((popId): popId is string => popId !== null);
};

// Get lineup completion percentage
export const getLineupCompletion = (lineup: Lineup): number => {
  const totalPositions = Object.keys(lineup.positions).length;
  const filledPositions = getAssignedPops(lineup).length;
  return Math.round((filledPositions / totalPositions) * 100);
};

// Get positions by line for display purposes
export const getLinePositions = (line: number, type: 'forward' | 'defense'): Position[] => {
  return Object.keys(POSITION_INFO).filter(pos => {
    const info = POSITION_INFO[pos as Position];
    return info.line === line && info.type === type;
  }) as Position[];
};

// Swap two positions
export const swapPositions = (
  lineup: Lineup,
  position1: Position,
  position2: Position
): Lineup => {
  const pop1 = lineup.positions[position1];
  const pop2 = lineup.positions[position2];

  return {
    ...lineup,
    positions: {
      ...lineup.positions,
      [position1]: pop2,
      [position2]: pop1
    },
    updatedAt: new Date()
  };
};

// Move a pop to a different position (handles existing assignments)
export const movePopToPosition = (
  lineup: Lineup,
  fromPosition: Position,
  toPosition: Position
): Lineup => {
  const popId = lineup.positions[fromPosition];
  if (!popId) return lineup;

  // If target position is occupied, swap them
  if (lineup.positions[toPosition]) {
    return swapPositions(lineup, fromPosition, toPosition);
  }

  // Otherwise, just move the pop
  return {
    ...lineup,
    positions: {
      ...lineup.positions,
      [fromPosition]: null,
      [toPosition]: popId
    },
    updatedAt: new Date()
  };
};

// Get lineup statistics
export interface LineupStats {
  totalPops: number;
  forwardLines: {
    line: number;
    filled: number;
    total: number;
    percentage: number;
  }[];
  defensePairs: {
    pair: number;
    filled: number;
    total: number;
    percentage: number;
  }[];
  brands: Record<string, number>;
  avgCaffeine: number;
}

export const getLineupStats = (lineup: Lineup, availablePops: Pop[]): LineupStats => {
  const assignedPopIds = getAssignedPops(lineup);
  const assignedPops = assignedPopIds.map(id =>
    availablePops.find(pop => pop.id === id)
  ).filter(Boolean);

  // Calculate forward line stats
  const forwardLines = [1, 2, 3, 4].map(line => {
    const positions = getLinePositions(line, 'forward');
    const filled = positions.filter(pos => lineup.positions[pos] !== null).length;
    return {
      line,
      filled,
      total: positions.length,
      percentage: Math.round((filled / positions.length) * 100)
    };
  });

  // Calculate defense pair stats
  const defensePairs = [1, 2, 3].map(pair => {
    const positions = getLinePositions(pair, 'defense');
    const filled = positions.filter(pos => lineup.positions[pos] !== null).length;
    return {
      pair,
      filled,
      total: positions.length,
      percentage: Math.round((filled / positions.length) * 100)
    };
  });

  // Calculate brand distribution
  const brands: Record<string, number> = {};
  assignedPops.forEach(pop => {
    if (pop) {
      brands[pop.brand] = (brands[pop.brand] || 0) + 1;
    }
  });

  // Calculate average caffeine
  const totalCaffeine = assignedPops.reduce((sum, pop) => sum + (pop?.caffeine || 0), 0);
  const avgCaffeine = assignedPops.length > 0 ? Math.round(totalCaffeine / assignedPops.length) : 0;

  return {
    totalPops: assignedPopIds.length,
    forwardLines,
    defensePairs,
    brands,
    avgCaffeine
  };
};
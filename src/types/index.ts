// Core types for Diet Pop NHL Lineup App

export interface Pop {
  id: string;
  name: string;
  brand: string;
  flavor?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  isCustom: boolean;
  description?: string;
  caffeine?: number; // mg
  calories?: number;
  year?: number; // for limited editions
}

export interface CustomPop extends Pop {
  isCustom: true;
  createdAt: Date;
  baseBrand: string; // What brand style it's based on
}

export type Position =
  // Forward positions
  | '1C' | '1LW' | '1RW'  // 1st line
  | '2C' | '2LW' | '2RW'  // 2nd line
  | '3C' | '3LW' | '3RW'  // 3rd line
  | '4C' | '4LW' | '4RW'  // 4th line
  // Defense positions
  | '1LD' | '1RD'  // 1st pair
  | '2LD' | '2RD'  // 2nd pair
  | '3LD' | '3RD'; // 3rd pair

export interface LineupPosition {
  position: Position;
  popId: string | null;
  line: number; // 1-4 for forwards, 1-3 for defense
  side?: 'L' | 'R' | 'C'; // Left, Right, Center
  type: 'forward' | 'defense';
}

export interface Lineup {
  id: string;
  name: string;
  positions: Record<Position, string | null>; // position -> popId
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  currentLineup: Lineup;
  customPops: CustomPop[];
  availablePops: Pop[];
  selectedPop: Pop | null;
  showPositionModal: boolean;
  showCreatePopModal: boolean;
}

// Position metadata for display and validation
export const POSITION_INFO: Record<Position, {
  label: string;
  line: number;
  type: 'forward' | 'defense';
  side?: 'L' | 'R' | 'C';
}> = {
  // 1st Line
  '1C': { label: '1st Line C', line: 1, type: 'forward', side: 'C' },
  '1LW': { label: '1st Line LW', line: 1, type: 'forward', side: 'L' },
  '1RW': { label: '1st Line RW', line: 1, type: 'forward', side: 'R' },

  // 2nd Line
  '2C': { label: '2nd Line C', line: 2, type: 'forward', side: 'C' },
  '2LW': { label: '2nd Line LW', line: 2, type: 'forward', side: 'L' },
  '2RW': { label: '2nd Line RW', line: 2, type: 'forward', side: 'R' },

  // 3rd Line
  '3C': { label: '3rd Line C', line: 3, type: 'forward', side: 'C' },
  '3LW': { label: '3rd Line LW', line: 3, type: 'forward', side: 'L' },
  '3RW': { label: '3rd Line RW', line: 3, type: 'forward', side: 'R' },

  // 4th Line
  '4C': { label: '4th Line C', line: 4, type: 'forward', side: 'C' },
  '4LW': { label: '4th Line LW', line: 4, type: 'forward', side: 'L' },
  '4RW': { label: '4th Line RW', line: 4, type: 'forward', side: 'R' },

  // 1st Pair
  '1LD': { label: '1st Pair LD', line: 1, type: 'defense', side: 'L' },
  '1RD': { label: '1st Pair RD', line: 1, type: 'defense', side: 'R' },

  // 2nd Pair
  '2LD': { label: '2nd Pair LD', line: 2, type: 'defense', side: 'L' },
  '2RD': { label: '2nd Pair RD', line: 2, type: 'defense', side: 'R' },

  // 3rd Pair
  '3LD': { label: '3rd Pair LD', line: 3, type: 'defense', side: 'L' },
  '3RD': { label: '3rd Pair RD', line: 3, type: 'defense', side: 'R' },
};

// Utility functions for positions
export const getAllPositions = (): Position[] => Object.keys(POSITION_INFO) as Position[];

export const getForwardPositions = (): Position[] =>
  getAllPositions().filter(pos => POSITION_INFO[pos].type === 'forward');

export const getDefensePositions = (): Position[] =>
  getAllPositions().filter(pos => POSITION_INFO[pos].type === 'defense');

export const getPositionsByLine = (line: number, type: 'forward' | 'defense'): Position[] =>
  getAllPositions().filter(pos =>
    POSITION_INFO[pos].line === line && POSITION_INFO[pos].type === type
  );
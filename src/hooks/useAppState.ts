import { useState, useEffect, useCallback } from 'react';
import { AppState, Pop, CustomPop, Lineup, Position } from '../types';
import { INITIAL_POPS } from '../data/pops';
import { createEmptyLineup, assignPopToPosition, removePopFromPosition } from '../utils/lineup';
import {
  loadLineup,
  saveLineup,
  loadCustomPops,
  saveCustomPops,
  addCustomPop as addCustomPopToStorage
} from '../utils/storage';

interface UseAppStateReturn extends AppState {
  // Pop management
  getAllPops: () => Pop[];
  getPopById: (id: string) => Pop | undefined;

  // Lineup management
  assignPop: (popId: string, position: Position) => void;
  removePop: (position: Position) => void;
  clearLineup: () => void;

  // Custom pops
  addCustomPop: (customPop: Omit<CustomPop, 'id' | 'createdAt'>) => void;
  removeCustomPop: (popId: string) => void;

  // UI state management
  selectPop: (pop: Pop | null) => void;
  setShowPositionModal: (show: boolean) => void;
  setShowCreatePopModal: (show: boolean) => void;

  // Auto-save
  isAutoSaveEnabled: boolean;
  toggleAutoSave: () => void;
}

export const useAppState = (): UseAppStateReturn => {
  // Initialize state
  const [currentLineup, setCurrentLineup] = useState<Lineup>(() => loadLineup());
  const [customPops, setCustomPops] = useState<CustomPop[]>(() => loadCustomPops());
  const [selectedPop, setSelectedPop] = useState<Pop | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [showCreatePopModal, setShowCreatePopModal] = useState(false);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);

  // Auto-save lineup whenever it changes
  useEffect(() => {
    if (isAutoSaveEnabled) {
      saveLineup(currentLineup);
    }
  }, [currentLineup, isAutoSaveEnabled]);

  // Auto-save custom pops whenever they change
  useEffect(() => {
    if (isAutoSaveEnabled) {
      saveCustomPops(customPops);
    }
  }, [customPops, isAutoSaveEnabled]);

  // Get all available pops (standard + custom)
  const getAllPops = useCallback((): Pop[] => {
    return [...INITIAL_POPS, ...customPops];
  }, [customPops]);

  // Get pop by ID from all available pops
  const getPopById = useCallback((id: string): Pop | undefined => {
    const allPops = getAllPops();
    return allPops.find(pop => pop.id === id);
  }, [getAllPops]);

  // Assign a pop to a position
  const assignPop = useCallback((popId: string, position: Position) => {
    const pop = getPopById(popId);
    if (!pop) {
      console.error(`Pop with id ${popId} not found`);
      return;
    }

    const newLineup = assignPopToPosition(currentLineup, popId, position);
    setCurrentLineup(newLineup);

    // Close modals after assignment
    setSelectedPop(null);
    setShowPositionModal(false);
  }, [currentLineup, getPopById]);

  // Remove a pop from a position
  const removePop = useCallback((position: Position) => {
    const newLineup = removePopFromPosition(currentLineup, position);
    setCurrentLineup(newLineup);
  }, [currentLineup]);

  // Clear entire lineup
  const clearLineup = useCallback(() => {
    const emptyLineup = createEmptyLineup(currentLineup.name);
    emptyLineup.id = currentLineup.id; // Keep the same ID
    setCurrentLineup(emptyLineup);
  }, [currentLineup.name, currentLineup.id]);

  // Add a custom pop
  const addCustomPop = useCallback((customPopData: Omit<CustomPop, 'id' | 'createdAt'>) => {
    const newCustomPop: CustomPop = {
      ...customPopData,
      id: crypto.randomUUID(),
      isCustom: true,
      createdAt: new Date()
    };

    // Add to state
    setCustomPops(prev => [...prev, newCustomPop]);

    // Also save to storage immediately
    if (isAutoSaveEnabled) {
      addCustomPopToStorage(newCustomPop);
    }

    // Close create modal
    setShowCreatePopModal(false);
  }, [isAutoSaveEnabled]);

  // Remove a custom pop
  const removeCustomPop = useCallback((popId: string) => {
    // Remove from state
    setCustomPops(prev => prev.filter(pop => pop.id !== popId));

    // Also remove from lineup if it's assigned
    const isAssigned = Object.values(currentLineup.positions).includes(popId);
    if (isAssigned) {
      const newPositions = { ...currentLineup.positions };
      Object.keys(newPositions).forEach(pos => {
        if (newPositions[pos as Position] === popId) {
          newPositions[pos as Position] = null;
        }
      });

      setCurrentLineup(prev => ({
        ...prev,
        positions: newPositions,
        updatedAt: new Date()
      }));
    }
  }, [currentLineup]);

  // UI state management
  const selectPop = useCallback((pop: Pop | null) => {
    setSelectedPop(pop);
    if (pop) {
      setShowPositionModal(true);
    }
  }, []);

  // Toggle auto-save
  const toggleAutoSave = useCallback(() => {
    setIsAutoSaveEnabled(prev => !prev);
  }, []);

  // Build app state
  const appState: UseAppStateReturn = {
    currentLineup,
    customPops,
    availablePops: getAllPops(),
    selectedPop,
    showPositionModal,
    showCreatePopModal,

    // Methods
    getAllPops,
    getPopById,
    assignPop,
    removePop,
    clearLineup,
    addCustomPop,
    removeCustomPop,
    selectPop,
    setShowPositionModal,
    setShowCreatePopModal,
    isAutoSaveEnabled,
    toggleAutoSave
  };

  return appState;
};
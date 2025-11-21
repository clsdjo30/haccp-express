/**
 * Cleaning store using Zustand
 * Manages equipment and cleaning validations with MMKV persistence
 */

/* eslint-disable max-lines-per-function */
import { create } from 'zustand';

import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';

import type {
  CleaningValidation,
  Equipment,
  EquipmentWithLatestValidation,
} from '../types';

type CleaningValidationInput = {
  equipmentId: string;
  taskId: string;
  userId: string;
  userName: string;
  notes?: string;
};

type CleaningStore = {
  // State
  equipments: Equipment[];
  validations: CleaningValidation[];
  scannedEquipment: Equipment | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadData: () => void;
  scanQRCode: (qrCode: string) => Equipment | null;
  addValidation: (input: CleaningValidationInput) => CleaningValidation;
  getEquipmentById: (id: string) => Equipment | null;
  getEquipmentWithLatestValidation: (
    id: string
  ) => EquipmentWithLatestValidation | null;
  getValidationsByEquipmentId: (
    equipmentId: string,
    limit?: number
  ) => CleaningValidation[];
  getTodayValidationsCount: () => number;
  clearScannedEquipment: () => void;
  clearAllData: () => void;
};

/**
 * Cleaning store
 */
export const useCleaningStore = create<CleaningStore>((set, get) => ({
  // Initial state
  equipments: [],
  validations: [],
  scannedEquipment: null,
  isLoading: false,
  error: null,

  // Load data from MMKV storage
  loadData: () => {
    try {
      set({ isLoading: true, error: null });

      const equipmentsJson = storage.getString(STORAGE_KEYS.EQUIPMENTS);
      const validationsJson = storage.getString(
        STORAGE_KEYS.CLEANING_VALIDATIONS
      );

      const equipments = equipmentsJson
        ? (JSON.parse(equipmentsJson) as Equipment[])
        : [];
      const validations = validationsJson
        ? (JSON.parse(validationsJson) as CleaningValidation[])
        : [];

      set({ equipments, validations, isLoading: false });
    } catch (_error) {
      set({
        error: 'Erreur lors du chargement des équipements',
        isLoading: false,
      });
    }
  },

  // Scan QR code and find equipment
  scanQRCode: (qrCode) => {
    const equipment = get().equipments.find((e) => e.qrCode === qrCode);
    if (equipment) {
      set({ scannedEquipment: equipment });
      return equipment;
    }
    set({ scannedEquipment: null });
    return null;
  },

  // Add a new validation
  addValidation: (input) => {
    const equipment = get().equipments.find((e) => e.id === input.equipmentId);
    if (!equipment) {
      throw new Error('Equipment not found');
    }

    const task = equipment.cleaningTasks.find((t) => t.id === input.taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    // Create new validation
    const newValidation: CleaningValidation = {
      id: `validation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      equipmentId: input.equipmentId,
      equipmentName: equipment.name,
      taskId: input.taskId,
      taskName: task.name,
      timestamp: new Date().toISOString(),
      userId: input.userId,
      userName: input.userName,
      notes: input.notes,
    };

    // Add to store
    const updatedValidations = [...get().validations, newValidation];
    set({ validations: updatedValidations });

    // Persist to storage
    storage.set(
      STORAGE_KEYS.CLEANING_VALIDATIONS,
      JSON.stringify(updatedValidations)
    );

    return newValidation;
  },

  // Get equipment by ID
  getEquipmentById: (id) => {
    return get().equipments.find((e) => e.id === id) ?? null;
  },

  // Get equipment with latest validation
  getEquipmentWithLatestValidation: (id) => {
    const equipment = get().equipments.find((e) => e.id === id);
    if (!equipment) return null;

    const equipmentValidations = get()
      .validations.filter((v) => v.equipmentId === id)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return {
      ...equipment,
      latestValidation: equipmentValidations[0],
      validationsCount: equipmentValidations.length,
    };
  },

  // Get validations by equipment ID
  getValidationsByEquipmentId: (equipmentId, limit) => {
    const validations = get()
      .validations.filter((v) => v.equipmentId === equipmentId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return limit ? validations.slice(0, limit) : validations;
  },

  // Get count of validations created today
  getTodayValidationsCount: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return get().validations.filter((validation) => {
      const validationDate = new Date(validation.timestamp);
      validationDate.setHours(0, 0, 0, 0);
      return validationDate.getTime() === today.getTime();
    }).length;
  },

  // Clear scanned equipment
  clearScannedEquipment: () => {
    set({ scannedEquipment: null });
  },

  // Clear all data (for testing/reset)
  clearAllData: () => {
    set({ equipments: [], validations: [], scannedEquipment: null });
    storage.delete(STORAGE_KEYS.EQUIPMENTS);
    storage.delete(STORAGE_KEYS.CLEANING_VALIDATIONS);
  },
}));

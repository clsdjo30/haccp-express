/**
 * Checklist store using Zustand
 * Manages checklists and their entries with MMKV persistence
 */

import { create } from 'zustand';

import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';
import { validateTemperature } from '@/lib/validation';

import type {
  Checklist,
  ChecklistEntry,
  ChecklistEntryFormValues,
  ChecklistWithLatestEntry,
} from '../types';

type ChecklistStore = {
  // State
  checklists: Checklist[];
  entries: ChecklistEntry[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadData: () => void;
  addEntry: (
    checklistId: string,
    values: ChecklistEntryFormValues,
    userId: string,
    userName: string
  ) => ChecklistEntry;
  getChecklistWithLatestEntry: (id: string) => ChecklistWithLatestEntry | null;
  getChecklistsWithLatestEntries: () => ChecklistWithLatestEntry[];
  getEntriesByChecklistId: (
    checklistId: string,
    limit?: number
  ) => ChecklistEntry[];
  getTodayEntriesCount: () => number;
  clearAllData: () => void;
};

/**
 * Checklist store
 */
export const useChecklistStore = create<ChecklistStore>((set, get) => ({
  // Initial state
  checklists: [],
  entries: [],
  isLoading: false,
  error: null,

  // Load data from MMKV storage
  loadData: () => {
    try {
      set({ isLoading: true, error: null });

      const checklistsJson = storage.getString(STORAGE_KEYS.CHECKLISTS);
      const entriesJson = storage.getString(STORAGE_KEYS.CHECKLIST_ENTRIES);

      const checklists = checklistsJson
        ? (JSON.parse(checklistsJson) as Checklist[])
        : [];
      const entries = entriesJson
        ? (JSON.parse(entriesJson) as ChecklistEntry[])
        : [];

      set({ checklists, entries, isLoading: false });
    } catch (error) {
      set({
        error: 'Erreur lors du chargement des checklists',
        isLoading: false,
      });
    }
  },

  // Add a new entry
  addEntry: (checklistId, values, userId, userName) => {
    const checklist = get().checklists.find((c) => c.id === checklistId);
    if (!checklist) {
      throw new Error('Checklist not found');
    }

    // Validate temperature
    const validation = validateTemperature({
      value: values.value,
      min: checklist.thresholds.min,
      max: checklist.thresholds.max,
    });

    // Create new entry
    const newEntry: ChecklistEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      checklistId,
      value: values.value,
      unit: checklist.thresholds.unit,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      status: validation.status,
      notes: values.notes,
    };

    // Add to store
    const updatedEntries = [...get().entries, newEntry];
    set({ entries: updatedEntries });

    // Persist to storage
    storage.set(STORAGE_KEYS.CHECKLIST_ENTRIES, JSON.stringify(updatedEntries));

    return newEntry;
  },

  // Get checklist with latest entry
  getChecklistWithLatestEntry: (id) => {
    const checklist = get().checklists.find((c) => c.id === id);
    if (!checklist) return null;

    const checklistEntries = get()
      .entries.filter((e) => e.checklistId === id)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return {
      ...checklist,
      latestEntry: checklistEntries[0],
      entriesCount: checklistEntries.length,
    };
  },

  // Get all checklists with latest entries
  getChecklistsWithLatestEntries: () => {
    return get().checklists.map((checklist) => {
      const checklistEntries = get()
        .entries.filter((e) => e.checklistId === checklist.id)
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

      return {
        ...checklist,
        latestEntry: checklistEntries[0],
        entriesCount: checklistEntries.length,
      };
    });
  },

  // Get entries by checklist ID
  getEntriesByChecklistId: (checklistId, limit) => {
    const entries = get()
      .entries.filter((e) => e.checklistId === checklistId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return limit ? entries.slice(0, limit) : entries;
  },

  // Get count of entries created today
  getTodayEntriesCount: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return get().entries.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    }).length;
  },

  // Clear all data (for testing/reset)
  clearAllData: () => {
    set({ checklists: [], entries: [] });
    storage.delete(STORAGE_KEYS.CHECKLISTS);
    storage.delete(STORAGE_KEYS.CHECKLIST_ENTRIES);
  },
}));

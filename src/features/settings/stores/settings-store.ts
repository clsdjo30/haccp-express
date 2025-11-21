/**
 * Settings store using Zustand
 * Manages app settings and user preferences with MMKV persistence
 */

/* eslint-disable max-lines-per-function */
import { create } from 'zustand';

import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';

import type {
  AppLanguage,
  AppTheme,
  RestaurantSettings,
  UserSettings,
} from '../types';

type SettingsStore = {
  // State
  userSettings: UserSettings | null;
  restaurantSettings: RestaurantSettings | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadSettings: () => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  updateRestaurantSettings: (settings: Partial<RestaurantSettings>) => void;
  setTheme: (theme: AppTheme) => void;
  setLanguage: (language: AppLanguage) => void;
  clearAllSettings: () => void;
};

/**
 * Default user settings
 */
const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'light',
  language: 'fr',
  notificationsEnabled: true,
  soundEnabled: true,
  biometryEnabled: false,
};

/**
 * Default restaurant settings
 */
const DEFAULT_RESTAURANT_SETTINGS: RestaurantSettings = {
  restaurantName: 'Restaurant Demo',
  address: '',
  phone: '',
  email: '',
  siret: '',
  defaultPrintCopies: 1,
  autoSync: true,
  syncInterval: 30,
};

/**
 * Settings store
 */
export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // Initial state
  userSettings: null,
  restaurantSettings: null,
  isLoading: false,
  error: null,

  // Load settings from MMKV storage

  loadSettings: () => {
    try {
      set({ isLoading: true, error: null });

      const userJson = storage.getString(STORAGE_KEYS.USER_SETTINGS);
      const restaurantJson = storage.getString(
        STORAGE_KEYS.RESTAURANT_SETTINGS
      );

      const userSettings = userJson
        ? (JSON.parse(userJson) as UserSettings)
        : DEFAULT_USER_SETTINGS;
      const restaurantSettings = restaurantJson
        ? (JSON.parse(restaurantJson) as RestaurantSettings)
        : DEFAULT_RESTAURANT_SETTINGS;

      set({ userSettings, restaurantSettings, isLoading: false });
    } catch (_error) {
      set({
        error: 'Erreur lors du chargement des paramètres',
        isLoading: false,
        userSettings: DEFAULT_USER_SETTINGS,
        restaurantSettings: DEFAULT_RESTAURANT_SETTINGS,
      });
    }
  },

  // Update user settings
  updateUserSettings: (settings) => {
    const current = get().userSettings || DEFAULT_USER_SETTINGS;
    const updated = { ...current, ...settings };
    set({ userSettings: updated });
    storage.set(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(updated));
  },

  // Update restaurant settings
  updateRestaurantSettings: (settings) => {
    const current = get().restaurantSettings || DEFAULT_RESTAURANT_SETTINGS;
    const updated = { ...current, ...settings };
    set({ restaurantSettings: updated });
    storage.set(STORAGE_KEYS.RESTAURANT_SETTINGS, JSON.stringify(updated));
  },

  // Set theme
  setTheme: (theme) => {
    get().updateUserSettings({ theme });
  },

  // Set language
  setLanguage: (language) => {
    get().updateUserSettings({ language });
  },

  // Clear all settings
  clearAllSettings: () => {
    set({
      userSettings: DEFAULT_USER_SETTINGS,
      restaurantSettings: DEFAULT_RESTAURANT_SETTINGS,
      error: null,
    });
    storage.delete(STORAGE_KEYS.USER_SETTINGS);
    storage.delete(STORAGE_KEYS.RESTAURANT_SETTINGS);
  },
}));

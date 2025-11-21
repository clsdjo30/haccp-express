/**
 * Hook to get settings
 */

import { useEffect } from 'react';

import { useSettingsStore } from '../stores/settings-store';

export function useSettings() {
  const userSettings = useSettingsStore((state) => state.userSettings);
  const restaurantSettings = useSettingsStore(
    (state) => state.restaurantSettings
  );
  const isLoading = useSettingsStore((state) => state.isLoading);
  const error = useSettingsStore((state) => state.error);
  const loadSettings = useSettingsStore((state) => state.loadSettings);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    userSettings,
    restaurantSettings,
    isLoading,
    error,
    refresh: loadSettings,
  };
}

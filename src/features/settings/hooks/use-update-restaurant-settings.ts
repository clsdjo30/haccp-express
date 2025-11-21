/**
 * Hook to update restaurant settings
 */

import { useSettingsStore } from '../stores/settings-store';

export function useUpdateRestaurantSettings() {
  const updateRestaurantSettings = useSettingsStore(
    (state) => state.updateRestaurantSettings
  );

  return {
    updateRestaurantSettings,
  };
}

/**
 * Hook to update user settings
 */

import { useSettingsStore } from '../stores/settings-store';

export function useUpdateUserSettings() {
  const updateUserSettings = useSettingsStore(
    (state) => state.updateUserSettings
  );
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return {
    updateUserSettings,
    setTheme,
    setLanguage,
  };
}

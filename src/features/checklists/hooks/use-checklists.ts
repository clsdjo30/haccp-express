/**
 * Hook to use checklists
 */

import { useEffect } from 'react';

import { useChecklistStore } from '../stores/checklist-store';

/**
 * Hook to get all checklists with their latest entries
 */
export function useChecklists() {
  const checklists = useChecklistStore((state) =>
    state.getChecklistsWithLatestEntries()
  );
  const isLoading = useChecklistStore((state) => state.isLoading);
  const error = useChecklistStore((state) => state.error);
  const loadData = useChecklistStore((state) => state.loadData);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    checklists,
    isLoading,
    error,
    refresh: loadData,
  };
}

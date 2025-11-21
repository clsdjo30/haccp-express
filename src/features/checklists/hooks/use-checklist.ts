/**
 * Hook to use a single checklist
 */

import { useEffect } from 'react';

import { useChecklistStore } from '../stores/checklist-store';

/**
 * Hook to get a single checklist by ID
 */
export function useChecklist(id: string) {
  const checklist = useChecklistStore((state) =>
    state.getChecklistWithLatestEntry(id)
  );
  const loadData = useChecklistStore((state) => state.loadData);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return checklist;
}

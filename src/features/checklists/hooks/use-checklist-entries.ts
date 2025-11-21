/**
 * Hook to use checklist entries
 */

import { useChecklistStore } from '../stores/checklist-store';

/**
 * Hook to get entries for a checklist
 */
export function useChecklistEntries(checklistId: string, limit?: number) {
  const entries = useChecklistStore((state) =>
    state.getEntriesByChecklistId(checklistId, limit)
  );

  return entries;
}

/**
 * Hook to add checklist entry
 */

/* eslint-disable max-params */
import { useState } from 'react';

import { useChecklistStore } from '../stores/checklist-store';
import type { ChecklistEntryFormValues } from '../types';

/**
 * Hook to add a new checklist entry
 */
export function useAddChecklistEntry() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addEntry = useChecklistStore((state) => state.addEntry);

  const mutate = async (
    checklistId: string,
    values: ChecklistEntryFormValues,
    userId: string,
    userName: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const entry = addEntry(checklistId, values, userId, userName);

      setIsLoading(false);
      return entry;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
}

/**
 * Hook to add a new label
 */

import { useState } from 'react';

import { useLabelStore } from '../stores/label-store';
import type { LabelFormValues } from '../types';

export function useAddLabel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addLabel = useLabelStore((state) => state.addLabel);

  const mutate = async (
    values: LabelFormValues,
    userId: string,
    userName: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const label = addLabel(values, userId, userName);

      setIsLoading(false);
      return label;
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

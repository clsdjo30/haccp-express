/**
 * Hook to add cleaning validation
 */

import { useState } from 'react';

import { useCleaningStore } from '../stores/cleaning-store';

type AddValidationInput = {
  equipmentId: string;
  taskId: string;
  userId: string;
  userName: string;
  notes?: string;
};

/**
 * Hook to add a new cleaning validation
 */
export function useAddValidation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addValidation = useCleaningStore((state) => state.addValidation);

  const mutate = async (input: AddValidationInput) => {
    try {
      setIsLoading(true);
      setError(null);

      const validation = addValidation(input);

      setIsLoading(false);
      return validation;
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

/**
 * Hook to use a single equipment
 */

import { useEffect } from 'react';

import { useCleaningStore } from '../stores/cleaning-store';

/**
 * Hook to get a single equipment by ID
 */
export function useEquipment(id: string) {
  const equipment = useCleaningStore((state) =>
    state.getEquipmentWithLatestValidation(id)
  );
  const loadData = useCleaningStore((state) => state.loadData);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return equipment;
}

/**
 * Hook to use cleaning validations
 */

import { useCleaningStore } from '../stores/cleaning-store';

/**
 * Hook to get validations for an equipment
 */
export function useValidations(equipmentId: string, limit?: number) {
  const validations = useCleaningStore((state) =>
    state.getValidationsByEquipmentId(equipmentId, limit)
  );

  return validations;
}

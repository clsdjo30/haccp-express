/**
 * Hook to get a single label by ID
 */

import { useLabelStore } from '../stores/label-store';

export function useLabel(labelId: string) {
  const getLabelById = useLabelStore((state) => state.getLabelById);
  const label = getLabelById(labelId);

  return {
    label,
    isLoading: false,
    error: label ? null : 'Étiquette non trouvée',
  };
}

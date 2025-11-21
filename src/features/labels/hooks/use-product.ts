/**
 * Hook to get a single product by ID
 */

import { useLabelStore } from '../stores/label-store';

export function useProduct(productId: string) {
  const getProductById = useLabelStore((state) => state.getProductById);
  const product = getProductById(productId);

  return {
    product,
    isLoading: false,
    error: product ? null : 'Produit non trouvé',
  };
}

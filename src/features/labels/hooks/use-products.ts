/**
 * Hook to get all products
 */

import { useEffect } from 'react';

import { useLabelStore } from '../stores/label-store';

export function useProducts() {
  const products = useLabelStore((state) => state.products);
  const isLoading = useLabelStore((state) => state.isLoading);
  const error = useLabelStore((state) => state.error);
  const loadData = useLabelStore((state) => state.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeProducts = products.filter((p) => p.isActive);

  return {
    products: activeProducts,
    allProducts: products,
    isLoading,
    error,
    refresh: loadData,
  };
}

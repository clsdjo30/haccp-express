/**
 * Hook to get all labels
 */

import { useEffect } from 'react';

import { useLabelStore } from '../stores/label-store';

export function useLabels() {
  const labels = useLabelStore((state) => state.labels);
  const isLoading = useLabelStore((state) => state.isLoading);
  const error = useLabelStore((state) => state.error);
  const loadData = useLabelStore((state) => state.loadData);
  const getTodayLabelsCount = useLabelStore(
    (state) => state.getTodayLabelsCount
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const todayCount = getTodayLabelsCount();

  return {
    labels,
    todayCount,
    isLoading,
    error,
    refresh: loadData,
  };
}

/**
 * Hook to print labels
 */

import { useState } from 'react';

import type { LabelPrintData } from '../types';
import { printAndShareLabel, printLabel, printLabelDirect } from '../utils';

export function usePrintLabel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const print = async (data: LabelPrintData) => {
    try {
      setIsLoading(true);
      setError(null);

      const uri = await printLabel(data);

      setIsLoading(false);
      return uri;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de l'impression";
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const printDirect = async (data: LabelPrintData) => {
    try {
      setIsLoading(true);
      setError(null);

      await printLabelDirect(data);

      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de l'impression";
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const printAndShare = async (data: LabelPrintData) => {
    try {
      setIsLoading(true);
      setError(null);

      await printAndShareLabel(data);

      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors du partage';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    print,
    printDirect,
    printAndShare,
    isLoading,
    error,
  };
}

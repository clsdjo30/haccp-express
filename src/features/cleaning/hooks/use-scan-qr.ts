/**
 * Hook to scan QR codes
 */

import { useCallback, useState } from 'react';

import { validateQRCode } from '@/lib/validation';

import { useCleaningStore } from '../stores/cleaning-store';

/**
 * Hook to scan and validate QR codes
 */
export function useScanQR() {
  const [error, setError] = useState<string | null>(null);
  const scanQRCode = useCleaningStore((state) => state.scanQRCode);

  const scan = useCallback(
    (qrCode: string) => {
      setError(null);

      // Validate QR code format
      if (!validateQRCode(qrCode)) {
        setError('QR code invalide. Format attendu : EQUIP_XXX_XXX');
        return null;
      }

      // Find equipment
      const equipment = scanQRCode(qrCode);
      if (!equipment) {
        setError('Équipement non trouvé pour ce QR code');
        return null;
      }

      return equipment;
    },
    [scanQRCode]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    scan,
    error,
    clearError,
  };
}

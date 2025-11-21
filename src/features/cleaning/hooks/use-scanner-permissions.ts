/**
 * Hook to manage camera permissions for QR scanner
 */

import { useCameraPermissions } from 'expo-camera';
import { useEffect } from 'react';

/**
 * Hook to request and manage camera permissions
 */
export function useScannerPermissions() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return {
    hasPermission: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    requestPermission,
    isLoading: permission === null,
  };
}

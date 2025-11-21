/**
 * Scanner screen
 * QR code scanner for equipment identification
 */

/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { Button, Text, View } from '@/components/ui';

import { QRScanner } from '../components';
import { useScannerPermissions, useScanQR } from '../hooks';
import {
  hasCleaningDemoData,
  initializeCleaningDemoData,
} from '../stores/demo-data';

export function ScannerScreen() {
  const router = useRouter();
  const { hasPermission, canAskAgain, requestPermission, isLoading } =
    useScannerPermissions();
  const { scan, error: scanError, clearError } = useScanQR();
  const [isScanning, setIsScanning] = React.useState(true);

  // Initialize demo data if needed
  React.useEffect(() => {
    if (!hasCleaningDemoData()) {
      initializeCleaningDemoData();
    }
  }, []);

  const handleScan = (qrCode: string) => {
    setIsScanning(false);
    const equipment = scan(qrCode);

    if (equipment) {
      // Navigate to equipment detail
      router.push(`/cleaning/equipment/${equipment.id}`);
    } else {
      // Show error
      Alert.alert('Équipement non trouvé', scanError ?? 'QR code invalide', [
        {
          text: 'OK',
          onPress: () => {
            clearError();
            setIsScanning(true);
          },
        },
      ]);
    }
  };

  // Loading permissions
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="text-base text-neutral-600">
          Vérification des permissions...
        </Text>
      </View>
    );
  }

  // Permission denied
  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <View className="mb-4 items-center">
          <Text className="text-6xl">📸</Text>
        </View>
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Accès à la caméra requis
        </Text>
        <Text className="mb-6 text-center text-sm text-neutral-600">
          Pour scanner les QR codes sur les équipements, nous avons besoin
          d&apos;accéder à votre caméra.
        </Text>
        {canAskAgain ? (
          <Button
            label="Autoriser l'accès"
            onPress={requestPermission}
            className="w-full"
          />
        ) : (
          <View>
            <Text className="mb-4 text-center text-sm text-neutral-600">
              Veuillez activer l&apos;accès à la caméra dans les paramètres de
              votre appareil.
            </Text>
            <Button
              label="Retour"
              onPress={() => router.back()}
              className="w-full"
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Scanner */}
      <QRScanner onScan={handleScan} isScanning={isScanning} />

      {/* Cancel button */}
      <View className="absolute inset-x-4 bottom-8">
        <Button
          label="Annuler"
          onPress={() => router.back()}
          className="bg-white"
        />
      </View>
    </View>
  );
}

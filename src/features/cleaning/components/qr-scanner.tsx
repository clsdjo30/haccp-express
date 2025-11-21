/**
 * QRScanner component
 * Camera view for scanning QR codes on equipment
 */

/* eslint-disable max-lines-per-function */
import { type BarcodeScanningResult, CameraView } from 'expo-camera';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/ui';

type QRScannerProps = {
  onScan: (qrCode: string) => void;
  isScanning?: boolean;
};

export function QRScanner({ onScan, isScanning = true }: QRScannerProps) {
  const [scanned, setScanned] = React.useState(false);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (!scanned && isScanning && data) {
      setScanned(true);
      onScan(data);
      // Reset after 2 seconds to allow re-scanning
      setTimeout(() => setScanned(false), 2000);
    }
  };

  return (
    <View className="relative flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {/* Overlay with scan frame */}
      <View className="flex-1 items-center justify-center">
        {/* Top overlay */}
        <View className="absolute inset-x-0 top-0 h-1/4 bg-black/50" />

        {/* Bottom overlay */}
        <View className="absolute inset-x-0 bottom-0 h-1/4 bg-black/50" />

        {/* Left overlay */}
        <View className="absolute inset-y-1/4 left-0 w-1/6 bg-black/50" />

        {/* Right overlay */}
        <View className="absolute inset-y-1/4 right-0 w-1/6 bg-black/50" />

        {/* Scan frame */}
        <View className="size-64 rounded-2xl border-4 border-white">
          {/* Corner indicators */}
          <View className="absolute left-0 top-0 size-8 border-l-4 border-t-4 border-primary-500" />
          <View className="absolute right-0 top-0 size-8 border-r-4 border-t-4 border-primary-500" />
          <View className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-primary-500" />
          <View className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-primary-500" />
        </View>

        {/* Instructions */}
        <View className="absolute inset-x-4 bottom-16">
          <View className="rounded-lg bg-black/70 p-4">
            <Text className="text-center text-base font-semibold text-white">
              Scannez le QR code sur l&apos;équipement
            </Text>
            <Text className="mt-2 text-center text-sm text-white/80">
              Centrez le QR code dans le cadre blanc
            </Text>
          </View>
        </View>

        {/* Scanned feedback */}
        {scanned && (
          <View className="absolute inset-x-4 top-16">
            <View className="rounded-lg bg-success-500 p-3">
              <Text className="text-center text-base font-semibold text-white">
                QR code détecté !
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

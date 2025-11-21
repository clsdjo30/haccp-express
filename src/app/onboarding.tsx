import { router } from 'expo-router';
import * as React from 'react';

import { Button, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { useIsFirstTime } from '@/lib';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();

  const handleDone = () => {
    setIsFirstTime(false);
    router.replace('/login');
  };

  return (
    <View className="flex-1 justify-center p-4">
      <FocusAwareStatusBar />
      <View className="mb-12">
        <Text className="mb-4 text-center text-3xl font-bold">
          HACCP Express
        </Text>
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-800">
          Gestion HACCP simplifiée
        </Text>
        <Text className="text-center text-neutral-600">
          Checklists, nettoyage QR, et étiquettes DLC en un seul endroit
        </Text>
      </View>

      <View className="mb-8 gap-4">
        <View className="flex-row items-start gap-3">
          <Text className="text-2xl">✓</Text>
          <View className="flex-1">
            <Text className="font-semibold">Checklists HACCP</Text>
            <Text className="text-sm text-neutral-600">
              Relevés de température rapides et conformes
            </Text>
          </View>
        </View>

        <View className="flex-row items-start gap-3">
          <Text className="text-2xl">✓</Text>
          <View className="flex-1">
            <Text className="font-semibold">Nettoyage QR</Text>
            <Text className="text-sm text-neutral-600">
              Validation du nettoyage par scan de QR codes
            </Text>
          </View>
        </View>

        <View className="flex-row items-start gap-3">
          <Text className="text-2xl">✓</Text>
          <View className="flex-1">
            <Text className="font-semibold">Étiquettes DLC</Text>
            <Text className="text-sm text-neutral-600">
              Impression d&apos;étiquettes avec dates limites
            </Text>
          </View>
        </View>
      </View>

      <Button label="Commencer" onPress={handleDone} />
    </View>
  );
}

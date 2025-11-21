/**
 * EquipmentDetail screen
 * Displays equipment details and validation form
 */

/* eslint-disable max-lines-per-function */
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { Button, Text, View } from '@/components/ui';

import { CleaningHistory, ValidationForm } from '../components';
import { useAddValidation, useEquipment, useValidations } from '../hooks';
import { getLocationLabel } from '../utils';

export function EquipmentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const equipment = useEquipment(id);
  const validations = useValidations(id, 10); // Last 10 validations
  const { mutate: addValidation, isLoading } = useAddValidation();

  // Mock user data (will be replaced with real auth later)
  const mockUser = {
    id: 'user_1',
    name: 'Jean Dupont',
  };

  const handleSubmit = async (values: { taskId: string; notes?: string }) => {
    try {
      await addValidation({
        equipmentId: id,
        taskId: values.taskId,
        userId: mockUser.id,
        userName: mockUser.name,
        notes: values.notes,
      });

      Alert.alert(
        'Succès',
        'La validation de nettoyage a été enregistrée avec succès.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (_error) {
      Alert.alert(
        'Erreur',
        "Une erreur est survenue lors de l'enregistrement de la validation."
      );
    }
  };

  // Loading/not found state
  if (!equipment) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="text-base text-neutral-600">
          Équipement introuvable
        </Text>
        <Button label="Retour" onPress={() => router.back()} className="mt-4" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="border-b border-neutral-200 bg-white p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-xl font-bold text-neutral-900">
              {equipment.name}
            </Text>
            <View className="mt-1 flex-row items-center">
              <View className="rounded bg-neutral-100 px-2 py-0.5">
                <Text className="text-xs font-medium text-neutral-600">
                  {getLocationLabel(equipment.location)}
                </Text>
              </View>
            </View>
          </View>
          <View className="rounded-lg bg-primary-50 p-2">
            <Text className="text-3xl">🧹</Text>
          </View>
        </View>
        {equipment.latestValidation && (
          <View className="mt-3 rounded bg-success-50 p-2">
            <Text className="text-xs font-medium text-success-800">
              Dernière validation : {equipment.latestValidation.taskName}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {/* Validation form section */}
        <View className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <Text className="mb-4 text-lg font-semibold text-neutral-900">
            Valider le nettoyage
          </Text>
          <ValidationForm
            tasks={equipment.cleaningTasks}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </View>

        {/* History section */}
        <View className="flex-1 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <View className="border-b border-neutral-200 p-4">
            <Text className="text-lg font-semibold text-neutral-900">
              Historique
            </Text>
            <Text className="mt-1 text-sm text-neutral-600">
              {validations.length} validation
              {validations.length > 1 ? 's' : ''}
            </Text>
          </View>
          <CleaningHistory validations={validations} />
        </View>
      </View>
    </View>
  );
}

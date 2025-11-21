/**
 * ChecklistDetail screen
 * Displays checklist details and form to add new entry
 */

/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { Button, Text, View } from '@/components/ui';
import { formatDateTime, formatTemperature } from '@/lib/format';

import { ChecklistForm, StatusBadge } from '../components';
import {
  useAddChecklistEntry,
  useChecklist,
  useChecklistEntries,
} from '../hooks';
import type { ChecklistEntryFormValues } from '../types';

export function ChecklistDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const checklist = useChecklist(id);
  const entries = useChecklistEntries(id, 10); // Last 10 entries
  const { mutate: addEntry, isLoading } = useAddChecklistEntry();

  // Mock user data (will be replaced with real auth later)
  const mockUser = {
    id: 'user_1',
    name: 'Jean Dupont',
  };

  const handleSubmit = async (values: ChecklistEntryFormValues) => {
    try {
      await addEntry(id, values, mockUser.id, mockUser.name);

      Alert.alert(
        'Succès',
        'Le relevé de température a été enregistré avec succès.',
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
        "Une erreur est survenue lors de l'enregistrement du relevé."
      );
    }
  };

  // Loading/not found state
  if (!checklist) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="text-base text-neutral-600">
          Checklist introuvable
        </Text>
        <Button label="Retour" onPress={() => router.back()} className="mt-4" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="border-b border-neutral-200 bg-white p-4">
        <Text className="text-xl font-bold text-neutral-900">
          {checklist.title}
        </Text>
        <Text className="mt-1 text-sm text-neutral-600">
          {checklist.equipmentName}
        </Text>
        {checklist.description && (
          <Text className="mt-2 text-sm text-neutral-500">
            {checklist.description}
          </Text>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {/* Form section */}
        <View className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <Text className="mb-4 text-lg font-semibold text-neutral-900">
            Nouveau relevé
          </Text>
          <ChecklistForm
            thresholds={checklist.thresholds}
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
              {entries.length} relevé{entries.length > 1 ? 's' : ''}
            </Text>
          </View>

          {entries.length === 0 ? (
            <View className="items-center justify-center p-8">
              <Text className="text-center text-sm text-neutral-500">
                Aucun relevé pour cette checklist
              </Text>
            </View>
          ) : (
            <FlashList
              data={entries}
              renderItem={({ item }) => (
                <View className="border-b border-neutral-100 p-4">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-neutral-900">
                        {formatTemperature(item.value, item.unit)}
                      </Text>
                      <Text className="mt-1 text-xs text-neutral-600">
                        {formatDateTime(item.timestamp)}
                      </Text>
                      <Text className="mt-0.5 text-xs text-neutral-500">
                        Par {item.userName}
                      </Text>
                      {item.notes && (
                        <Text className="mt-2 text-sm text-neutral-700">
                          {item.notes}
                        </Text>
                      )}
                    </View>
                    <StatusBadge status={item.status} size="sm" />
                  </View>
                </View>
              )}
              estimatedItemSize={100}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
}

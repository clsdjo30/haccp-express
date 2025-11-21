/**
 * ChecklistsList screen
 * Displays all checklists with their latest entries
 */

/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import * as React from 'react';

import { Button, Text, View } from '@/components/ui';

import { ChecklistCard } from '../components';
import { useChecklists } from '../hooks';
import { hasDemoData, initializeDemoData } from '../stores/demo-data';

export function ChecklistsListScreen() {
  const router = useRouter();
  const { checklists, isLoading, error, refresh } = useChecklists();

  // Initialize demo data if needed
  React.useEffect(() => {
    if (!hasDemoData()) {
      initializeDemoData();
      refresh();
    }
  }, [refresh]);

  const handleChecklistPress = (id: string) => {
    router.push(`/checklists/${id}`);
  };

  // Loading state
  if (isLoading && checklists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="text-base text-neutral-600">Chargement...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="mb-4 text-center text-base text-danger-600">
          {error}
        </Text>
        <Button label="Réessayer" onPress={refresh} />
      </View>
    );
  }

  // Empty state
  if (checklists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Aucune checklist
        </Text>
        <Text className="mb-4 text-center text-sm text-neutral-600">
          Aucune checklist n&apos;est configurée pour le moment.
        </Text>
        <Button
          label="Initialiser les données de démo"
          onPress={() => {
            initializeDemoData();
            refresh();
          }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="border-b border-neutral-200 bg-white p-4">
        <Text className="text-2xl font-bold text-neutral-900">
          Checklists HACCP
        </Text>
        <Text className="mt-1 text-sm text-neutral-600">
          {checklists.length} checklist{checklists.length > 1 ? 's' : ''}{' '}
          disponible{checklists.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* List */}
      <FlashList
        data={checklists}
        renderItem={({ item }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => handleChecklistPress(item.id)}
          />
        )}
        estimatedItemSize={150}
        contentContainerStyle={{
          padding: 16,
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

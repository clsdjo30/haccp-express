/**
 * LabelsHistory screen
 * Display all labels with filtering
 */

/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { Button, Text, View } from '@/components/ui';

import { LabelCard } from '../components';
import { useLabels } from '../hooks';
import { hasDemoData, initializeDemoData } from '../stores';

export function LabelsHistoryScreen() {
  const { labels, todayCount, isLoading, refresh } = useLabels();

  React.useEffect(() => {
    if (!hasDemoData()) {
      initializeDemoData();
      refresh();
    }
  }, [refresh]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-600">Chargement...</Text>
      </View>
    );
  }

  if (labels.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Aucune étiquette
        </Text>
        <Text className="mb-4 text-center text-sm text-neutral-600">
          Aucune étiquette n&apos;a été créée pour le moment.
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
      {/* Header with stats */}
      <View className="border-b border-neutral-200 bg-white p-4">
        <Text className="text-2xl font-bold text-neutral-900">
          Historique des Étiquettes
        </Text>
        <Text className="mt-1 text-sm text-neutral-600">
          {todayCount} étiquette{todayCount > 1 ? 's' : ''} créée
          {todayCount > 1 ? 's' : ''} aujourd&apos;hui
        </Text>
      </View>

      {/* List */}
      <FlashList
        data={labels}
        renderItem={({ item }) => (
          <View className="px-4 py-2">
            <LabelCard
              label={item}
              onPress={() => {
                // Navigate to label detail
                // router.push(`/labels/${item.id}`);
              }}
            />
          </View>
        )}
        estimatedItemSize={140}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

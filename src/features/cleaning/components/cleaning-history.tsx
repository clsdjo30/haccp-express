/**
 * CleaningHistory component
 * Displays history of cleaning validations
 */

import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { Text, View } from '@/components/ui';
import { formatDateTime } from '@/lib/format';

import type { CleaningValidation } from '../types';

type CleaningHistoryProps = {
  validations: CleaningValidation[];
};

export function CleaningHistory({ validations }: CleaningHistoryProps) {
  if (validations.length === 0) {
    return (
      <View className="items-center justify-center p-8">
        <Text className="text-center text-sm text-neutral-500">
          Aucune validation enregistrée
        </Text>
      </View>
    );
  }

  return (
    <FlashList
      data={validations}
      renderItem={({ item }) => (
        <View className="border-b border-neutral-100 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-base font-semibold text-neutral-900">
                {item.taskName}
              </Text>
              <Text className="mt-1 text-xs text-neutral-600">
                {formatDateTime(item.timestamp)}
              </Text>
              <Text className="mt-0.5 text-xs font-medium text-neutral-700">
                Par {item.userName}
              </Text>
              {item.notes && (
                <Text className="mt-2 text-sm text-neutral-700">
                  {item.notes}
                </Text>
              )}
            </View>
            <View className="ml-2 rounded-full bg-success-100 p-2">
              <Text className="text-lg">✓</Text>
            </View>
          </View>
        </View>
      )}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
    />
  );
}

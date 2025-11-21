/**
 * EquipmentCard component
 * Displays equipment information with latest validation
 */

import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { formatRelativeTime } from '@/lib/format';

import type { EquipmentWithLatestValidation } from '../types';
import { getLocationLabel } from '../utils';

type EquipmentCardProps = {
  equipment: EquipmentWithLatestValidation;
  onPress?: () => void;
};

export function EquipmentCard({ equipment, onPress }: EquipmentCardProps) {
  const latestValidation = equipment.latestValidation;
  const hasValidation = !!latestValidation;

  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-70"
      disabled={!onPress}
    >
      <View className="mb-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <View className="mb-2">
          <Text className="text-base font-semibold text-neutral-900">
            {equipment.name}
          </Text>
          <View className="mt-1 flex-row items-center">
            <View className="rounded bg-neutral-100 px-2 py-0.5">
              <Text className="text-xs font-medium text-neutral-600">
                {getLocationLabel(equipment.location)}
              </Text>
            </View>
            <Text className="ml-2 text-xs text-neutral-500">
              {equipment.cleaningTasks.length} tâche
              {equipment.cleaningTasks.length > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Latest validation or no data */}
        {hasValidation && latestValidation ? (
          <View className="mt-3 rounded bg-success-50 p-3">
            <Text className="text-xs font-medium text-success-800">
              {latestValidation.taskName}
            </Text>
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-xs text-neutral-600">
                {formatRelativeTime(latestValidation.timestamp)}
              </Text>
              <Text className="text-xs font-medium text-neutral-700">
                {latestValidation.userName}
              </Text>
            </View>
          </View>
        ) : (
          <View className="mt-3 rounded border border-dashed border-neutral-300 bg-neutral-50 p-3">
            <Text className="text-center text-sm text-neutral-500">
              Aucune validation récente
            </Text>
          </View>
        )}

        {/* Stats */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-xs text-neutral-400">
            {equipment.validationsCount} validation
            {equipment.validationsCount > 1 ? 's' : ''} au total
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

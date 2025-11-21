/**
 * ChecklistCard component
 * Displays a checklist summary with latest entry
 */

import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { formatRelativeTime, formatTemperature } from '@/lib/format';

import type { ChecklistWithLatestEntry } from '../types';
import { StatusBadge } from './status-badge';

type ChecklistCardProps = {
  checklist: ChecklistWithLatestEntry;
  onPress?: () => void;
};

export function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const latestEntry = checklist.latestEntry;
  const hasEntry = !!latestEntry;

  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-70"
      disabled={!onPress}
    >
      <View className="mb-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <View className="mb-2 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-base font-semibold text-neutral-900">
              {checklist.title}
            </Text>
            <Text className="mt-0.5 text-sm text-neutral-600">
              {checklist.equipmentName}
            </Text>
          </View>
          {hasEntry && latestEntry && (
            <StatusBadge status={latestEntry.status} size="sm" />
          )}
        </View>

        {/* Latest entry or no data */}
        {hasEntry && latestEntry ? (
          <View className="mt-3 rounded bg-neutral-50 p-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-neutral-500">Dernier relevé</Text>
                <Text className="mt-1 text-2xl font-bold text-neutral-900">
                  {formatTemperature(latestEntry.value, latestEntry.unit)}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-neutral-500">
                  {formatRelativeTime(latestEntry.timestamp)}
                </Text>
                <Text className="mt-1 text-xs font-medium text-neutral-700">
                  {latestEntry.userName}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="mt-3 rounded border border-dashed border-neutral-300 bg-neutral-50 p-3">
            <Text className="text-center text-sm text-neutral-500">
              Aucun relevé aujourd&apos;hui
            </Text>
          </View>
        )}

        {/* Stats */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-xs text-neutral-400">
            {checklist.entriesCount} relevé
            {checklist.entriesCount > 1 ? 's' : ''} au total
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

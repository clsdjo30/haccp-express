/**
 * LabelCard component
 * Display label information in a card
 */

import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { formatDate, formatDateTime } from '@/lib/format';

import type { Label } from '../types';
import { getLabelStatusBadgeColor, getLabelStatusText } from '../utils';

type LabelCardProps = {
  label: Label;
  onPress?: () => void;
};

/**
 * Label card component
 * Shows label information with status
 */
export function LabelCard({ label, onPress }: LabelCardProps) {
  const productionDate = formatDate(new Date(label.productionDate));
  const dlcDate = formatDate(new Date(label.dlc));
  const statusBadgeColor = getLabelStatusBadgeColor(label);
  const statusText = getLabelStatusText(label);
  const printedAt = label.printedAt
    ? formatDateTime(new Date(label.printedAt))
    : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm"
    >
      {/* Header with product name and status */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-900">
            {label.productName}
          </Text>
          {label.batchNumber && (
            <Text className="mt-0.5 text-xs text-neutral-600">
              Lot: {label.batchNumber}
            </Text>
          )}
        </View>

        <View className={`rounded-full px-2 py-1 ${statusBadgeColor}`}>
          <Text className="text-xs font-medium">{statusText}</Text>
        </View>
      </View>

      {/* Dates */}
      <View className="mt-3 gap-1">
        <View className="flex-row justify-between">
          <Text className="text-sm text-neutral-600">Production:</Text>
          <Text className="text-sm font-medium text-neutral-900">
            {productionDate}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-sm text-neutral-600">DLC:</Text>
          <Text className="text-sm font-semibold text-neutral-900">
            {dlcDate}
          </Text>
        </View>
      </View>

      {/* Notes */}
      {label.notes && (
        <View className="mt-2 rounded bg-neutral-50 p-2">
          <Text className="text-xs text-neutral-700">{label.notes}</Text>
        </View>
      )}

      {/* Footer with print info */}
      <View className="mt-2 flex-row items-center justify-between border-t border-neutral-100 pt-2">
        <Text className="text-xs text-neutral-500">Par: {label.userName}</Text>
        {printedAt && (
          <Text className="text-xs text-neutral-500">Imprimé: {printedAt}</Text>
        )}
      </View>
    </Pressable>
  );
}

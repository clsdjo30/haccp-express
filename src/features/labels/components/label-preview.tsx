/**
 * LabelPreview component
 * Preview of the label before printing
 */

import * as React from 'react';

import { Text, View } from '@/components/ui';
import { formatDate } from '@/lib/format';

import type { LabelPrintData } from '../types';

type LabelPreviewProps = {
  data: LabelPrintData;
};

/**
 * Label preview component
 * Shows a visual representation of the label that will be printed
 */
export function LabelPreview({ data }: LabelPreviewProps) {
  const productionDate = formatDate(new Date(data.productionDate));
  const dlcDate = formatDate(new Date(data.dlc));

  return (
    <View className="rounded-lg border-2 border-neutral-300 bg-white p-3">
      {/* Header */}
      <View className="border-b-2 border-neutral-900 pb-2">
        <Text className="text-center text-xs font-bold uppercase text-neutral-900">
          {data.restaurantName}
        </Text>
      </View>

      {/* Product name */}
      <View className="my-3 rounded bg-neutral-100 p-2">
        <Text className="text-center text-base font-bold text-neutral-900">
          {data.productName}
        </Text>
      </View>

      {/* Production date */}
      <View className="flex-row justify-between border-b border-neutral-300 py-2">
        <Text className="text-xs font-semibold text-neutral-700">
          Production:
        </Text>
        <Text className="text-xs text-neutral-900">{productionDate}</Text>
      </View>

      {/* DLC section */}
      <View className="my-3 rounded-lg bg-neutral-900 p-3">
        <Text className="text-center text-[10px] font-bold uppercase text-white">
          Date Limite de Consommation
        </Text>
        <Text className="mt-1 text-center text-lg font-bold text-white">
          {dlcDate}
        </Text>
      </View>

      {/* Batch number */}
      {data.batchNumber && (
        <View className="py-2">
          <Text className="text-center text-xs text-neutral-600">
            Lot: {data.batchNumber}
          </Text>
        </View>
      )}

      {/* Storage instructions */}
      {data.storageInstructions && (
        <View className="mt-2 rounded border border-neutral-900 p-2">
          <Text className="text-[10px] leading-tight text-neutral-700">
            <Text className="font-bold">Conservation:</Text>{' '}
            {data.storageInstructions}
          </Text>
        </View>
      )}

      {/* Footer */}
      <View className="mt-3 border-t border-neutral-300 pt-2">
        <Text className="text-center text-[9px] text-neutral-500">
          Étiquette générée par HACCP Express
        </Text>
      </View>
    </View>
  );
}

/**
 * SettingSection component
 * Group of related settings
 */

import * as React from 'react';

import { Text, View } from '@/components/ui';

type SettingSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingSection({
  title,
  description,
  children,
}: SettingSectionProps) {
  return (
    <View className="mb-6">
      <View className="mb-2 px-4">
        <Text className="text-sm font-bold uppercase text-neutral-700">
          {title}
        </Text>
        {description && (
          <Text className="mt-1 text-xs text-neutral-600">{description}</Text>
        )}
      </View>
      <View className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        {children}
      </View>
    </View>
  );
}

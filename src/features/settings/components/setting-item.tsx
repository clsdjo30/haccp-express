/**
 * SettingItem component
 * Display a single setting item with label and value
 */

import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';

type SettingItemProps = {
  label: string;
  value?: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function SettingItem({
  label,
  value,
  description,
  icon,
  onPress,
  disabled = false,
}: SettingItemProps) {
  const isInteractive = !!onPress && !disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={!isInteractive}
      className={`border-b border-neutral-200 bg-white p-4 ${
        isInteractive ? 'active:bg-neutral-50' : ''
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            {icon && <Text className="text-lg">{icon}</Text>}
            <Text className="text-base font-medium text-neutral-900">
              {label}
            </Text>
          </View>
          {description && (
            <Text className="mt-1 text-sm text-neutral-600">{description}</Text>
          )}
        </View>

        <View className="ml-4 flex-row items-center gap-2">
          {value && (
            <Text className="text-sm font-medium text-neutral-600">
              {value}
            </Text>
          )}
          {isInteractive && <Text className="text-lg text-neutral-400">›</Text>}
        </View>
      </View>
    </Pressable>
  );
}

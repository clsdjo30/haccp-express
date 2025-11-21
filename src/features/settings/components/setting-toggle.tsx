/**
 * SettingToggle component
 * Toggle switch setting item
 */

import * as React from 'react';
import { Switch } from 'react-native';

import { Text, View } from '@/components/ui';

type SettingToggleProps = {
  label: string;
  description?: string;
  icon?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

export function SettingToggle({
  label,
  description,
  icon,
  value,
  onValueChange,
  disabled = false,
}: SettingToggleProps) {
  return (
    <View
      className={`border-b border-neutral-200 bg-white p-4 ${
        disabled ? 'opacity-50' : ''
      }`}
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

        <View className="ml-4">
          <Switch
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
}

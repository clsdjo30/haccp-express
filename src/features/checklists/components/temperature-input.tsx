/**
 * TemperatureInput component
 * Optimized input for temperature entry with visual feedback
 */

import * as React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Text, View } from '@/components/ui';
import { formatTemperature } from '@/lib/format';
import { validateTemperature } from '@/lib/validation';

import type { TemperatureThresholds } from '../types';

type TemperatureInputProps = {
  control: any; // react-hook-form control
  name: string;
  thresholds: TemperatureThresholds;
  placeholder?: string;
  disabled?: boolean;
};

export function TemperatureInput({
  control,
  name,
  thresholds,
  placeholder = 'Température',
  disabled = false,
}: TemperatureInputProps) {
  const [currentValue, setCurrentValue] = React.useState<string>('');

  // Validate current value
  const validation = React.useMemo(() => {
    const value = parseFloat(currentValue);
    if (isNaN(value)) return null;

    return validateTemperature({
      value,
      min: thresholds.min,
      max: thresholds.max,
    });
  }, [currentValue, thresholds]);

  // Border color based on validation
  const borderColor = validation
    ? validation.status === 'ok'
      ? 'border-success-500'
      : validation.status === 'warning'
        ? 'border-warning-500'
        : 'border-danger-500'
    : 'border-neutral-300';

  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View className="relative">
              <Input
                value={value?.toString() ?? ''}
                onChangeText={(text) => {
                  setCurrentValue(text);
                  const numValue = parseFloat(text);
                  onChange(isNaN(numValue) ? '' : numValue);
                }}
                keyboardType="decimal-pad"
                placeholder={placeholder}
                disabled={disabled}
                className={`border-2 ${borderColor} pr-16 text-lg font-semibold`}
              />
              <View className="absolute right-3 top-1/2 -translate-y-1/2">
                <Text className="text-base font-medium text-neutral-600">
                  {thresholds.unit === 'celsius' ? '°C' : '°F'}
                </Text>
              </View>
            </View>

            {/* Thresholds hint */}
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="text-xs text-neutral-500">
                Limites: {formatTemperature(thresholds.min, thresholds.unit)} -{' '}
                {formatTemperature(thresholds.max, thresholds.unit)}
              </Text>
              {validation && (
                <Text
                  className={`text-xs font-medium ${
                    validation.status === 'ok'
                      ? 'text-success-600'
                      : validation.status === 'warning'
                        ? 'text-warning-600'
                        : 'text-danger-600'
                  }`}
                >
                  {validation.message}
                </Text>
              )}
            </View>

            {/* Error message */}
            {error && (
              <Text className="mt-1 text-sm text-danger-600">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

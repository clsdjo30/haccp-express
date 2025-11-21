/**
 * ChecklistForm component
 * Form for adding a new temperature entry
 */

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Text, View } from '@/components/ui';

import type { ChecklistEntryFormValues, TemperatureThresholds } from '../types';
import { TemperatureInput } from './temperature-input';

type ChecklistFormProps = {
  thresholds: TemperatureThresholds;
  onSubmit: (values: ChecklistEntryFormValues) => void;
  isLoading?: boolean;
};

// Validation schema
const checklistEntrySchema = z.object({
  value: z
    .number({
      required_error: 'La température est requise',
      invalid_type_error: 'Veuillez saisir un nombre valide',
    })
    .finite('La température doit être un nombre valide'),
  notes: z.string().optional(),
});

export function ChecklistForm({
  thresholds,
  onSubmit,
  isLoading = false,
}: ChecklistFormProps) {
  const { control, handleSubmit, reset, formState } =
    useForm<ChecklistEntryFormValues>({
      resolver: zodResolver(checklistEntrySchema),
      defaultValues: {
        value: undefined,
        notes: '',
      },
    });

  const onSubmitForm = (data: ChecklistEntryFormValues) => {
    onSubmit(data);
    reset(); // Reset form after submission
  };

  return (
    <View className="w-full">
      {/* Temperature input */}
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-neutral-700">
          Température
        </Text>
        <TemperatureInput
          control={control}
          name="value"
          thresholds={thresholds}
          placeholder="Ex: 3.5"
          disabled={isLoading}
        />
      </View>

      {/* Notes input */}
      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-neutral-700">
          Notes (optionnel)
        </Text>
        <Input
          placeholder="Ajouter une remarque..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          disabled={isLoading}
          className="min-h-[80px]"
        />
      </View>

      {/* Submit button */}
      <Button
        label="Valider le relevé"
        onPress={handleSubmit(onSubmitForm)}
        loading={isLoading}
        disabled={!formState.isValid || isLoading}
        className="w-full"
      />
    </View>
  );
}

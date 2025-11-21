/**
 * ValidationForm component
 * Form for validating cleaning tasks
 */

/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
// Add Pressable import
import { Pressable } from 'react-native';
import { z } from 'zod';

import { Button, Input, Text, View } from '@/components/ui';

import type { CleaningTask } from '../types';
import { getTaskTypeColor, getTaskTypeLabel } from '../utils';

type ValidationFormValues = {
  taskId: string;
  notes?: string;
};

type ValidationFormProps = {
  tasks: CleaningTask[];
  onSubmit: (values: ValidationFormValues) => void;
  isLoading?: boolean;
};

// Validation schema
const validationSchema = z.object({
  taskId: z.string().min(1, 'Veuillez sélectionner une tâche'),
  notes: z.string().optional(),
});

export function ValidationForm({
  tasks,
  onSubmit,
  isLoading = false,
}: ValidationFormProps) {
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<ValidationFormValues>({
      resolver: zodResolver(validationSchema),
      defaultValues: {
        taskId: tasks.length === 1 ? tasks[0].id : '',
        notes: '',
      },
    });

  const selectedTaskId = watch('taskId');
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const handleTaskSelect = (taskId: string) => {
    setValue('taskId', taskId, { shouldValidate: true });
  };

  const onSubmitForm = (data: ValidationFormValues) => {
    onSubmit(data);
  };

  return (
    <View className="w-full">
      {/* Task selection */}
      <View className="mb-4">
        <Text className="mb-2 text-sm font-medium text-neutral-700">
          Tâche de nettoyage
        </Text>
        <Controller
          control={control}
          name="taskId"
          render={({ fieldState: { error } }) => (
            <View>
              <View className="gap-2">
                {tasks.map((task) => (
                  <Pressable
                    key={task.id}
                    onPress={() => handleTaskSelect(task.id)}
                    className={`rounded-lg border-2 p-3 ${
                      selectedTaskId === task.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text
                          className={`text-base font-semibold ${
                            selectedTaskId === task.id
                              ? 'text-primary-900'
                              : 'text-neutral-900'
                          }`}
                        >
                          {task.name}
                        </Text>
                        {task.description && (
                          <Text className="mt-1 text-sm text-neutral-600">
                            {task.description}
                          </Text>
                        )}
                        <View className="mt-2 flex-row items-center gap-2">
                          <View
                            className={`rounded px-2 py-0.5 ${getTaskTypeColor(task.type)}`}
                          >
                            <Text className="text-xs font-medium">
                              {getTaskTypeLabel(task.type)}
                            </Text>
                          </View>
                          {task.estimatedMinutes && (
                            <Text className="text-xs text-neutral-500">
                              ~{task.estimatedMinutes} min
                            </Text>
                          )}
                        </View>
                      </View>
                      {selectedTaskId === task.id && (
                        <View className="ml-2 size-6 items-center justify-center rounded-full bg-primary-500">
                          <Text className="text-sm font-bold text-white">
                            ✓
                          </Text>
                        </View>
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
              {error && (
                <Text className="mt-1 text-sm text-danger-600">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      {/* Instructions (if task selected) */}
      {selectedTask?.instructions && selectedTask.instructions.length > 0 && (
        <View className="mb-4 rounded-lg bg-primary-50 p-3">
          <Text className="mb-2 text-sm font-semibold text-primary-900">
            Instructions :
          </Text>
          {selectedTask.instructions.map((instruction, index) => (
            <View key={index} className="mb-1 flex-row">
              <Text className="text-sm text-primary-800">
                {index + 1}. {instruction}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Notes input */}
      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-neutral-700">
          Notes (optionnel)
        </Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Ajouter une remarque..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              disabled={isLoading}
              className="min-h-[80px]"
            />
          )}
        />
      </View>

      {/* Submit button */}
      <Button
        label="Valider le nettoyage"
        onPress={handleSubmit(onSubmitForm)}
        loading={isLoading}
        disabled={!formState.isValid || isLoading}
        className="w-full"
      />
    </View>
  );
}

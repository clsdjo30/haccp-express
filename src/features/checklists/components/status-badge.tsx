/**
 * StatusBadge component
 * Displays a colored badge for checklist entry status
 */

import * as React from 'react';

import { Text, View } from '@/components/ui';

import type { ChecklistEntryStatus } from '../types';

type StatusBadgeProps = {
  status: ChecklistEntryStatus;
  size?: 'sm' | 'md' | 'lg';
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-1.5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Status colors and labels
  const statusConfig = {
    ok: {
      bgColor: 'bg-success-100',
      textColor: 'text-success-800',
      label: 'Conforme',
    },
    warning: {
      bgColor: 'bg-warning-100',
      textColor: 'text-warning-800',
      label: 'Attention',
    },
    alert: {
      bgColor: 'bg-danger-100',
      textColor: 'text-danger-800',
      label: 'Alerte',
    },
  };

  const config = statusConfig[status];

  return (
    <View
      className={`rounded-full ${config.bgColor} ${sizeClasses[size]} items-center justify-center`}
    >
      <Text
        className={`font-semibold ${config.textColor} ${textSizeClasses[size]}`}
      >
        {config.label}
      </Text>
    </View>
  );
}

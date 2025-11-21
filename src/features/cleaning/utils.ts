/**
 * Cleaning feature utilities
 */

import type { CleaningTaskType, EquipmentLocation } from './types';

/**
 * Get display label for equipment location
 */
export function getLocationLabel(location: EquipmentLocation): string {
  const labels: Record<EquipmentLocation, string> = {
    kitchen_hot: 'Cuisine chaude',
    kitchen_cold: 'Cuisine froide',
    storage: 'Stockage',
    dishwashing: 'Plonge',
    preparation: 'Préparation',
  };
  return labels[location];
}

/**
 * Get display label for cleaning task type
 */
export function getTaskTypeLabel(type: CleaningTaskType): string {
  const labels: Record<CleaningTaskType, string> = {
    daily: 'Quotidien',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    after_use: 'Après utilisation',
    deep_clean: 'Nettoyage approfondi',
  };
  return labels[type];
}

/**
 * Get color for task type badge
 */
export function getTaskTypeColor(type: CleaningTaskType): string {
  const colors: Record<CleaningTaskType, string> = {
    daily: 'bg-primary-100 text-primary-800',
    weekly: 'bg-success-100 text-success-800',
    monthly: 'bg-warning-100 text-warning-800',
    after_use: 'bg-neutral-100 text-neutral-800',
    deep_clean: 'bg-danger-100 text-danger-800',
  };
  return colors[type];
}

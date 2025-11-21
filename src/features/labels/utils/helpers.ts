/**
 * Helper utilities for labels feature
 */

import type { Label } from '../types';
import { ProductCategory, StorageTemperature } from '../types';

/**
 * Get product category label
 */
export function getProductCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.PREPARED:
      return 'Préparé';
    case ProductCategory.COOKED:
      return 'Cuit';
    case ProductCategory.RAW:
      return 'Cru';
    case ProductCategory.SAUCE:
      return 'Sauce';
    case ProductCategory.DESSERT:
      return 'Dessert';
    default:
      return 'Autre';
  }
}

/**
 * Get product category color
 */
export function getProductCategoryColor(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.PREPARED:
      return 'bg-primary-500';
    case ProductCategory.COOKED:
      return 'bg-success-500';
    case ProductCategory.RAW:
      return 'bg-error-500';
    case ProductCategory.SAUCE:
      return 'bg-warning-500';
    case ProductCategory.DESSERT:
      return 'bg-purple-500';
    default:
      return 'bg-neutral-500';
  }
}

/**
 * Get storage temperature label
 */
export function getStorageTemperatureLabel(
  temperature: StorageTemperature
): string {
  switch (temperature) {
    case StorageTemperature.FROZEN:
      return 'Congelé (< -18°C)';
    case StorageTemperature.COLD:
      return 'Réfrigéré (0-4°C)';
    case StorageTemperature.AMBIENT:
      return 'Température ambiante';
    default:
      return 'Non spécifié';
  }
}

/**
 * Get storage temperature icon
 */
export function getStorageTemperatureIcon(
  temperature: StorageTemperature
): string {
  switch (temperature) {
    case StorageTemperature.FROZEN:
      return '❄️';
    case StorageTemperature.COLD:
      return '🧊';
    case StorageTemperature.AMBIENT:
      return '🌡️';
    default:
      return '📦';
  }
}

/**
 * Check if label is expired
 */
export function isLabelExpired(label: Label): boolean {
  const now = new Date();
  const dlc = new Date(label.dlc);
  return dlc < now;
}

/**
 * Check if label is expiring soon (within 24 hours)
 */
export function isLabelExpiringSoon(label: Label): boolean {
  const now = new Date();
  const dlc = new Date(label.dlc);
  const hoursUntilExpiry = (dlc.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntilExpiry > 0 && hoursUntilExpiry <= 24;
}

/**
 * Get label status (expired, expiring soon, ok)
 */
export function getLabelStatus(
  label: Label
): 'expired' | 'expiring-soon' | 'ok' {
  if (isLabelExpired(label)) {
    return 'expired';
  }
  if (isLabelExpiringSoon(label)) {
    return 'expiring-soon';
  }
  return 'ok';
}

/**
 * Get label status color
 */
export function getLabelStatusColor(label: Label): string {
  const status = getLabelStatus(label);
  switch (status) {
    case 'expired':
      return 'text-error-600';
    case 'expiring-soon':
      return 'text-warning-600';
    case 'ok':
      return 'text-success-600';
  }
}

/**
 * Get label status badge color
 */
export function getLabelStatusBadgeColor(label: Label): string {
  const status = getLabelStatus(label);
  switch (status) {
    case 'expired':
      return 'bg-error-100 text-error-700';
    case 'expiring-soon':
      return 'bg-warning-100 text-warning-700';
    case 'ok':
      return 'bg-success-100 text-success-700';
  }
}

/**
 * Get label status text
 */
export function getLabelStatusText(label: Label): string {
  const status = getLabelStatus(label);
  switch (status) {
    case 'expired':
      return 'Expiré';
    case 'expiring-soon':
      return 'Expire bientôt';
    case 'ok':
      return 'Valide';
  }
}

/**
 * Format allergens list
 */
export function formatAllergens(allergens?: string[]): string {
  if (!allergens || allergens.length === 0) {
    return 'Aucun';
  }
  return allergens.join(', ');
}

/**
 * Generate batch number
 */
export function generateBatchNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().substr(2, 2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `LOT${year}${month}${day}${random}`;
}

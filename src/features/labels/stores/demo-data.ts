/**
 * Demo data for labels feature
 * Used for development and testing
 */

import { STORAGE_KEYS } from '@/lib/constants';
import { calculateDLC } from '@/lib/format';
import { storage } from '@/lib/storage';

import type { Label, Product } from '../types';
import { ProductCategory, StorageTemperature } from '../types';

/**
 * Demo products
 */
export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'product_001',
    name: 'Sauce Béchamel',
    category: ProductCategory.SAUCE,
    shelfLifeDays: 2,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions: 'Conserver entre 0°C et +4°C',
    allergens: ['Lait', 'Gluten'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_002',
    name: 'Poulet Rôti',
    category: ProductCategory.COOKED,
    shelfLifeDays: 3,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions: 'Conserver entre 0°C et +4°C',
    allergens: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_003',
    name: 'Salade César',
    category: ProductCategory.PREPARED,
    shelfLifeDays: 1,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions: 'Conserver entre 0°C et +4°C. Consommer rapidement.',
    allergens: ['Œuf', 'Poisson', 'Lait'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_004',
    name: 'Tiramisu',
    category: ProductCategory.DESSERT,
    shelfLifeDays: 3,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions: 'Conserver entre 0°C et +4°C',
    allergens: ['Œuf', 'Lait', 'Gluten'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_005',
    name: 'Viande Hachée',
    category: ProductCategory.RAW,
    shelfLifeDays: 2,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions:
      'Conserver entre 0°C et +4°C. Cuire avant consommation.',
    allergens: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_006',
    name: 'Soupe du Jour',
    category: ProductCategory.PREPARED,
    shelfLifeDays: 2,
    storageTemperature: StorageTemperature.COLD,
    storageInstructions:
      'Conserver entre 0°C et +4°C. Réchauffer avant service.',
    allergens: ['Céleri'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'product_007',
    name: 'Tarte aux Pommes',
    category: ProductCategory.DESSERT,
    shelfLifeDays: 4,
    storageTemperature: StorageTemperature.AMBIENT,
    storageInstructions:
      "Conserver à température ambiante, à l'abri de la chaleur",
    allergens: ['Gluten', 'Œuf'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Generate demo labels for the past 7 days
 */
export function generateDemoLabels(): Label[] {
  const labels: Label[] = [];
  const today = new Date();

  // Generate labels for the past 7 days
  for (let daysAgo = 0; daysAgo < 7; daysAgo++) {
    const productionDate = new Date(today);
    productionDate.setDate(today.getDate() - daysAgo);

    // Generate 2-4 labels per day
    const labelsPerDay = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < labelsPerDay; i++) {
      const product =
        DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)];
      const dlcDate = calculateDLC(productionDate, product.shelfLifeDays);

      const label: Label = {
        id: `label_${productionDate.getTime()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        productName: product.name,
        productionDate: productionDate.toISOString(),
        dlc: dlcDate.toISOString(),
        batchNumber: `LOT${(daysAgo + 1).toString().padStart(3, '0')}${String.fromCharCode(65 + i)}`,
        notes:
          i % 3 === 0
            ? 'Production du matin'
            : i % 3 === 1
              ? 'Production du soir'
              : undefined,
        printedAt:
          daysAgo < 2
            ? new Date(productionDate.getTime() + 300000).toISOString()
            : undefined,
        printedBy: daysAgo < 2 ? 'Chef Jean' : undefined,
        userId: 'user_demo',
        userName: 'Chef Jean',
      };

      labels.push(label);
    }
  }

  // Sort by production date (newest first)
  return labels.sort(
    (a, b) =>
      new Date(b.productionDate).getTime() -
      new Date(a.productionDate).getTime()
  );
}

/**
 * Check if demo data exists
 */
export function hasDemoData(): boolean {
  const productsJson = storage.getString(STORAGE_KEYS.PRODUCTS);
  const labelsJson = storage.getString(STORAGE_KEYS.LABELS);
  return !!(productsJson && labelsJson);
}

/**
 * Initialize demo data
 */
export function initializeDemoData(): void {
  const products = DEMO_PRODUCTS;
  const labels = generateDemoLabels();

  storage.set(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  storage.set(STORAGE_KEYS.LABELS, JSON.stringify(labels));
}

/**
 * Clear demo data
 */
export function clearDemoData(): void {
  storage.delete(STORAGE_KEYS.PRODUCTS);
  storage.delete(STORAGE_KEYS.LABELS);
  storage.delete(STORAGE_KEYS.CONNECTED_PRINTER);
}

/**
 * Types for Labels feature
 * DLC label printing via Bluetooth
 */

/**
 * Product category
 */
export const ProductCategory = {
  PREPARED: 'prepared',
  COOKED: 'cooked',
  RAW: 'raw',
  SAUCE: 'sauce',
  DESSERT: 'dessert',
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

/**
 * Storage temperature requirement
 */
export const StorageTemperature = {
  FROZEN: 'frozen',
  COLD: 'cold',
  AMBIENT: 'ambient',
} as const;

export type StorageTemperature =
  (typeof StorageTemperature)[keyof typeof StorageTemperature];

/**
 * Product definition for label printing
 */
export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  shelfLifeDays: number;
  storageTemperature: StorageTemperature;
  storageInstructions?: string;
  allergens?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Label record
 */
export type Label = {
  id: string;
  productId: string;
  productName: string;
  productionDate: string;
  dlc: string; // Date Limite de Consommation
  batchNumber?: string;
  notes?: string;
  printedAt?: string;
  printedBy?: string;
  userId: string;
  userName: string;
  syncedAt?: string;
};

/**
 * Printer connection status
 */
export const PrinterStatus = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  PRINTING: 'printing',
  ERROR: 'error',
} as const;

export type PrinterStatus = (typeof PrinterStatus)[keyof typeof PrinterStatus];

/**
 * Bluetooth printer device
 */
export type PrinterDevice = {
  id: string;
  name: string;
  address: string;
  isConnected: boolean;
};

/**
 * Form values for creating a label
 */
export type LabelFormValues = {
  productId: string;
  productionDate: string;
  batchNumber?: string;
  notes?: string;
};

/**
 * Label print data
 */
export type LabelPrintData = {
  productName: string;
  productionDate: string;
  dlc: string;
  batchNumber?: string;
  restaurantName: string;
  storageInstructions?: string;
};

/**
 * Types for Cleaning feature
 * QR code scanning and equipment cleaning validation
 */

/**
 * Equipment location in the kitchen
 */
export const EquipmentLocation = {
  KITCHEN_HOT: 'kitchen_hot',
  KITCHEN_COLD: 'kitchen_cold',
  STORAGE: 'storage',
  DISHWASHING: 'dishwashing',
  PREPARATION: 'preparation',
} as const;

export type EquipmentLocation =
  (typeof EquipmentLocation)[keyof typeof EquipmentLocation];

/**
 * Type of cleaning task
 */
export const CleaningTaskType = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  AFTER_USE: 'after_use',
  DEEP_CLEAN: 'deep_clean',
} as const;

export type CleaningTaskType =
  (typeof CleaningTaskType)[keyof typeof CleaningTaskType];

/**
 * Cleaning task definition
 */
export type CleaningTask = {
  id: string;
  name: string;
  description?: string;
  type: CleaningTaskType;
  estimatedMinutes?: number;
  instructions?: string[];
};

/**
 * Equipment that can be scanned
 */
export type Equipment = {
  id: string;
  qrCode: string;
  name: string;
  location: EquipmentLocation;
  imageUrl?: string;
  cleaningTasks: CleaningTask[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Cleaning validation record
 */
export type CleaningValidation = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  taskId: string;
  taskName: string;
  timestamp: string;
  userId: string;
  userName: string;
  notes?: string;
  photoUrl?: string;
  syncedAt?: string;
};

/**
 * Equipment with its latest validation
 */
export type EquipmentWithLatestValidation = Equipment & {
  latestValidation?: CleaningValidation;
  validationsCount: number;
};

/**
 * Form values for cleaning validation
 */
export type CleaningValidationFormValues = {
  taskId: string;
  notes?: string;
};

/**
 * Types for Checklists feature
 * HACCP temperature readings and compliance checks
 */

/**
 * Status of a checklist entry
 */
export const ChecklistEntryStatus = {
  OK: 'ok',
  WARNING: 'warning',
  ALERT: 'alert',
} as const;

export type ChecklistEntryStatus =
  (typeof ChecklistEntryStatus)[keyof typeof ChecklistEntryStatus];

/**
 * Frequency of checklist checks
 */
export const ChecklistFrequency = {
  DAILY: 'daily',
  SHIFT: 'shift',
  HOURLY: 'hourly',
} as const;

export type ChecklistFrequency =
  (typeof ChecklistFrequency)[keyof typeof ChecklistFrequency];

/**
 * Temperature thresholds for validation
 */
export type TemperatureThresholds = {
  min: number;
  max: number;
  unit: 'celsius' | 'fahrenheit';
};

/**
 * Checklist definition
 */
export type Checklist = {
  id: string;
  title: string;
  description?: string;
  equipmentId: string;
  equipmentName: string;
  frequency: ChecklistFrequency;
  thresholds: TemperatureThresholds;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Single checklist entry (temperature reading)
 */
export type ChecklistEntry = {
  id: string;
  checklistId: string;
  value: number;
  unit: 'celsius' | 'fahrenheit';
  timestamp: string;
  userId: string;
  userName: string;
  status: ChecklistEntryStatus;
  notes?: string;
  syncedAt?: string;
};

/**
 * Checklist with its latest entry
 */
export type ChecklistWithLatestEntry = Checklist & {
  latestEntry?: ChecklistEntry;
  entriesCount: number;
};

/**
 * Form values for creating a checklist entry
 */
export type ChecklistEntryFormValues = {
  value: number;
  notes?: string;
};

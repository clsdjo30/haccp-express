/**
 * Types for Settings feature
 * User preferences and app configuration
 */

/**
 * User role in the restaurant
 */
export const UserRole = {
  CHEF: 'chef',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/**
 * App language
 */
export const AppLanguage = {
  FRENCH: 'fr',
  ENGLISH: 'en',
} as const;

export type AppLanguage = (typeof AppLanguage)[keyof typeof AppLanguage];

/**
 * App theme
 */
export const AppTheme = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type AppTheme = (typeof AppTheme)[keyof typeof AppTheme];

/**
 * User settings
 */
export type UserSettings = {
  name?: string;
  role?: UserRole;
  photoUrl?: string;
  pin?: string; // Encrypted PIN code
  biometryEnabled: boolean;
  theme: AppTheme;
  language: AppLanguage;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
};

/**
 * Restaurant settings
 */
export type RestaurantSettings = {
  restaurantName: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  siret?: string;
  logoUrl?: string;
  defaultPrintCopies: number;
  autoSync: boolean;
  syncInterval: number;
};

/**
 * App preferences
 */
export type AppPreferences = {
  language: AppLanguage;
  theme: AppTheme;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

/**
 * Complete settings
 */
export type Settings = {
  user: UserSettings;
  restaurant: RestaurantSettings;
  preferences: AppPreferences;
};

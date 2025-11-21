/**
 * Application constants
 */

/**
 * HACCP temperature thresholds (in Celsius)
 */
export const HACCP_TEMPERATURES = {
  REFRIGERATION_MIN: 0,
  REFRIGERATION_MAX: 4,
  FREEZING_MAX: -18,
  HOT_HOLDING_MIN: 63,
  DANGER_ZONE_MIN: 5,
  DANGER_ZONE_MAX: 63,
} as const;

/**
 * Default shelf life for products (in days)
 */
export const DEFAULT_SHELF_LIFE = {
  PREPARED: 2,
  COOKED: 3,
  RAW: 2,
  SAUCE: 2,
  DESSERT: 3,
} as const;

/**
 * Maximum file sizes (in bytes)
 */
export const MAX_FILE_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5 MB
  DOCUMENT: 10 * 1024 * 1024, // 10 MB
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

/**
 * Date formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  ISO_TIME: 'YYYY-MM-DDTHH:mm:ss',
} as const;

/**
 * Storage keys for MMKV
 */
export const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings',
  RESTAURANT_SETTINGS: 'restaurant_settings',
  APP_PREFERENCES: 'app_preferences',
  AUTH_PIN: 'auth_pin',
  BIOMETRY_ENABLED: 'biometry_enabled',
  CHECKLISTS: 'checklists',
  CHECKLIST_ENTRIES: 'checklist_entries',
  EQUIPMENTS: 'equipments',
  CLEANING_VALIDATIONS: 'cleaning_validations',
  PRODUCTS: 'products',
  LABELS: 'labels',
  CONNECTED_PRINTER: 'connected_printer',
  LAST_SYNC: 'last_sync',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion réseau',
  UNKNOWN_ERROR: 'Une erreur inconnue est survenue',
  VALIDATION_ERROR: 'Erreur de validation',
  NOT_FOUND: 'Élément non trouvé',
  UNAUTHORIZED: 'Non autorisé',
  FORBIDDEN: 'Accès refusé',
} as const;

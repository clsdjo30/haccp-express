/**
 * Common types shared across the application
 */

/**
 * Base entity with common fields
 */
export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Pagination parameters
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * Paginated response
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

/**
 * API error response
 */
export type ApiError = {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
};

/**
 * Sync status for offline-first features
 */
export const SyncStatus = {
  PENDING: 'pending',
  SYNCED: 'synced',
  ERROR: 'error',
} as const;

export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus];

/**
 * User types
 */

import type { BaseEntity } from './common';

/**
 * User role
 */
export const UserRole = {
  CHEF: 'chef',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/**
 * User entity
 */
export type User = BaseEntity & {
  name: string;
  role: UserRole;
  photoUrl?: string;
  isActive: boolean;
};

/**
 * Current authenticated user
 */
export type CurrentUser = User & {
  pin?: string; // Encrypted
  biometryEnabled: boolean;
};

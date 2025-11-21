/**
 * Validation utilities for HACCP Express
 */

import type { ChecklistEntryStatus } from '@/features/checklists/types';

/**
 * Temperature thresholds validation result
 */
export type TemperatureValidationResult = {
  isValid: boolean;
  status: ChecklistEntryStatus;
  message?: string;
};

/**
 * Temperature validation options
 */
export type TemperatureValidationOptions = {
  value: number;
  min: number;
  max: number;
  warningMargin?: number;
};

/**
 * Validate temperature against thresholds
 * @param options - Validation options
 * @returns Validation result with status
 */
export function validateTemperature(
  options: TemperatureValidationOptions
): TemperatureValidationResult {
  const { value, min, max, warningMargin = 0.5 } = options;
  // Alert if outside thresholds
  if (value < min || value > max) {
    return {
      isValid: false,
      status: 'alert',
      message: `Température hors limites (${min}°C - ${max}°C)`,
    };
  }

  // Warning if close to thresholds
  if (value <= min + warningMargin || value >= max - warningMargin) {
    return {
      isValid: true,
      status: 'warning',
      message: `Température proche des limites`,
    };
  }

  // OK if within safe range
  return {
    isValid: true,
    status: 'ok',
    message: 'Température conforme',
  };
}

/**
 * Validate that a temperature is for refrigeration (0-4°C)
 * @param value - Temperature value in Celsius
 * @returns True if temperature is safe for refrigeration
 */
export function isRefrigerationSafe(value: number): boolean {
  return value >= 0 && value <= 4;
}

/**
 * Validate that a temperature is for freezing (below -18°C)
 * @param value - Temperature value in Celsius
 * @returns True if temperature is safe for freezing
 */
export function isFreezingSafe(value: number): boolean {
  return value <= -18;
}

/**
 * Validate that a temperature is for hot holding (above 63°C)
 * @param value - Temperature value in Celsius
 * @returns True if temperature is safe for hot holding
 */
export function isHotHoldingSafe(value: number): boolean {
  return value >= 63;
}

/**
 * Validate PIN code format
 * @param pin - PIN code to validate
 * @param minLength - Minimum length (default: 4)
 * @param maxLength - Maximum length (default: 6)
 * @returns True if PIN is valid
 */
export function validatePin(
  pin: string,
  minLength: number = 4,
  maxLength: number = 6
): boolean {
  if (!pin) return false;
  const pinRegex = new RegExp(`^\\d{${minLength},${maxLength}}$`);
  return pinRegex.test(pin);
}

/**
 * Validate QR code format
 * @param qrCode - QR code string to validate
 * @returns True if QR code format is valid
 */
export function validateQRCode(qrCode: string): boolean {
  if (!qrCode || qrCode.length < 3) return false;
  // QR codes should start with EQUIP_ for equipment
  return qrCode.startsWith('EQUIP_');
}

/**
 * Validate date is not in the future
 * @param date - Date to validate
 * @returns True if date is today or in the past
 */
export function validateDateNotFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return dateObj.getTime() <= now.getTime();
}

/**
 * Validate DLC is in the future
 * @param dlc - DLC date to validate
 * @returns True if DLC is in the future
 */
export function validateDLCInFuture(dlc: Date | string): boolean {
  const dateObj = typeof dlc === 'string' ? new Date(dlc) : dlc;
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day
  return dateObj.getTime() >= now.getTime();
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (French format)
 * @param phone - Phone number to validate
 * @returns True if phone format is valid
 */
export function validatePhoneNumber(phone: string): boolean {
  // French phone: 0X XX XX XX XX or +33 X XX XX XX XX
  const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

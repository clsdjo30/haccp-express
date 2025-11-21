/**
 * Formatting utilities for HACCP Express
 */

/**
 * Format a date for display
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = 'fr-FR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Format a date and time for display
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: string | Date,
  locale: string = 'fr-FR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a time for display
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @returns Formatted time string
 */
export function formatTime(
  date: string | Date,
  locale: string = 'fr-FR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a relative time (e.g., "il y a 2 heures")
 * @param date - Date string or Date object
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: string | Date,
  locale: string = 'fr-FR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) {
    return locale === 'fr-FR' ? "À l'instant" : 'Just now';
  }
  if (diffInMinutes < 60) {
    return locale === 'fr-FR'
      ? `Il y a ${diffInMinutes} min`
      : `${diffInMinutes} min ago`;
  }
  if (diffInHours < 24) {
    return locale === 'fr-FR'
      ? `Il y a ${diffInHours}h`
      : `${diffInHours}h ago`;
  }
  if (diffInDays < 7) {
    return locale === 'fr-FR' ? `Il y a ${diffInDays}j` : `${diffInDays}d ago`;
  }
  return formatDate(dateObj, locale);
}

/**
 * Format temperature with unit
 * @param value - Temperature value
 * @param unit - Temperature unit ('celsius' or 'fahrenheit')
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted temperature string
 */
export function formatTemperature(
  value: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius',
  decimals: number = 1
): string {
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${value.toFixed(decimals)}${symbol}`;
}

/**
 * Convert Celsius to Fahrenheit
 * @param celsius - Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 * @param fahrenheit - Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Format a number with locale-specific formatting
 * @param value - Number to format
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: string = 'fr-FR',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Calculate DLC (Date Limite de Consommation)
 * @param productionDate - Production date
 * @param shelfLifeDays - Number of days the product is safe to consume
 * @returns DLC date
 */
export function calculateDLC(
  productionDate: Date | string,
  shelfLifeDays: number
): Date {
  const date =
    typeof productionDate === 'string'
      ? new Date(productionDate)
      : productionDate;
  const dlc = new Date(date);
  dlc.setDate(dlc.getDate() + shelfLifeDays);
  return dlc;
}

/**
 * Format DLC for label printing (DD/MM/YYYY format)
 * @param date - DLC date
 * @returns Formatted DLC string
 */
export function formatDLC(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Demo data for checklists feature
 * Used for development and testing
 */

import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';

import type { Checklist, ChecklistEntry } from '../types';

/**
 * Demo checklists
 */
export const DEMO_CHECKLISTS: Checklist[] = [
  {
    id: 'checklist_fridge_1',
    title: 'Relevé Frigo 1 - Matin',
    description: 'Contrôle température chambre froide positive',
    equipmentId: 'EQUIP_FRIDGE_001',
    equipmentName: 'Frigo 1 - Chambre froide',
    frequency: 'daily',
    thresholds: {
      min: 0,
      max: 4,
      unit: 'celsius',
    },
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'checklist_fridge_2',
    title: 'Relevé Frigo 2 - Matin',
    description: 'Contrôle température frigo produits laitiers',
    equipmentId: 'EQUIP_FRIDGE_002',
    equipmentName: 'Frigo 2 - Produits laitiers',
    frequency: 'daily',
    thresholds: {
      min: 0,
      max: 4,
      unit: 'celsius',
    },
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'checklist_freezer_1',
    title: 'Relevé Congélateur - Matin',
    description: 'Contrôle température congélateur',
    equipmentId: 'EQUIP_FREEZER_001',
    equipmentName: 'Congélateur principal',
    frequency: 'daily',
    thresholds: {
      min: -24,
      max: -18,
      unit: 'celsius',
    },
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'checklist_hot_hold',
    title: 'Plat témoin - Service midi',
    description: 'Contrôle température maintien à chaud',
    equipmentId: 'EQUIP_HOTHOLD_001',
    equipmentName: 'Bain-marie service',
    frequency: 'shift',
    thresholds: {
      min: 63,
      max: 85,
      unit: 'celsius',
    },
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

/**
 * Demo entries (last 7 days)
 */
export function generateDemoEntries(): ChecklistEntry[] {
  const entries: ChecklistEntry[] = [];
  const now = new Date();

  // Generate entries for the last 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);
    date.setHours(8, 30, 0, 0); // Morning check at 8:30

    // Fridge 1 - mostly good
    entries.push({
      id: `entry_fridge1_day${day}`,
      checklistId: 'checklist_fridge_1',
      value: 2 + Math.random() * 1.5, // 2-3.5°C
      unit: 'celsius',
      timestamp: date.toISOString(),
      userId: 'user_1',
      userName: 'Jean Dupont',
      status: 'ok',
    });

    // Fridge 2 - occasional warnings
    const fridge2Temp = 1 + Math.random() * 3; // 1-4°C
    entries.push({
      id: `entry_fridge2_day${day}`,
      checklistId: 'checklist_fridge_2',
      value: fridge2Temp,
      unit: 'celsius',
      timestamp: new Date(date.getTime() + 300000).toISOString(), // +5 min
      userId: 'user_1',
      userName: 'Jean Dupont',
      status: fridge2Temp > 3.5 ? 'warning' : 'ok',
    });

    // Freezer - good
    entries.push({
      id: `entry_freezer_day${day}`,
      checklistId: 'checklist_freezer_1',
      value: -20 - Math.random() * 2, // -20 to -22°C
      unit: 'celsius',
      timestamp: new Date(date.getTime() + 600000).toISOString(), // +10 min
      userId: 'user_1',
      userName: 'Jean Dupont',
      status: 'ok',
    });

    // Hot holding - lunch service
    const lunchDate = new Date(date);
    lunchDate.setHours(12, 0, 0, 0);
    entries.push({
      id: `entry_hothold_day${day}`,
      checklistId: 'checklist_hot_hold',
      value: 65 + Math.random() * 10, // 65-75°C
      unit: 'celsius',
      timestamp: lunchDate.toISOString(),
      userId: 'user_2',
      userName: 'Marie Martin',
      status: 'ok',
    });
  }

  return entries;
}

/**
 * Initialize demo data in storage
 */
export function initializeDemoData(): void {
  // Save checklists
  storage.set(STORAGE_KEYS.CHECKLISTS, JSON.stringify(DEMO_CHECKLISTS));

  // Save entries
  const entries = generateDemoEntries();
  storage.set(STORAGE_KEYS.CHECKLIST_ENTRIES, JSON.stringify(entries));
}

/**
 * Check if demo data exists
 */
export function hasDemoData(): boolean {
  return storage.contains(STORAGE_KEYS.CHECKLISTS);
}

/**
 * Demo data for cleaning feature
 * Used for development and testing
 */

/* eslint-disable max-lines-per-function */
import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/storage';

import type { CleaningValidation, Equipment } from '../types';

/**
 * Demo equipments
 */
export const DEMO_EQUIPMENTS: Equipment[] = [
  {
    id: 'equipment_friteuse_001',
    qrCode: 'EQUIP_FRIT_001',
    name: 'Friteuse 1',
    location: 'kitchen_hot',
    cleaningTasks: [
      {
        id: 'task_frit_daily',
        name: 'Nettoyage quotidien',
        description:
          'Nettoyage complet de la friteuse et changement du bac de récupération',
        type: 'daily',
        estimatedMinutes: 15,
        instructions: [
          'Éteindre et laisser refroidir',
          "Vider l'huile dans le bac de récupération",
          'Nettoyer les parois avec dégraissant',
          "Rincer à l'eau claire",
          'Sécher complètement',
        ],
      },
      {
        id: 'task_frit_oil',
        name: "Changement d'huile",
        description: "Changement complet de l'huile de friture",
        type: 'weekly',
        estimatedMinutes: 20,
      },
    ],
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'equipment_grill_001',
    qrCode: 'EQUIP_GRILL_001',
    name: 'Grill/Plancha',
    location: 'kitchen_hot',
    cleaningTasks: [
      {
        id: 'task_grill_service',
        name: 'Nettoyage après service',
        description: 'Nettoyage rapide après chaque service',
        type: 'after_use',
        estimatedMinutes: 10,
        instructions: [
          'Gratter la plaque encore chaude',
          'Nettoyer avec une éponge et dégraissant',
          'Rincer',
          'Sécher',
        ],
      },
      {
        id: 'task_grill_deep',
        name: 'Nettoyage approfondi',
        description: 'Nettoyage complet du grill',
        type: 'weekly',
        estimatedMinutes: 30,
      },
    ],
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'equipment_dishwasher_001',
    qrCode: 'EQUIP_DISH_001',
    name: 'Lave-vaisselle industriel',
    location: 'dishwashing',
    cleaningTasks: [
      {
        id: 'task_dish_daily',
        name: 'Nettoyage quotidien',
        description: 'Nettoyage complet du lave-vaisselle',
        type: 'daily',
        estimatedMinutes: 20,
        instructions: [
          'Vider les filtres',
          'Nettoyer les bras de lavage',
          'Nettoyer les parois intérieures',
          'Vérifier les gicleurs',
          'Nettoyer les joints',
        ],
      },
      {
        id: 'task_dish_detartrage',
        name: 'Détartrage',
        description: 'Détartrage complet de la machine',
        type: 'monthly',
        estimatedMinutes: 45,
      },
    ],
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'equipment_workstation_001',
    qrCode: 'EQUIP_WORK_001',
    name: 'Plan de travail principal',
    location: 'preparation',
    cleaningTasks: [
      {
        id: 'task_work_service',
        name: 'Nettoyage entre services',
        description: 'Désinfection du plan de travail',
        type: 'after_use',
        estimatedMinutes: 5,
        instructions: [
          'Retirer tous les ustensiles et aliments',
          'Nettoyer avec produit alimentaire',
          'Désinfecter',
          'Rincer',
          'Sécher',
        ],
      },
      {
        id: 'task_work_deep',
        name: 'Nettoyage approfondi',
        description: 'Nettoyage complet avec dégraissage',
        type: 'daily',
        estimatedMinutes: 15,
      },
    ],
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'equipment_fridge_cold_001',
    qrCode: 'EQUIP_FRIDGE_COLD_001',
    name: 'Chambre froide',
    location: 'storage',
    cleaningTasks: [
      {
        id: 'task_fridge_weekly',
        name: 'Nettoyage hebdomadaire',
        description: 'Nettoyage complet de la chambre froide',
        type: 'weekly',
        estimatedMinutes: 45,
        instructions: [
          'Vider partiellement',
          'Nettoyer les étagères',
          'Nettoyer les parois',
          'Nettoyer le sol',
          'Désinfecter',
        ],
      },
      {
        id: 'task_fridge_daily',
        name: 'Contrôle quotidien',
        description: 'Vérification et nettoyage rapide',
        type: 'daily',
        estimatedMinutes: 10,
      },
    ],
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

/**
 * Generate demo validations (last 7 days)
 */
export function generateDemoValidations(): CleaningValidation[] {
  const validations: CleaningValidation[] = [];
  const now = new Date();

  // Generate validations for the last 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);

    // Friteuse - daily cleaning
    date.setHours(19, 30, 0, 0); // After service
    validations.push({
      id: `validation_frit_day${day}`,
      equipmentId: 'equipment_friteuse_001',
      equipmentName: 'Friteuse 1',
      taskId: 'task_frit_daily',
      taskName: 'Nettoyage quotidien',
      timestamp: date.toISOString(),
      userId: 'user_2',
      userName: 'Marie Martin',
    });

    // Grill - after service
    date.setHours(14, 45, 0, 0); // After lunch
    validations.push({
      id: `validation_grill_lunch_day${day}`,
      equipmentId: 'equipment_grill_001',
      equipmentName: 'Grill/Plancha',
      taskId: 'task_grill_service',
      taskName: 'Nettoyage après service',
      timestamp: date.toISOString(),
      userId: 'user_1',
      userName: 'Jean Dupont',
    });

    // Grill - after dinner
    date.setHours(22, 15, 0, 0);
    validations.push({
      id: `validation_grill_dinner_day${day}`,
      equipmentId: 'equipment_grill_001',
      equipmentName: 'Grill/Plancha',
      taskId: 'task_grill_service',
      taskName: 'Nettoyage après service',
      timestamp: date.toISOString(),
      userId: 'user_2',
      userName: 'Marie Martin',
    });

    // Dishwasher - daily
    date.setHours(23, 0, 0, 0); // End of day
    validations.push({
      id: `validation_dish_day${day}`,
      equipmentId: 'equipment_dishwasher_001',
      equipmentName: 'Lave-vaisselle industriel',
      taskId: 'task_dish_daily',
      taskName: 'Nettoyage quotidien',
      timestamp: date.toISOString(),
      userId: 'user_3',
      userName: 'Pierre Durand',
    });

    // Workstation - multiple times
    date.setHours(11, 0, 0, 0); // Before lunch service
    validations.push({
      id: `validation_work_prelunch_day${day}`,
      equipmentId: 'equipment_workstation_001',
      equipmentName: 'Plan de travail principal',
      taskId: 'task_work_service',
      taskName: 'Nettoyage entre services',
      timestamp: date.toISOString(),
      userId: 'user_1',
      userName: 'Jean Dupont',
    });

    date.setHours(18, 30, 0, 0); // Before dinner service
    validations.push({
      id: `validation_work_predinner_day${day}`,
      equipmentId: 'equipment_workstation_001',
      equipmentName: 'Plan de travail principal',
      taskId: 'task_work_service',
      taskName: 'Nettoyage entre services',
      timestamp: date.toISOString(),
      userId: 'user_2',
      userName: 'Marie Martin',
    });
  }

  // Weekly tasks (only once in the 7 days)
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 3);
  weekAgo.setHours(16, 0, 0, 0);

  validations.push({
    id: 'validation_frit_oil_weekly',
    equipmentId: 'equipment_friteuse_001',
    equipmentName: 'Friteuse 1',
    taskId: 'task_frit_oil',
    taskName: "Changement d'huile",
    timestamp: weekAgo.toISOString(),
    userId: 'user_1',
    userName: 'Jean Dupont',
    notes: 'Huile changée, ancienne huile évacuée',
  });

  validations.push({
    id: 'validation_fridge_weekly',
    equipmentId: 'equipment_fridge_cold_001',
    equipmentName: 'Chambre froide',
    taskId: 'task_fridge_weekly',
    taskName: 'Nettoyage hebdomadaire',
    timestamp: weekAgo.toISOString(),
    userId: 'user_2',
    userName: 'Marie Martin',
    notes: 'Nettoyage complet effectué',
  });

  return validations;
}

/**
 * Initialize demo data in storage
 */
export function initializeCleaningDemoData(): void {
  // Save equipments
  storage.set(STORAGE_KEYS.EQUIPMENTS, JSON.stringify(DEMO_EQUIPMENTS));

  // Save validations
  const validations = generateDemoValidations();
  storage.set(STORAGE_KEYS.CLEANING_VALIDATIONS, JSON.stringify(validations));
}

/**
 * Check if demo data exists
 */
export function hasCleaningDemoData(): boolean {
  return storage.contains(STORAGE_KEYS.EQUIPMENTS);
}

/**
 * Clear demo data
 */
export function clearCleaningDemoData(): void {
  storage.delete(STORAGE_KEYS.EQUIPMENTS);
  storage.delete(STORAGE_KEYS.CLEANING_VALIDATIONS);
}

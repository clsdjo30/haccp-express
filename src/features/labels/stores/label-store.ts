/**
 * Label store using Zustand
 * Manages products, labels, and printer with MMKV persistence
 */

/* eslint-disable max-lines-per-function */
import { create } from 'zustand';

import { STORAGE_KEYS } from '@/lib/constants';
import { calculateDLC } from '@/lib/format';
import { storage } from '@/lib/storage';

import type { Label, LabelFormValues, PrinterDevice, Product } from '../types';

type LabelStore = {
  // State
  products: Product[];
  labels: Label[];
  connectedPrinter: PrinterDevice | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadData: () => void;
  addLabel: (input: LabelFormValues, userId: string, userName: string) => Label;
  getLabelById: (id: string) => Label | null;
  getLabelsByProduct: (productId: string, limit?: number) => Label[];
  getTodayLabelsCount: () => number;
  getProductById: (id: string) => Product | null;
  connectPrinter: (printer: PrinterDevice) => void;
  disconnectPrinter: () => void;
  clearAllData: () => void;
};

/**
 * Label store
 */
export const useLabelStore = create<LabelStore>((set, get) => ({
  // Initial state
  products: [],
  labels: [],
  connectedPrinter: null,
  isLoading: false,
  error: null,

  // Load data from MMKV storage
  loadData: () => {
    try {
      set({ isLoading: true, error: null });

      const productsJson = storage.getString(STORAGE_KEYS.PRODUCTS);
      const labelsJson = storage.getString(STORAGE_KEYS.LABELS);
      const printerJson = storage.getString(STORAGE_KEYS.CONNECTED_PRINTER);

      const products = productsJson
        ? (JSON.parse(productsJson) as Product[])
        : [];
      const labels = labelsJson ? (JSON.parse(labelsJson) as Label[]) : [];
      const connectedPrinter = printerJson
        ? (JSON.parse(printerJson) as PrinterDevice)
        : null;

      set({ products, labels, connectedPrinter, isLoading: false });
    } catch (_error) {
      set({
        error: 'Erreur lors du chargement des produits',
        isLoading: false,
      });
    }
  },

  // Add a new label
  addLabel: (input, userId, userName) => {
    const product = get().products.find((p) => p.id === input.productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    // Calculate DLC
    const productionDate = new Date(input.productionDate);
    const dlcDate = calculateDLC(productionDate, product.shelfLifeDays);

    const newLabel: Label = {
      id: `label_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      productName: product.name,
      productionDate: input.productionDate,
      dlc: dlcDate.toISOString(),
      batchNumber: input.batchNumber,
      notes: input.notes,
      userId,
      userName,
    };

    const labels = [...get().labels, newLabel];
    set({ labels });

    // Persist to MMKV
    storage.set(STORAGE_KEYS.LABELS, JSON.stringify(labels));

    return newLabel;
  },

  // Get label by ID
  getLabelById: (id) => {
    return get().labels.find((l) => l.id === id) || null;
  },

  // Get labels by product
  getLabelsByProduct: (productId, limit) => {
    const labels = get()
      .labels.filter((l) => l.productId === productId)
      .sort((a, b) => {
        return (
          new Date(b.productionDate).getTime() -
          new Date(a.productionDate).getTime()
        );
      });

    return limit ? labels.slice(0, limit) : labels;
  },

  // Get today's labels count
  getTodayLabelsCount: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return get().labels.filter((label) => {
      const labelDate = new Date(label.productionDate);
      labelDate.setHours(0, 0, 0, 0);
      return labelDate.getTime() === today.getTime();
    }).length;
  },

  // Get product by ID
  getProductById: (id) => {
    return get().products.find((p) => p.id === id) || null;
  },

  // Connect printer
  connectPrinter: (printer) => {
    set({ connectedPrinter: printer });
    storage.set(STORAGE_KEYS.CONNECTED_PRINTER, JSON.stringify(printer));
  },

  // Disconnect printer
  disconnectPrinter: () => {
    set({ connectedPrinter: null });
    storage.delete(STORAGE_KEYS.CONNECTED_PRINTER);
  },

  // Clear all data
  clearAllData: () => {
    set({
      products: [],
      labels: [],
      connectedPrinter: null,
      error: null,
    });
    storage.delete(STORAGE_KEYS.PRODUCTS);
    storage.delete(STORAGE_KEYS.LABELS);
    storage.delete(STORAGE_KEYS.CONNECTED_PRINTER);
  },
}));

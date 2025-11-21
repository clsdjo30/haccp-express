/**
 * ProductSelector component
 * Select product from a list
 */

/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';

import type { Product } from '../types';
import {
  formatAllergens,
  getProductCategoryColor,
  getProductCategoryLabel,
  getStorageTemperatureIcon,
} from '../utils';

type ProductSelectorProps = {
  products: Product[];
  selectedProductId?: string;
  onSelectProduct: (product: Product) => void;
};

/**
 * Product selector component
 * Displays a list of products to choose from
 */
export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
}: ProductSelectorProps) {
  const activeProducts = products.filter((p) => p.isActive);

  if (activeProducts.length === 0) {
    return (
      <View className="rounded-lg bg-neutral-100 p-4">
        <Text className="text-center text-sm text-neutral-600">
          Aucun produit disponible
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-2">
      {activeProducts.map((product) => {
        const isSelected = product.id === selectedProductId;
        const categoryColor = getProductCategoryColor(product.category);
        const categoryLabel = getProductCategoryLabel(product.category);
        const temperatureIcon = getStorageTemperatureIcon(
          product.storageTemperature
        );
        const allergensText = formatAllergens(product.allergens);

        return (
          <Pressable
            key={product.id}
            onPress={() => onSelectProduct(product)}
            className={`rounded-lg border-2 p-3 ${
              isSelected
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text
                  className={`text-base font-semibold ${
                    isSelected ? 'text-primary-900' : 'text-neutral-900'
                  }`}
                >
                  {product.name}
                </Text>

                <View className="mt-1 flex-row items-center gap-2">
                  <View className={`rounded-full px-2 py-0.5 ${categoryColor}`}>
                    <Text className="text-xs font-medium text-white">
                      {categoryLabel}
                    </Text>
                  </View>

                  <Text className="text-xs text-neutral-600">
                    {temperatureIcon} DLC: {product.shelfLifeDays}j
                  </Text>
                </View>

                {product.allergens && product.allergens.length > 0 && (
                  <Text className="mt-1 text-xs text-neutral-600">
                    Allergènes: {allergensText}
                  </Text>
                )}
              </View>

              {isSelected && (
                <View className="ml-2">
                  <View className="size-6 items-center justify-center rounded-full bg-primary-500">
                    <Text className="text-sm font-bold text-white">✓</Text>
                  </View>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

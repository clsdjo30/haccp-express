/**
 * NewLabel screen
 * Create a new label with product selection and dates
 */

/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import { z } from 'zod';

import { Button, Input, Text, View } from '@/components/ui';
import { calculateDLC } from '@/lib/format';

import { LabelPreview, ProductSelector } from '../components';
import { useAddLabel, usePrintLabel, useProducts } from '../hooks';
import { hasDemoData, initializeDemoData } from '../stores';
import type { LabelFormValues, LabelPrintData } from '../types';
import { generateBatchNumber } from '../utils';

const labelSchema = z.object({
  productId: z.string().min(1, 'Veuillez sélectionner un produit'),
  productionDate: z.string().min(1, 'Date de production requise'),
  batchNumber: z.string().optional(),
  notes: z.string().optional(),
});

export function NewLabelScreen() {
  const router = useRouter();
  const { products, isLoading, refresh } = useProducts();
  const { mutate: addLabel } = useAddLabel();
  const { printAndShare } = usePrintLabel();
  const [showPreview, setShowPreview] = React.useState(false);

  const { control, handleSubmit, formState, watch } = useForm<LabelFormValues>({
    resolver: zodResolver(labelSchema),
    defaultValues: {
      productId: '',
      productionDate: new Date().toISOString().split('T')[0],
      batchNumber: generateBatchNumber(),
      notes: '',
    },
  });

  React.useEffect(() => {
    if (!hasDemoData()) {
      initializeDemoData();
      refresh();
    }
  }, [refresh]);

  const selectedProductId = watch('productId');
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const onSubmit = async (values: LabelFormValues) => {
    try {
      if (!selectedProduct) return;

      const label = await addLabel(values, 'user_demo', 'Chef Jean');

      Alert.alert(
        'Étiquette créée',
        "Voulez-vous imprimer l'étiquette maintenant ?",
        [
          {
            text: 'Plus tard',
            style: 'cancel',
            onPress: () => router.back(),
          },
          {
            text: 'Imprimer',
            onPress: async () => {
              try {
                const printData: LabelPrintData = {
                  productName: selectedProduct.name,
                  productionDate: label.productionDate,
                  dlc: label.dlc,
                  batchNumber: label.batchNumber,
                  restaurantName: 'Restaurant Demo',
                  storageInstructions: selectedProduct.storageInstructions,
                };

                await printAndShare(printData);
                router.back();
              } catch (_error) {
                Alert.alert('Erreur', "Impossible d'imprimer l'étiquette");
              }
            },
          },
        ]
      );
    } catch (_error) {
      Alert.alert('Erreur', "Impossible de créer l'étiquette");
    }
  };

  const previewData = React.useMemo(() => {
    if (!selectedProduct) return null;

    const productionDate = watch('productionDate');
    const batchNumber = watch('batchNumber');

    if (!productionDate) return null;

    const dlcDate = calculateDLC(
      new Date(productionDate),
      selectedProduct.shelfLifeDays
    );

    return {
      productName: selectedProduct.name,
      productionDate,
      dlc: dlcDate.toISOString(),
      batchNumber,
      restaurantName: 'Restaurant Demo',
      storageInstructions: selectedProduct.storageInstructions,
    } as LabelPrintData;
  }, [selectedProduct, watch]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-600">Chargement...</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 p-4">
        <Text className="mb-2 text-center text-lg font-semibold text-neutral-900">
          Aucun produit
        </Text>
        <Text className="mb-4 text-center text-sm text-neutral-600">
          Aucun produit n&apos;est configuré pour le moment.
        </Text>
        <Button
          label="Initialiser les données de démo"
          onPress={() => {
            initializeDemoData();
            refresh();
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="p-4">
        <Text className="mb-4 text-xl font-bold text-neutral-900">
          Nouvelle Étiquette DLC
        </Text>

        {/* Product selection */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-neutral-700">
            Produit *
          </Text>
          <Controller
            control={control}
            name="productId"
            render={({ field: { value, onChange } }) => (
              <ProductSelector
                products={products}
                selectedProductId={value}
                onSelectProduct={(product) => onChange(product.id)}
              />
            )}
          />
          {formState.errors.productId && (
            <Text className="text-error-600 mt-1 text-sm">
              {formState.errors.productId.message}
            </Text>
          )}
        </View>

        {/* Production date */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-neutral-700">
            Date de production *
          </Text>
          <Controller
            control={control}
            name="productionDate"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="YYYY-MM-DD"
                error={formState.errors.productionDate?.message}
              />
            )}
          />
        </View>

        {/* Batch number */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-neutral-700">
            Numéro de lot
          </Text>
          <Controller
            control={control}
            name="batchNumber"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="LOT123"
              />
            )}
          />
        </View>

        {/* Notes */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-neutral-700">
            Notes
          </Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Notes optionnelles"
                multiline
                numberOfLines={3}
              />
            )}
          />
        </View>

        {/* Preview toggle */}
        {previewData && (
          <View className="mb-4">
            <Button
              label={showPreview ? "Masquer l'aperçu" : "Afficher l'aperçu"}
              variant="secondary"
              onPress={() => setShowPreview(!showPreview)}
            />
          </View>
        )}

        {/* Preview */}
        {showPreview && previewData && (
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-neutral-700">
              Aperçu de l&apos;étiquette
            </Text>
            <LabelPreview data={previewData} />
          </View>
        )}

        {/* Submit */}
        <Button
          label="Créer l'étiquette"
          onPress={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting}
        />
      </View>
    </ScrollView>
  );
}

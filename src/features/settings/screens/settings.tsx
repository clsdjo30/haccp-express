/**
 * Settings screen
 * Main settings screen with all configuration options
 */

/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { Alert, ScrollView } from 'react-native';

import { Text, View } from '@/components/ui';
import {
  clearDemoData as clearChecklistsData,
  initializeDemoData as initChecklistsData,
} from '@/features/checklists';
import {
  clearDemoData as clearCleaningData,
  initializeDemoData as initCleaningData,
} from '@/features/cleaning';
import {
  clearDemoData as clearLabelsData,
  initializeDemoData as initLabelsData,
} from '@/features/labels';

import { SettingItem, SettingSection, SettingToggle } from '../components';
import { useSettings, useUpdateUserSettings } from '../hooks';

export function SettingsScreen() {
  const { userSettings, restaurantSettings, isLoading } = useSettings();
  const { updateUserSettings, setTheme, setLanguage } = useUpdateUserSettings();

  if (isLoading || !userSettings || !restaurantSettings) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-600">Chargement...</Text>
      </View>
    );
  }

  const handleResetDemoData = () => {
    Alert.alert(
      'Réinitialiser les données',
      'Voulez-vous réinitialiser toutes les données de démonstration ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            clearChecklistsData();
            clearCleaningData();
            clearLabelsData();
            initChecklistsData();
            initCleaningData();
            initLabelsData();
            Alert.alert('Succès', 'Les données ont été réinitialisées');
          },
        },
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Effacer toutes les données',
      'ATTENTION: Cette action est irréversible. Toutes vos données seront supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Effacer',
          style: 'destructive',
          onPress: () => {
            clearChecklistsData();
            clearCleaningData();
            clearLabelsData();
            Alert.alert('Succès', 'Toutes les données ont été effacées');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="p-4">
        <Text className="mb-6 text-2xl font-bold text-neutral-900">
          Paramètres
        </Text>

        {/* Restaurant Info */}
        <SettingSection
          title="Restaurant"
          description="Informations du restaurant"
        >
          <SettingItem
            label="Nom du restaurant"
            value={restaurantSettings.restaurantName}
            icon="🏪"
            onPress={() => {
              Alert.alert('Info', 'Modification à implémenter');
            }}
          />
          <SettingItem
            label="Adresse"
            value={restaurantSettings.address || 'Non définie'}
            icon="📍"
            onPress={() => {
              Alert.alert('Info', 'Modification à implémenter');
            }}
          />
          <SettingItem
            label="Téléphone"
            value={restaurantSettings.phone || 'Non défini'}
            icon="📞"
            onPress={() => {
              Alert.alert('Info', 'Modification à implémenter');
            }}
          />
        </SettingSection>

        {/* Appearance */}
        <SettingSection
          title="Apparence"
          description="Personnalisation de l'interface"
        >
          <SettingItem
            label="Thème"
            value={userSettings.theme === 'light' ? 'Clair' : 'Sombre'}
            icon="🎨"
            onPress={() => {
              const newTheme =
                userSettings.theme === 'light' ? 'dark' : 'light';
              setTheme(newTheme);
            }}
          />
          <SettingItem
            label="Langue"
            value={userSettings.language === 'fr' ? 'Français' : 'English'}
            icon="🌐"
            onPress={() => {
              const newLang = userSettings.language === 'fr' ? 'en' : 'fr';
              setLanguage(newLang);
            }}
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          title="Notifications"
          description="Gérer les alertes et notifications"
        >
          <SettingToggle
            label="Notifications activées"
            description="Recevoir des alertes pour les tâches HACCP"
            icon="🔔"
            value={userSettings.notificationsEnabled}
            onValueChange={(value) =>
              updateUserSettings({ notificationsEnabled: value })
            }
          />
          <SettingToggle
            label="Son activé"
            description="Sons pour les notifications"
            icon="🔊"
            value={userSettings.soundEnabled}
            onValueChange={(value) =>
              updateUserSettings({ soundEnabled: value })
            }
          />
        </SettingSection>

        {/* Security */}
        <SettingSection title="Sécurité" description="Options de sécurité">
          <SettingToggle
            label="Authentification biométrique"
            description="Utiliser Touch ID / Face ID"
            icon="🔐"
            value={userSettings.biometryEnabled}
            onValueChange={(value) =>
              updateUserSettings({ biometryEnabled: value })
            }
          />
        </SettingSection>

        {/* Sync */}
        <SettingSection
          title="Synchronisation"
          description="Gestion de la synchronisation des données"
        >
          <SettingToggle
            label="Synchronisation automatique"
            description="Synchroniser automatiquement avec le serveur"
            icon="🔄"
            value={restaurantSettings.autoSync}
            onValueChange={(_value) => {
              Alert.alert('Info', 'Modification à implémenter');
            }}
          />
          <SettingItem
            label="Intervalle de synchronisation"
            value={`${restaurantSettings.syncInterval} min`}
            icon="⏱️"
            onPress={() => {
              Alert.alert('Info', 'Modification à implémenter');
            }}
          />
        </SettingSection>

        {/* Data Management */}
        <SettingSection title="Données" description="Gestion des données">
          <SettingItem
            label="Réinitialiser les données de démo"
            icon="🔄"
            onPress={handleResetDemoData}
          />
          <SettingItem
            label="Effacer toutes les données"
            icon="🗑️"
            onPress={handleClearAllData}
          />
        </SettingSection>

        {/* About */}
        <SettingSection
          title="À propos"
          description="Informations sur l'application"
        >
          <SettingItem label="Version" value="0.0.1" icon="ℹ️" />
          <SettingItem
            label="Aide & Support"
            icon="❓"
            onPress={() => {
              Alert.alert('Support', 'support@haccp-express.com');
            }}
          />
        </SettingSection>
      </View>
    </ScrollView>
  );
}

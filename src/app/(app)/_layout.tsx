import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import {
  Checklist as ChecklistIcon,
  Label as LabelIcon,
  QrCode as QrCodeIcon,
  Settings as SettingsIcon,
} from '@/components/ui/icons';
import { useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Checklists',
          tabBarIcon: ({ color }) => <ChecklistIcon color={color} />,
          tabBarButtonTestID: 'checklists-tab',
        }}
      />

      <Tabs.Screen
        name="cleaning"
        options={{
          title: 'Nettoyage',
          tabBarIcon: ({ color }) => <QrCodeIcon color={color} />,
          tabBarButtonTestID: 'cleaning-tab',
        }}
      />

      <Tabs.Screen
        name="labels"
        options={{
          title: 'Étiquettes',
          tabBarIcon: ({ color }) => <LabelIcon color={color} />,
          tabBarButtonTestID: 'labels-tab',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

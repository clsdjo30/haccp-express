import { Redirect } from 'expo-router';
import React from 'react';

import { Button, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const signIn = useAuth.use.signIn();
  const status = useAuth.use.status();

  const handleLogin = () => {
    signIn({ access: 'access-token', refresh: 'refresh-token' });
  };

  if (status === 'signIn') {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 justify-center p-4">
      <FocusAwareStatusBar />
      <Text className="mb-6 text-center text-2xl font-bold">HACCP Express</Text>
      <Text className="mb-8 text-center text-neutral-600">
        Connectez-vous pour accéder à l&apos;application
      </Text>
      <Button label="Se connecter" onPress={handleLogin} />
    </View>
  );
}

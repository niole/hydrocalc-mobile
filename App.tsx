import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { RootSiblingParent } from 'react-native-root-siblings';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootSiblingParent>
          <ActionSheetProvider>
            <>
              <Navigation colorScheme="light" />
              <StatusBar />
            </>
          </ActionSheetProvider>
        </RootSiblingParent>
      </SafeAreaProvider>
    );
  }
}

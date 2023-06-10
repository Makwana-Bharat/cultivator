import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/navigations/navigator';
import { store } from './src/redux/store';
import * as Font from 'expo-font';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadFonts() {
    try {
      await Font.loadAsync({
        'piedra-font': require('./assets/fonts/Piedra-Regular.ttf'),
      });
      setFontLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    // Font is still loading, show the Activity Indicator
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      <Provider store={store}>
        <AppRoute />
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31363C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

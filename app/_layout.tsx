import { ThemeProvider as NavThemeProvider, DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { ThemeProvider, useAppTheme } from '@/components/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const { colorScheme } = useAppTheme();

  return (
    <NavThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="account" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootLayoutContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
import { Tabs } from 'expo-router';
import React from 'react';
import { Home, NotebookPen, ChartPie, Apple, TrendingUp } from 'lucide-react-native';

// HapticTab: a custom button wrapper that adds a small vibration when you tap a tab
import { HapticTab } from '@/components/haptic-tab';

// Colors: app's color palette, likely split into light/dark variants
import { Colors } from '@/constants/theme';

// useColorScheme: a hook that tells you if the phone is in light or dark mode
import { useColorScheme } from '@/hooks/use-color-scheme';

// This component defines the bottom tab bar and everything in it.
// Its filename is _layout.tsx inside app/(tabs)/, which is a special
// Expo Router convention: a "_layout" file wraps and configures all
// the screens (files) that live in the same folder.
export default function TabLayout() {

  // Detects whether the user's phone is set to light or dark mode,
  // so you can adjust colors automatically instead of hardcoding one theme.
  const colorScheme = useColorScheme();

  return (
    // <Tabs> is the actual tab bar container from expo-router.
    // Everything inside it becomes one tab.
    <Tabs
      screenOptions={{
        // The color the active tab's icon/label turns when selected.
        // Colors[...] picks the right palette based on light/dark mode.
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        // Hides the default header bar at the top of each screen
        // (you're building your own headers per-screen instead).
        headerShown: false,

        // Swaps in the haptic-feedback button for every tab press.
        tabBarButton: HapticTab,
      }}>

      {/*
        Each <Tabs.Screen> below customizes ONE existing route.
        IMPORTANT: this doesn't create the screen itself — there must
        already be a matching file in app/(tabs)/ with the same name
        (e.g. name="diary" needs a real file at app/(tabs)/diary.tsx).
        This block just sets that route's tab title and icon.
      */}

      <Tabs.Screen
        name="index" // matches app/(tabs)/index.tsx — this is your Home screen
        options={{
          title: 'Home', // label shown under the icon in the tab bar
          // tabBarIcon is a function so it can receive the current tab color
          // (active vs inactive) and pass it into the icon component.
          tabBarIcon: ({ color }) => <Home size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="diary" // matches app/(tabs)/diary.tsx
        options={{
          title: 'Diary',
          tabBarIcon: ({ color }) => <NotebookPen size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="macros" // matches app/(tabs)/macros.tsx
        options={{
          title: 'Macros',
          tabBarIcon: ({ color }) => <ChartPie size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="nutrition" // matches app/(tabs)/nutrition.tsx
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Apple size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="progress" // matches app/(tabs)/progress.tsx
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <TrendingUp size={20} color={color}/>,
        }}
      />
    </Tabs>
  );
}
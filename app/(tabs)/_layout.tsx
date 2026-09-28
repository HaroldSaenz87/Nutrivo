import { Tabs } from 'expo-router';
import React from 'react';
import FloatingTabBar from '@/components/ui/FloatingTabBar';

// This file wraps every screen inside app/(tabs)/ and decides how the tab bar looks.
export default function TabLayout() {
  return (
    // `tabBar` swaps Expo's built-in tab bar for our own component.
    // {...props} forwards state / descriptors / navigation into FloatingTabBar.
    // `headerShown: false` hides the default top header (each screen draws its own).
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}>

      {/* One line per tab. `name` must match the filename in app/(tabs)/.
          Icons live in FloatingTabBar now, so only the title is set here. */}
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="diary" options={{ title: 'Diary' }} />
      <Tabs.Screen name="macros" options={{ title: 'Macros' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
    </Tabs>
  );
}
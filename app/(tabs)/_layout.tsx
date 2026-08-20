import { Tabs } from 'expo-router';
import React from 'react';
import { Home, NotebookPen, ChartPie, Apple, TrendingUp } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/components/ThemeContext';

export default function TabLayout() {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diary',
          tabBarIcon: ({ color }) => <NotebookPen size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="macros"
        options={{
          title: 'Macros',
          tabBarIcon: ({ color }) => <ChartPie size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Apple size={20} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <TrendingUp size={20} color={color}/>,
        }}
      />
    </Tabs>
  );
}
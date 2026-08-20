// components/account-screen/PreferencesCard.tsx
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAppTheme } from '../ThemeContext';
import { Colors } from '@/constants/theme';
import ToggleRow from '../ui/ToggleRow';
import NavRow from '../ui/NavRow';

export default function PreferencesCard() {
  const { colorScheme, setPreference } = useAppTheme();
  const theme = Colors[colorScheme];

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const isDarkMode = colorScheme === 'dark';

  const toggleAppearance = (value: boolean) => {
    setPreference(value ? 'dark' : 'light');
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.textSecondary }]}>Preferences</Text>

      <ToggleRow
        label="Reminders and notifications"
        value={notificationsEnabled}
        onValueChange={setNotificationsEnabled}
        labelColor={theme.textPrimary}
        dividerColor={theme.border}
        tintColor={theme.accentText}
      />

      <ToggleRow
        label="Appearance"
        value={isDarkMode}
        onValueChange={toggleAppearance}
        labelColor={theme.textPrimary}
        dividerColor={theme.border}
        tintColor={theme.accentText}
      />

      <NavRow
        label="Privacy and data"
        onPress={() => {}}
        labelColor={theme.textPrimary}
        trailingColor={theme.textSecondary}
        dividerColor={theme.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
});
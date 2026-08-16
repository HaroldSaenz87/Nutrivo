import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function CalorieCard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Calories today</Text>

      <Text style={[styles.value, { color: theme.textPrimary }]}>
        1,450 <Text style={[styles.sub, { color: theme.textSecondary }]}>/ 2,200 kcal</Text>
      </Text>

      <Text style={[styles.remaining, { color: theme.accentText }]}>750 kcal remaining</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '500',
  },
  sub: {
    fontSize: 14,
    fontWeight: '400',
  },
  remaining: {
    fontSize: 13,
    marginTop: 4,
  },
});
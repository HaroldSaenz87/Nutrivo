import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';

type Props = {
  logged: number;
  goal: number;
};

export default function LoggedTodayCard({ logged, goal }: Props) {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  // How far toward the goal today's total is, capped at 100%.
  const percent = Math.min(logged / goal, 1) * 100;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Logged today</Text>
        <Text style={[styles.value, { color: theme.textPrimary }]}>
          {logged.toLocaleString()} <Text style={[styles.sub, { color: theme.textSecondary }]}>/ {goal.toLocaleString()} kcal</Text>
        </Text>
      </View>

      {/* Progress bar toward the calorie goal */}
      <View style={[styles.track, { backgroundColor: theme.border }]}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: theme.tint }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 22,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
  },
  sub: {
    fontSize: 17,
    fontWeight: '400',
  },
  track: {
    width: 110,
    height: 9,
    borderRadius: 4.5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
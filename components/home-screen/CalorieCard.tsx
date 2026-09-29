import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { CalorieData } from '@/lib/homeScreen/mockCalorie';
import Ring from '../ui/Ring';
import { useAppTheme } from '../ThemeContext';

type Props = {
  data: CalorieData;
};

export default function CalorieCard({ data }: Props) {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const remaining = data.goal - data.consumed;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>

      {/* Ring showing calories consumed vs. goal */}
      <View style={styles.ring}>
        <Ring
          consumed={data.consumed}
          goal={data.goal}
          size={92}
          strokeWidth={11}
          trackColor={theme.border}
          progressColor={theme.tint}
          textColor={theme.textPrimary}
          innerBg={theme.card}
        />

      </View>

      {/* Calorie totals and remaining count */}
      <View style={styles.textGroup}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Calories today</Text>

        <Text style={[styles.value, { color: theme.textPrimary }]}>
          {data.consumed.toLocaleString()} <Text style={[styles.sub, { color: theme.textSecondary }]}>/ {data.goal.toLocaleString()}</Text>
        </Text>

        <Text style={[styles.remaining, { color: theme.accentText }]}>{remaining.toLocaleString()} calories remaining</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ring: {
    marginLeft: 10,
  },
  textGroup: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  value: {
    fontSize: 26,
    fontWeight: '500',
  },
  sub: {
    fontSize: 16,
    fontWeight: '400',
  },
  remaining: {
    fontSize: 16,
    marginTop: 6,
  },
});
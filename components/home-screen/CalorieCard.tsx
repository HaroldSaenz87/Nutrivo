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

      <View style={styles.ring}>
        <Ring
          consumed={data.consumed}
          goal={data.goal}
          trackColor={theme.border}
          progressColor={theme.tint}
          textColor={theme.textPrimary}
        />

      </View>

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
    padding: 16,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },
  ring:{
    marginLeft: 10
  },
  textGroup: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 15,
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
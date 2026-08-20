
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { WeightData } from '@/lib/homeScreen/mockWeight';
import LineChart from '../ui/LineChart';
import { useAppTheme } from '../ThemeContext';

type Props = {
  data: WeightData;
};

export default function WeightCard({ data }: Props) {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const current = data.entries[data.entries.length - 1].weight;
  const change = current - data.startWeight;
  const changeLabel = `${change > 0 ? '+' : ''}${change.toFixed(1)} ${data.unit} since start`;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Weight progress</Text>

      <LineChart
        data={data.entries.map((e) => ({ label: e.date, value: e.weight }))}
        color={theme.tint}
        dotColor={theme.accentText}
        axisColor={theme.textSecondary}
      />

      <Text style={[styles.change, { color: theme.accentText }]}>{changeLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
  },
  label: {
    fontSize: 15,
    marginBottom: 15,
  },
  change: {
    fontSize: 12,
    marginTop: 15,
  },
});
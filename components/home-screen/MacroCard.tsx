// components/home-screen/MacroCard.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, MacroColors } from '@/constants/theme';
import PieChart from '../ui/Piechart';
import { MacroData } from '@/lib/homeScreen/mockMacro';

type Props = {
  data: MacroData;
};

export default function MacroCard({ data }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const carbsColor = MacroColors.carbs[colorScheme];
  const proteinColor = MacroColors.protein;
  const fatColor = MacroColors.fat;

  const totalGrams = data.carbsGrams + data.proteinGrams + data.fatGrams;

  const macros = [
    { label: 'Carbs', grams: data.carbsGrams, color: carbsColor },
    { label: 'Protein', grams: data.proteinGrams, color: proteinColor },
    { label: 'Fat', grams: data.fatGrams, color: fatColor },
  ];

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>

      <View style={styles.chart}>
        <PieChart
          slices={macros.map((m) => ({ value: m.grams, color: m.color }))}
        />
      </View>

      <View style={styles.textGroup}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Macros breakdown</Text>

        {macros.map((m) => {
          const percent = totalGrams > 0 ? Math.round((m.grams / totalGrams) * 100) : 0;
          return (
            <View key={m.label} style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: m.color }]} />
              <Text style={[styles.legendLabel, { color: theme.textSecondary }]}>{m.label}</Text>
              <Text style={[styles.legendPercent, { color: theme.textPrimary }]}>{percent}%</Text>
            </View>
          );
        })}
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
  chart: {
    marginLeft: 10,
  },
  textGroup: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    flex: 1,
  },
  legendPercent: {
    fontSize: 12,
    fontWeight: '500',
  },
});
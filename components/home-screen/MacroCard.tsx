import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../ThemeContext';
import { Colors, MacroColors } from '@/constants/theme';
import { MacroData } from '@/lib/homeScreen/mockMacro';

type Props = {
  data: MacroData;
};

export default function MacroCard({ data }: Props) {
  const { colorScheme } = useAppTheme();
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

  const pieData = macros.map((m) => ({ value: m.grams, color: m.color }));

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      {/* Donut chart of carbs/protein/fat grams */}
      <View style={styles.chart}>
        <PieChart
          data={pieData}
          donut
          radius={54}
          innerRadius={36}
          innerCircleColor={theme.card}
        />
      </View>

      {/* Legend with per-macro percentage of total grams */}
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
    padding: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  chart: {
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
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 15,
    flex: 1,
  },
  legendPercent: {
    fontSize: 15,
    fontWeight: '500',
  },
});
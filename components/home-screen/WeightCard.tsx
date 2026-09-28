import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAppTheme } from '../ThemeContext';
import { Colors } from '@/constants/theme';
import { WeightData } from '@/lib/homeScreen/mockWeight';
import LineChart, { LineChartTick } from '../ui/LineChart';

type Props = {
  data: WeightData;
};

// Finds the 1st of every month between two timestamps and turns each into a label like "Aug".
function getMonthTicks(first: number, last: number): LineChartTick[] {
  const ticks: LineChartTick[] = [];

  // Start at the 1st of the month that contains the first data point
  const cursor = new Date(first);
  cursor.setDate(1);
  cursor.setHours(0, 0, 0, 0);

  // If that 1st is before our data starts, begin with the next month instead
  if (cursor.getTime() < first) {
    cursor.setMonth(cursor.getMonth() + 1);
  }

  // Walk forward one month at a time until we pass today
  while (cursor.getTime() <= last) {
    ticks.push({
      x: cursor.getTime(),
      label: cursor.toLocaleDateString(undefined, { month: 'short' }),
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return ticks;
}

export default function WeightCard({ data }: Props) {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  // The card's inner width, measured after layout, so the chart can fill it
  const [chartWidth, setChartWidth] = useState(0);

  // Turn each entry into a point: x = the date as a number (ms), y = the weight
  const points = data.entries.map((e) => ({ x: new Date(e.date).getTime(), y: e.weight }));

  const xTicks = getMonthTicks(points[0].x, points[points.length - 1].x);

  const current = data.entries[data.entries.length - 1].weight;
  const change = current - data.startWeight;
  const changeLabel = `${change > 0 ? '+' : ''}${change.toFixed(1)} ${data.unit} since start`;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Weight progress</Text>

      {/* onLayout reports this box's real width once it's drawn */}
      <View style={styles.chartBox} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
        {chartWidth > 0 && (
          <LineChart
            points={points}
            xTicks={xTicks}
            width={chartWidth}
            unit={` ${data.unit}`}
            color={theme.tint}
            dotColor={theme.accentText}
            axisColor={theme.textSecondary}
            tooltipBg={theme.tint}
            tooltipText={colorScheme === 'dark' ? theme.background : '#FFFFFF'}
          />
        )}
      </View>

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
    fontSize: 14,
    marginBottom: 8,
  },
  chartBox: {
    minHeight: 150, // reserves the space so the card doesn't jump when the chart appears
  },
  change: {
    fontSize: 15,
    marginTop: 4,
  },
});
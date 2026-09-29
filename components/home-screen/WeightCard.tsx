import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../ThemeContext';
import { Colors } from '@/constants/theme';
import { WeightData, WeightEntry } from '@/lib/homeScreen/mockWeight';

type Props = {
  data: WeightData;
};

// Collapses weekly entries down to one entry per month, so the chart
// shows a clean monthly trend instead of a cluttered weekly one.
function resampleToMonthly(entries: WeightEntry[]): WeightEntry[] {
  const byMonth = new Map<string, WeightEntry>();

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    byMonth.set(key, entry);
  });

  const monthly = Array.from(byMonth.values());

  const lastEntry = entries[entries.length - 1];
  const lastMonthly = monthly[monthly.length - 1];
  if (lastMonthly.date !== lastEntry.date) {
    monthly.push(lastEntry);
  }

  return monthly;
}

// Turns raw weight entries into the shape react-native-gifted-charts expects.
function buildChartData(entries: WeightEntry[]) {
  return entries.map((entry) => {
    const date = new Date(entry.date);
    return {
      value: entry.weight,
      label: date.toLocaleDateString(undefined, { month: 'short' }),
      dateLabel: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    };
  });
}

export default function WeightCard({ data }: Props) {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const [chartWidth, setChartWidth] = useState(0);

  const monthlyEntries = resampleToMonthly(data.entries);
  const chartData = buildChartData(monthlyEntries);
  const weights = data.entries.map((e) => e.weight);
  const maxWeight = Math.max(...weights);

  const current = data.entries[data.entries.length - 1].weight;
  const change = current - data.startWeight;
  const changeLabel = `${change > 0 ? '+' : ''}${change.toFixed(1)} ${data.unit} since start`;

  // Spacing between points is calculated manually rather than using
  // adjustToWidth, which silently ignores endSpacing and cuts off the
  // last label.
  const initialSpacing = 16;
  const endSpacing = 30;

  const yAxisLabelWidth = 28;

  // The chart's drawn width is `width` + yAxisLabelWidth, so subtract
  // that back out to keep the whole thing inside the card.
  const drawnWidth = chartWidth - yAxisLabelWidth;

  const pointCount = chartData.length;
  const spacing =
    pointCount > 1 ? (drawnWidth - initialSpacing - endSpacing) / (pointCount - 1) : 0;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Weight progress</Text>

      {/* Chart width comes from onLayout since gifted-charts needs an explicit width */}
      <View style={styles.chartBox} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
        {chartWidth > 0 && (
          <LineChart
            data={chartData}
            width={drawnWidth}
            height={150}
            spacing={spacing}
            initialSpacing={initialSpacing}
            endSpacing={endSpacing}
            curved
            thickness={3}
            color={theme.tint}
            dataPointsColor={theme.tint}
            dataPointsRadius={4}
            areaChart
            startFillColor={theme.tint}
            endFillColor={theme.tint}
            startOpacity={0.35}
            endOpacity={0}
            yAxisLabelWidth={30}
            maxValue={Math.ceil(maxWeight) + 3}
            noOfSections={2}
            hideRules
            yAxisColor="transparent"
            xAxisColor={theme.border}
            yAxisTextStyle={{ color: theme.textSecondary, fontSize: 12 }}
            xAxisLabelTextStyle={{ color: theme.textSecondary, fontSize: 12 }}
            // Drag-to-scrub tooltip showing weight + date at the touched point
            pointerConfig={{
              pointerStripHeight: 100,
              pointerStripColor: theme.border,
              pointerStripWidth: 1.5,
              strokeDashArray: [4, 4],
              pointerColor: theme.accentText,
              radius: 5,
              activatePointersInstantlyOnTouch: true,
              pointerLabelWidth: 80,
              pointerLabelHeight: 66,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items: any[]) => {
                const item = items[0];
                return (
                  <View style={[styles.tooltip, { backgroundColor: theme.tint, marginBottom: 14  }]}>
                    <Text style={[styles.tooltipValue, { color: colorScheme === 'dark' ? theme.background : '#FFFFFF' }]}>
                      {item.value.toFixed(1)} {data.unit}
                    </Text>
                    <Text style={[styles.tooltipDate, { color: colorScheme === 'dark' ? theme.background : '#FFFFFF' }]}>
                      {item.dateLabel}
                    </Text>
                  </View>
                );
              },
            }}
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
    padding: 20,
    borderWidth: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  chartBox: {
    
    minHeight: 150,
    alignItems: 'center',
    overflow: 'hidden',
  },
  change: {
    fontSize: 16,
    marginTop: 6,
  },
  tooltip: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  tooltipValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  tooltipDate: {
    fontSize: 11,
  },
});
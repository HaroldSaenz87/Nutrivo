import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../ThemeContext';
import { Colors } from '@/constants/theme';
import { WeightData, WeightEntry } from '@/lib/homeScreen/mockWeight';

type Props = {
  data: WeightData;
};

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

  // Manually work out spacing between points, instead of letting
  // adjustToWidth do it — adjustToWidth silently ignores endSpacing,
  // which was why the last label kept getting cut off.
  const initialSpacing = 16;
  const endSpacing = 30; // room reserved on the right for the last label to sit inside

  const yAxisLabelWidth = 28;

  // The chart's actual drawn width is `width` + yAxisLabelWidth, so subtract
  // yAxisLabelWidth here to keep the whole thing inside the card.
  const drawnWidth = chartWidth - yAxisLabelWidth;

  const pointCount = chartData.length;
  const spacing =
    pointCount > 1 ? (drawnWidth - initialSpacing - endSpacing) / (pointCount - 1) : 0;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Weight progress</Text>

      <View style={styles.chartBox} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
        {chartWidth > 0 && (
          <LineChart
            data={chartData}
            width={drawnWidth}
            height={120}
            spacing={spacing}           // replaces adjustToWidth — this is the actual fix
            initialSpacing={initialSpacing}
            endSpacing={endSpacing}
            curved
            thickness={2.5}
            color={theme.tint}
            //hideDataPoints
            dataPointsColor={theme.tint}
            dataPointsRadius={3} 
            areaChart
            startFillColor={theme.tint}
            endFillColor={theme.tint}
            startOpacity={0.35}
            endOpacity={0}
            yAxisLabelWidth={28}
            maxValue={Math.ceil(maxWeight) + 3}
            noOfSections={2}
            hideRules
            yAxisColor="transparent"
            xAxisColor={theme.border}
            yAxisTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
            xAxisLabelTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
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
    padding: 16,
    borderWidth: 2,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  chartBox: {
    minHeight: 120,
    alignItems: 'center',
    overflow: 'hidden',
  },
  change: {
    fontSize: 15,
    marginTop: 4,
  },
  tooltip: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  tooltipValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  tooltipDate: {
    fontSize: 9,
  },
});
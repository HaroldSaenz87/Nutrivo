import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';

type Props = {
  consumed: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
  trackColor: string;
  progressColor: string;
  textColor: string;
  innerBg: string; // NEW — must match whatever background sits behind the ring (the card color)
};

export default function Ring({
  consumed,
  goal,
  size = 64,
  strokeWidth = 9,
  trackColor,
  progressColor,
  textColor,
  innerBg,
}: Props) {
  const percent = Math.min(consumed / goal, 1);
  const percentValue = percent * 100;
  const percentLabel = Math.round(percentValue);

  const radius = size / 2;
  const innerRadius = radius - strokeWidth;

  const data = [
    { value: percentValue, color: progressColor },
    { value: 100 - percentValue, color: trackColor },
  ];

  return (
    <View style={{ width: size, height: size }}>
      <PieChart
        data={data}
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={innerBg}
        centerLabelComponent={() => (
          <Text style={[styles.percentText, { color: textColor, fontSize: size * 0.22 }]}>
            {percentLabel}%
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  percentText: {
    fontWeight: '600',
  },
});
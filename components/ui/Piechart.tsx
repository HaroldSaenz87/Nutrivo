// components/ui/PieChart.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export type PieSlice = {
  value: number;
  color: string;
};

type Props = {
  slices: PieSlice[];
  size?: number;
};

export default function PieChart({ slices, size = 80 }: Props) {
  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius / 2);
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  let cumulativePercent = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((slice, index) => {
          const percent = total > 0 ? slice.value / total : 0;
          const dashLength = circumference * percent;
          const dashGap = circumference - dashLength;
          const offset = circumference * (1 - cumulativePercent) + circumference * 0.25;
          cumulativePercent += percent;

          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius / 2}
              stroke={slice.color}
              strokeWidth={radius}
              fill="none"
              strokeDasharray={`${dashLength} ${dashGap}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </Svg>
    </View>
  );
}
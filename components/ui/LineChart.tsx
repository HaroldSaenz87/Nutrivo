
import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline, Circle, Text as SvgText, Line } from 'react-native-svg';

export type LineChartPoint = {
  label: string;
  value: number;
};

type Props = {
  data: LineChartPoint[];
  color: string;
  dotColor: string;
  axisColor: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

export default function LineChart({
  data,
  color,
  dotColor,
  axisColor,
  width = 260,
  height = 110,
  strokeWidth = 2.5,
}: Props) {

  if (data.length === 0) return null;

  const leftPadding = 34;   // room for the y-axis value labels
  const rightPadding = 8;
  const topPadding = 12;
  const bottomPadding = 20; // room for the x-axis date labels

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const range = max - min || 1;

  const chartWidth = width - leftPadding - rightPadding;
  const chartHeight = height - topPadding - bottomPadding;

  const points = data.map((point, index) => {
    const x = leftPadding + (index / (data.length - 1 || 1)) * chartWidth;
    const y = topPadding + chartHeight - ((point.value - min) / range) * chartHeight;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const lastPoint = points[points.length - 1];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* y-axis gridlines + labels: max at top, min at bottom */}
        <Line
          x1={leftPadding}
          y1={topPadding}
          x2={width - rightPadding}
          y2={topPadding}
          stroke={axisColor}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <SvgText x={0} y={topPadding + 4} fontSize={9} fill={axisColor}>
          {Math.round(max)}
        </SvgText>

        <Line
          x1={leftPadding}
          y1={topPadding + chartHeight}
          x2={width - rightPadding}
          y2={topPadding + chartHeight}
          stroke={axisColor}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <SvgText x={0} y={topPadding + chartHeight + 4} fontSize={9} fill={axisColor}>
          {Math.round(min)}
        </SvgText>

        {/* the line itself */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={lastPoint.x} cy={lastPoint.y} r={strokeWidth + 1.5} fill={dotColor} />

        {/* x-axis labels: first and last date only, to avoid crowding */}
        <SvgText x={leftPadding} y={height - 4} fontSize={9} fill={axisColor} textAnchor="start">
          {data[0].label}
        </SvgText>
        <SvgText x={width - rightPadding} y={height - 4} fontSize={9} fill={axisColor} textAnchor="end">
          {data[data.length - 1].label}
        </SvgText>
      </Svg>
    </View>
  );
}
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle, Text as SvgText, Line } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export type LineChartPoint = { x: number; y: number };
export type LineChartTick = { x: number; label: string };

type Props = {
  points: LineChartPoint[];
  xTicks?: LineChartTick[];
  unit?: string;          // shown after the number in the tooltip, e.g. "lbs"
  color: string;
  dotColor: string;
  axisColor: string;
  tooltipBg: string;
  tooltipText: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

export default function LineChart({
  points,
  xTicks = [],
  unit = '',
  color,
  dotColor,
  axisColor,
  tooltipBg,
  tooltipText,
  width = 260,
  height = 120,
  strokeWidth = 2.5,
}: Props) {
  // Which point the finger is currently nearest to. null = not touching.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (points.length === 0) return null;

  const leftPadding = 34;
  const rightPadding = 12;
  const topPadding = 28; // extra room up top for the tooltip bubble
  const bottomPadding = 22;

  const chartWidth = width - leftPadding - rightPadding;
  const chartHeight = height - topPadding - bottomPadding;

  const xMin = points[0].x;
  const xMax = points[points.length - 1].x;
  const xRange = xMax - xMin || 1;

  const yValues = points.map((p) => p.y);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const yRange = yMax - yMin || 1;

  const toX = (x: number) => leftPadding + ((x - xMin) / xRange) * chartWidth;
  const toY = (y: number) => topPadding + chartHeight - ((y - yMin) / yRange) * chartHeight;
  // The reverse of toX: turns a finger's pixel position back into a date
  const fromX = (screenX: number) => xMin + ((screenX - leftPadding) / chartWidth) * xRange;

  const screenPoints = points.map((p) => ({ x: toX(p.x), y: toY(p.y) }));
  const polylinePoints = screenPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const lastPoint = screenPoints[screenPoints.length - 1];
  const baselineY = topPadding + chartHeight;

  // Given a raw touch x, find which data point is closest to it
  const findNearestIndex = (screenX: number) => {
    const clampedX = Math.max(leftPadding, Math.min(width - rightPadding, screenX));
    const targetDate = fromX(clampedX);

    let nearest = 0;
    let smallestDiff = Infinity;
    points.forEach((p, i) => {
      const diff = Math.abs(p.x - targetDate);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        nearest = i;
      }
    });
    return nearest;
  };

  // Runs on the JS thread (gesture callbacks are worklets by default, so we hop over with runOnJS)
  const handleMove = (screenX: number) => {
    setActiveIndex(findNearestIndex(screenX));
  };
  const handleEnd = () => {
    setActiveIndex(null);
  };

  const pan = Gesture.Pan()
    .minDistance(0)                 // respond on first touch, not after moving
    .activeOffsetX([-5, 5])         // needs 5px of horizontal movement to "win"...
    .failOffsetY([-10, 10])         // ...so a mostly-vertical drag still scrolls the screen
    .onBegin((e) => runOnJS(handleMove)(e.x))
    .onUpdate((e) => runOnJS(handleMove)(e.x))
    .onEnd(() => runOnJS(handleEnd)())
    .onFinalize(() => runOnJS(handleEnd)());

  const active = activeIndex !== null ? points[activeIndex] : null;
  const activeScreen = activeIndex !== null ? screenPoints[activeIndex] : null;

  // Tooltip box position, kept from running off either edge of the chart
  const tooltipWidth = 78;
  const tooltipLeft = activeScreen
    ? Math.max(0, Math.min(width - tooltipWidth, activeScreen.x - tooltipWidth / 2))
    : 0;

  return (
    <GestureDetector gesture={pan}>
      {/* collapsable={false}: stops Android from optimizing this View away,
          which would break the gesture detector's hit area */}
      <View style={{ width, height }} collapsable={false}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Line x1={leftPadding} y1={topPadding} x2={width - rightPadding} y2={topPadding} stroke={axisColor} strokeWidth={1} strokeDasharray="4 4" />
          <SvgText x={0} y={topPadding + 4} fontSize={9} fill={axisColor}>{Math.round(yMax)}</SvgText>

          <Line x1={leftPadding} y1={baselineY} x2={width - rightPadding} y2={baselineY} stroke={axisColor} strokeWidth={1} strokeDasharray="4 4" />
          <SvgText x={0} y={baselineY + 4} fontSize={9} fill={axisColor}>{Math.round(yMin)}</SvgText>

          <Polyline points={polylinePoints} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* The "today" dot, hidden while scrubbing so it doesn't sit under the active dot */}
          {!activeScreen && <Circle cx={lastPoint.x} cy={lastPoint.y} r={strokeWidth + 1.5} fill={dotColor} />}

          {xTicks.map((tick) => {
            const x = toX(tick.x);
            return (
              <React.Fragment key={tick.x}>
                <Line x1={x} y1={baselineY} x2={x} y2={baselineY + 4} stroke={axisColor} strokeWidth={1} />
                <SvgText x={x} y={height - 4} fontSize={9} fill={axisColor} textAnchor="middle">{tick.label}</SvgText>
              </React.Fragment>
            );
          })}

          {/* Scrub guide line + highlighted dot, only while a finger is down */}
          {activeScreen && (
            <>
              <Line x1={activeScreen.x} y1={topPadding} x2={activeScreen.x} y2={baselineY} stroke={axisColor} strokeWidth={1} strokeDasharray="2 3" />
              <Circle cx={activeScreen.x} cy={activeScreen.y} r={strokeWidth + 2} fill={dotColor} />
            </>
          )}
        </Svg>

        {/* Tooltip bubble, drawn as a normal View on top of the SVG */}
        {active && (
          <View
            pointerEvents="none"
            style={[styles.tooltip, { left: tooltipLeft, backgroundColor: tooltipBg, width: tooltipWidth }]}>
            <Text style={[styles.tooltipValue, { color: tooltipText }]}>
              {active.y.toFixed(1)}{unit}
            </Text>
            <Text style={[styles.tooltipDate, { color: tooltipText }]}>
              {new Date(active.x).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Text>
          </View>
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    top: 0,
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

import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'
import Svg, { Circle } from 'react-native-svg';

type Props = {
    consumed: number;
    goal: number;
    size?: number;
    strokeWidth?: number;
    trackColor: string;
    progressColor: string;
    textColor: string;
};



export default function Ring({
    consumed,
    goal,
    size = 84,
    strokeWidth = 8,
    trackColor,
    progressColor,
    textColor
}: Props) {

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min(consumed / goal, 1);
    const strokeDash = circumference * (1 - percent);
    const percentLabel = Math.round(percent * 100);


    return (
         <View style={{ width: size, height: size }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* background track */}
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={trackColor}
                strokeWidth={strokeWidth}
                fill="none"
                />
                {/* progress arc */}
                <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDash}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>

            <View style={styles.centerLabel} pointerEvents="none">
                <Text style={[styles.percentText, { color: textColor, fontSize: size * 0.22 }]}>
                    {percentLabel}%
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    centerLabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentText: {
        fontWeight: '500',
    },
});
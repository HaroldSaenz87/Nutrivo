import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';

type Props = {
  logged: number;
  goal: number;
};

export default function LoggedTodayCard({ logged, goal }: Props) {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const percent = Math.min(logged / goal, 1) * 100;

  return (


        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>

        
            <View>

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Logged today
                </Text>
                
                <Text style={[styles.value, { color: theme.textPrimary }]}>
                    {logged.toLocaleString()} <Text style={[styles.sub, { color: theme.textSecondary }]}>/ {goal.toLocaleString()} kcal</Text>
                
                </Text>
            
            </View>


            <View style={[styles.track, { backgroundColor: theme.border }]}>
                
                <View style={[styles.fill, { width: `${percent}%`, backgroundColor: theme.tint }]} />
            
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
        justifyContent: 'space-between',
        gap: 16,
    },
    label: {
        fontSize: 12,
        marginBottom: 2,
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
    },
    sub: {
        fontSize: 13,
        fontWeight: '400',
    },
    track: {
        width: 100,
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});
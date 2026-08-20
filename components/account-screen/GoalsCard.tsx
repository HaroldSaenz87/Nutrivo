

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Goals } from '@/lib/accountScreen/mockGoals';
import DetailRow from '../ui/DetailRow';
import { useAppTheme } from '../ThemeContext';

type Props = {

    goals: Goals;
};

export default function GoalsCard({ goals }: Props) {

    const { colorScheme } = useAppTheme();
    const theme = Colors[colorScheme];

    const rows = [
        { label: 'Calorie target', value: goals.calorieTarget },
        { label: 'Macro split', value: goals.macroSplit },
        { label: 'Weight goal', value: goals.weightGoal },
        { label: 'Weekly pace', value: goals.weeklyPace },
    ];

    return (
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.textSecondary }]}>Goals</Text>

        {rows.map((row) => (
            <DetailRow
            key={row.label}
            label={row.label}
            value={row.value}
            labelColor={theme.textSecondary}
            valueColor={theme.textPrimary}
            dividerColor={theme.border}
            />
        ))}
        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        borderRadius: 14,
        padding: 16,
        borderWidth: 1.5,
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },
    
});
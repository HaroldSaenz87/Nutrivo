import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Plus, Sun, Salad, Moon, Cookie } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors, MacroColors } from '@/constants/theme';
import { Meal, getMealCalories } from '@/lib/diaryScreen/mockDiary';

// Which icon + accent color goes with each meal
const MEAL_ICON: Record<Meal['key'], LucideIcon> = {
  breakfast: Sun,
  lunch: Salad,
  dinner: Moon,
  snacks: Cookie,
};

type Props = {
  meal: Meal;
  onAddPress: (mealKey: Meal['key']) => void;
};

export default function MealCard({ meal, onAddPress }: Props) {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const Icon = MEAL_ICON[meal.key];
  const total = getMealCalories(meal);
  const isEmpty = meal.items.length === 0;

  // Breakfast/lunch/dinner use the accent color; empty snacks stays muted,
  // matching the "not logged yet" dashed-border look from the mockups.
  const iconColor = isEmpty ? theme.textSecondary : theme.tint;

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
                isEmpty && styles.emptyCard,
            ]}>

            <View style={styles.header}>
                
                <View style={styles.titleRow}>
                
                    <Icon size={16} color={iconColor} />
                
                    <Text style={[styles.title, { color: theme.textPrimary }]}>
                        {meal.title}
                    </Text>

                </View>

                <View style={styles.headerRight}>
                    {!isEmpty && (
                        
                        <Text style={[styles.calories, { color: theme.textSecondary }]}>
                            {total} kcal
                        </Text>
                    
                    )}
                    <Pressable
                        onPress={() => onAddPress(meal.key)}
                        style={[styles.addButton, { backgroundColor: theme.background }]}
                        accessibilityLabel={`Add food to ${meal.title.toLowerCase()}`}>

                        <Plus size={14} color={theme.tint} />
                    
                    </Pressable>
                
                </View>
            
            </View>

            {meal.items.map((item) => (

                <View key={item.name} style={[styles.itemRow, { borderTopColor: theme.border }]}>

                    <Text style={[styles.itemName, { color: theme.textSecondary }]}>
                        {item.name}
                    </Text>
                    
                    <Text style={[styles.itemCalories, { color: theme.textSecondary }]}>
                        {item.calories}
                    </Text>
                
                </View>
            ))}

        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        padding: 14,
        borderWidth: 1.5,
    },
    emptyCard: {
        borderStyle: 'dashed',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    calories: {
        fontSize: 13,
    },
    addButton: {
        width: 22,
        height: 22,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderTopWidth: 1,
        marginTop: 6,
    },
    itemName: {
        fontSize: 13,
        flex: 1,
    },
    itemCalories: {
        fontSize: 13,
    },
});
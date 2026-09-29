import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Plus, Sun, Salad, Moon, Cookie, ChevronDown, ChevronUp } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors, MacroColors } from '@/constants/theme';
import { Meal, getMealCalories } from '@/lib/diaryScreen/mockDiary';

// Which icon represents each meal slot.
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

  // Cards start expanded so nothing looks different until you tap one.
  const [expanded, setExpanded] = useState(true);

  const Icon = MEAL_ICON[meal.key];
  const total = getMealCalories(meal);
  const isEmpty = meal.items.length === 0;

  const iconColor = isEmpty ? theme.textSecondary : theme.tint;
  const ChevronIcon = expanded ? ChevronUp : ChevronDown;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        isEmpty && styles.emptyCard,
      ]}>
      {/* Header toggles collapse; the add button is a nested Pressable
          so tapping it fires only its own onPress, not the toggle. */}
      <Pressable
        style={styles.header}
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityRole="button"
        accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} ${meal.title.toLowerCase()}`}>
        <View style={styles.titleRow}>
          <Icon size={22} color={iconColor} />
          <Text style={[styles.title, { color: theme.textPrimary }]}>{meal.title}</Text>
          {!isEmpty && (
            <ChevronIcon size={18} color={theme.textSecondary} style={{ marginLeft: 2 }} />
          )}
        </View>

        <View style={styles.headerRight}>
          {!isEmpty && (
            <Text style={[styles.calories, { color: theme.textSecondary }]}>{total} kcal</Text>
          )}
          <Pressable
            onPress={() => onAddPress(meal.key)}
            style={[styles.addButton, { backgroundColor: theme.background }]}
            accessibilityLabel={`Add food to ${meal.title.toLowerCase()}`}>
            <Plus size={22} color={theme.tint} />
          </Pressable>
        </View>
      </Pressable>

      {/* Food list, only shown while expanded */}
      {expanded &&
        meal.items.map((item) => (
          <View key={item.name} style={[styles.itemRow, { borderTopColor: theme.border }]}>
            <Text style={[styles.itemName, { color: theme.textSecondary }]}>{item.name}</Text>
            <Text style={[styles.itemCalories, { color: theme.textSecondary }]}>{item.calories}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 18, borderWidth: 1.5 },
  emptyCard: { borderStyle: 'dashed' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 20, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  calories: { fontSize: 17, fontWeight: '500' },
  addButton: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9, borderTopWidth: 1, marginTop: 8 },
  itemName: { fontSize: 16, flex: 1 },
  itemCalories: { fontSize: 16 },
});
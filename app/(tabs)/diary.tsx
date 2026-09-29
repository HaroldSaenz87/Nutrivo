import { ScrollView, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home-screen/HomeHeader';
import { mockUserData } from '@/lib/homeScreen/mockUser';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import DateNavigator from '@/components/ui/DateNav';
import LoggedTodayCard from '@/components/diary-screen/LoggedTodayCard';
import MealCard from '@/components/diary-screen/MealCard';
import { getDiaryDataForDate, getTotalCalories, Meal } from '@/lib/diaryScreen/mockDiary';

// True if two Date objects fall on the same calendar day.
function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export default function DiaryScreen() {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  // Which day the screen is currently showing.
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Step the selected date backward/forward by one day.
  const goPrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const goNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  // Turn the selected date into "Today" / "Yesterday" / a formatted date.
  const isToday = isSameDay(selectedDate, new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = isSameDay(selectedDate, yesterday);

  const dateLabel = isToday
    ? 'Today'
    : isYesterday
    ? 'Yesterday'
    : selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  // Placeholder for wiring up manual food entry later.
  const handleAddPress = (mealKey: Meal['key']) => {
    console.log('Add food to', mealKey);
  };

  // Mock data for whichever day is selected.
  const diaryData = getDiaryDataForDate(selectedDate);
  const totalCalories = getTotalCalories(diaryData.meals);

  return (
    <View style={[styles.mainWrapper, { backgroundColor: theme.background }]}>
      {/* Covers the status bar area so content doesn't show through it */}
      <View style={{ height: insets.top, backgroundColor: theme.background, zIndex: 10 }} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: 12,
            paddingBottom: insets.bottom + 100, // clears the floating tab bar
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader title="Diary" subtitle="Where the snacks get confessed" user={mockUserData} />

        <DateNavigator
          label={dateLabel}
          onPrevious={goPrevDay}
          onNext={goNextDay}
          nextDisabled={isToday}
          iconColor={theme.textSecondary}
          disabledIconColor={theme.border}
          textColor={theme.textPrimary}
          buttonBg={theme.card}
          buttonBorder={theme.border}
          disabledButtonBorder={theme.card}
        />

        <View style={styles.mealList}>
          <LoggedTodayCard logged={totalCalories} goal={diaryData.goal} />

          {diaryData.meals.map((meal) => (
            <MealCard key={meal.key} meal={meal} onAddPress={handleAddPress} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  mealList: {
    gap: 24,
    marginTop: 12,
  },
});
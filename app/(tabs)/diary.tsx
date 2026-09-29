import { ScrollView, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home-screen/HomeHeader';
import { mockUserData } from '@/lib/homeScreen/mockUser';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import DateNavigator from '@/components/ui/DateNav';
import LoggedTodayCard from '@/components/diary-screen/LoggedTodayCard';
import MealCard from '@/components/diary-screen/MealCard';
import { mockDiaryData, getTotalCalories, Meal } from '@/lib/diaryScreen/mockDiary';

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export default function DiaryScreen() {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const isToday = isSameDay(selectedDate, new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = isSameDay(selectedDate, yesterday);

  const dateLabel = isToday
    ? 'Today'
    : isYesterday
    ? 'Yesterday'
    : selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  const handleAddPress = (mealKey: Meal['key']) => {
    console.log('Add food to', mealKey);
  };

  const totalCalories = getTotalCalories(mockDiaryData.meals);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.container}>

        <HomeHeader title="Diary" subtitle="Where the snacks get confessed" user={mockUserData}/>

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
          <LoggedTodayCard logged={totalCalories} goal={mockDiaryData.goal} />

          {mockDiaryData.meals.map((meal) => (
            <MealCard key={meal.key} meal={meal} onAddPress={handleAddPress} />
          ))}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  mealList: {
    gap: 12,
    marginTop: 8,
  },
});
import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home-screen/HomeHeader';
import { mockUserData } from '@/lib/homeScreen/mockUser';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import DateNavigator from '@/components/ui/DateNav';


function isSameDay(a: Date, b: Date){

  return a.toDateString() === b.toDateString();
  
}


export default function TabTwoScreen() {


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

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isToday = isSameDay(selectedDate, new Date());
  const isYesterday = isSameDay(selectedDate, yesterday);

  const dateLabel = isToday
    ? 'Today'
    : isYesterday
    ? 'Yesterday'
    : selectedDate.toLocaleDateString(undefined, {weekday:'short' , month: 'long', day: 'numeric' });

  return (

    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>

      <View style={styles.container}>
        
        <HomeHeader title="Diary" subtitle="Where the snacks get confessed" user={mockUserData}/>

        <DateNavigator
          label={dateLabel}
          onPrevious={goPrevDay}
          onNext={goNextDay}
          nextDisabled={isToday}
          iconColor={theme.textPrimary}
          disabledIconColor={theme.textSecondary}
          textColor={theme.textPrimary}
          buttonBg={theme.card}
          buttonBorder={theme.accentText}  
          disabledButtonBorder={theme.card}
        />


      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 30,
    marginTop: 10,
  },
});

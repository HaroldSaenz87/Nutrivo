import CalorieCard from "@/components/home-screen/CalorieCard";
import HomeHeader from "@/components/home-screen/HomeHeader";
import MacroCard from "@/components/home-screen/MacroCard";
import WeightCard from "@/components/home-screen/WeightCard";
import { useAppTheme } from "@/components/ThemeContext";
import { Colors } from "@/constants/theme";
import { mockCalorieData } from "@/lib/homeScreen/mockCalorie";
import { mockMacroData } from "@/lib/homeScreen/mockMacro";
import { mockUserData } from "@/lib/homeScreen/mockUser";
import { mockWeightData } from "@/lib/homeScreen/mockWeight";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const firstName = mockUserData.name.split(' ')[0];

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
        <HomeHeader title={`Hi, ${firstName}`} user={mockUserData} />

        {/* Calorie ring, macro pie, and weight trend — each card owns its own layout */}
        <View style={styles.cardGroup}>
          <CalorieCard data={mockCalorieData} />
          <MacroCard data={mockMacroData} />
          <WeightCard data={mockWeightData} />
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
  cardGroup: {
    gap: 24,
    marginTop: 10,
  },
});
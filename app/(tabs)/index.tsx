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
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const firstName = mockUserData.name.split(' ')[0];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>

        <HomeHeader title={`Hi, ${firstName}`} user={mockUserData} />

        <CalorieCard data={mockCalorieData}/>

        <MacroCard data={mockMacroData}/>

        <WeightCard data={mockWeightData}/>

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
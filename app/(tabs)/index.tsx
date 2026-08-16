import CalorieCard from "@/components/home-screen/CalorieCard";
import MacroCard from "@/components/home-screen/MacroCard";
import WeightCard from "@/components/home-screen/WeightCard";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { mockCalorieData } from "@/lib/homeScreen/mockCalorie";
import { mockMacroData } from "@/lib/homeScreen/mockMacro";
import { mockWeightData } from "@/lib/homeScreen/mockWeight";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>

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
  },
});
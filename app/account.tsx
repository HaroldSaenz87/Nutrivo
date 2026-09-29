import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 👈 Use insets hook
import { mockUserData } from '@/lib/homeScreen/mockUser';
import ProfileCard from '@/components/ProfileCard';
import UserDetailCard from '@/components/account-screen/UserDetailCard';
import { mockUserDetails } from '@/lib/accountScreen/mockUserDetails';
import GoalsCard from '@/components/account-screen/GoalsCard';
import { mockGoals } from '@/lib/accountScreen/mockGoals';
import PreferencesCard from '@/components/account-screen/PreferencesCard';

export default function AccountScreen() {
  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets(); 
  return (
    // Standard View so the screen frame fills the entire window (no safe area clipping boundary)
    <View style={[styles.mainWrapper, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + 12, // Protect top status bar
            paddingBottom: insets.bottom + 100, // Extra space to scroll past FloatingTabBar
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.textPrimary }]}>Account</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Manage your profile and preferences
        </Text>

        <View style={styles.cardGroup}>
          <ProfileCard user={mockUserData} />
          <UserDetailCard details={mockUserDetails} />
          <GoalsCard goals={mockGoals} />
          <PreferencesCard />
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
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 20,
  },
  cardGroup: {
    gap: 16,
  },
});
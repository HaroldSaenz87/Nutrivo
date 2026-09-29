import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    <View style={[styles.mainWrapper, { backgroundColor: theme.background }]}>
      {/* Block the status bar region so scrolling items clip cleanly below it */}
      <View style={{ height: insets.top, backgroundColor: theme.background, zIndex: 10 }} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: 12, // Simple top padding inside the scroll canvas
            paddingBottom: insets.bottom + 100,
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
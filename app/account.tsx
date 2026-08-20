import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/components/ThemeContext';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (

    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.container}
      >

        <Text style={[styles.title, { color: theme.textPrimary }]}>Account</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Manage your profile and preferences</Text>

        <View style={styles.cardGroup}>
          <ProfileCard user={mockUserData} />
          <UserDetailCard details={mockUserDetails} />
          <GoalsCard goals={mockGoals} />
          <PreferencesCard />
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
    paddingBottom: 40,
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
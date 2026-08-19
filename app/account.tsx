import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockUserData } from '@/lib/homeScreen/mockUser';
import ProfileCard from '@/components/ProfileCard';
import UserDetailCard from '@/components/account-screen/UserDetailCard';
import { mockUserDetails } from '@/lib/accountScreen/mockUserDetails';
import GoalsCard from '@/components/account-screen/GoalsCard';
import { mockGoals } from '@/lib/accountScreen/mockGoals';

export default function AccountScreen() {

  const colorScheme = useColorScheme() ?? 'light';

  const theme = Colors[colorScheme];

  return (

    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      
      <View style={styles.container}>

        <Text style={[styles.title, { color: theme.textPrimary }]}>Account</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Manage your profile and preferences</Text>

        <View style={styles.cardGroup}>
          <ProfileCard user={mockUserData} />
          <UserDetailCard details={mockUserDetails} />
          <GoalsCard goals={mockGoals} />
        </View>

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
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 13,
    marginTop:2,
    marginBottom: 20,
  },
  card: {
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  email: {
    fontSize: 13,
    marginTop: 2,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  editButtonText: {
    fontSize: 13,
  },
  cardGroup: {
    gap: 16,
  },

});
// components/home-screen/HomeHeader.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { UserData, getInitials } from '@/lib/homeScreen/mockUser';
import AccountBubble from '../ui/AccountBubble';
import { useAppTheme } from '../ThemeContext';

type Props = {
  user: UserData;
};

export default function HomeHeader({ user }: Props) {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];

  const firstName = user.name.split(' ')[0];

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.row}>
      <View>
        <Text style={[styles.greeting, { color: theme.textPrimary }]}>Hi, {firstName}</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{today}</Text>
      </View>

      <AccountBubble
        initials={getInitials(user.name)}
        bgColor={theme.card}
        textColor={theme.accentText}
        borderColor={theme.accentText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '500',
  },
  date: {
    fontSize: 17,
    marginTop: 2,
  },
});
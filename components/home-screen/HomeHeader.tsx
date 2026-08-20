// components/home-screen/HomeHeader.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/theme';
import { UserData, getInitials } from '@/lib/homeScreen/mockUser';
import AccountBubble from '../ui/AccountBubble';
import { useAppTheme } from '../ThemeContext';

type Props = {
  title: string;
  date?: Date;
  subtitle?: string;
  user: UserData;
};

export default function HomeHeader({ title, date, subtitle, user }: Props) {

  const { colorScheme } = useAppTheme();
  const theme = Colors[colorScheme];


  const displayDate = (date ?? new Date()).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const subtitleText = subtitle ?? displayDate;

  return (
    <View style={styles.row}>
      <View>
        <Text style={[styles.greeting, { color: theme.textPrimary }]}>{title}</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{subtitleText}</Text>
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
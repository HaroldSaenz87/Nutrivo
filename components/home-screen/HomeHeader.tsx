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

  // Falls back to today's date, formatted, unless a subtitle overrides it.
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

      {/* Avatar bubble in the top-right */}
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
    marginTop: 24,
    marginBottom: 24,
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
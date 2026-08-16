
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  initials: string;
  bgColor: string;
  textColor: string;
  borderColor: string
  size?: number;
};

export default function AccountBubble({ initials, bgColor, textColor, borderColor, size = 46 }: Props) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/account')}
      style={[
        styles.bubble,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor, borderColor: borderColor },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Open account"
    >
      <Text style={[styles.initials, { color: textColor, fontSize: size * 0.4 }]}>{initials}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  initials: {
    fontWeight: '600',
  },
});
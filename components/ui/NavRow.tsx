// components/ui/NavRow.tsx
import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronRight } from 'lucide-react-native';

type Props = {
  label: string;
  trailingText?: string;
  onPress: () => void;
  labelColor: string;
  trailingColor: string;
  dividerColor: string;
};

export default function NavRow({ label, trailingText, onPress, labelColor, trailingColor, dividerColor }: Props) {
  return (
    <Pressable style={[styles.row, { borderTopColor: dividerColor }]} onPress={onPress}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Pressable style={styles.trailing} onPress={onPress}>
        {trailingText ? <Text style={[styles.trailingText, { color: trailingColor }]}>{trailingText}</Text> : null}
        <ChevronRight size={16} color={trailingColor} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  label: {
    fontSize: 15,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trailingText: {
    fontSize: 12,
  },
});
// components/ui/ToggleRow.tsx
import { View, Text, Switch, StyleSheet } from 'react-native';
import React from 'react';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  labelColor: string;
  dividerColor: string;
  tintColor: string;
};

export default function ToggleRow({ label, value, onValueChange, labelColor, dividerColor, tintColor }: Props) {
  return (
    <View style={[styles.row, { borderTopColor: dividerColor }]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: tintColor }} style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }} />
    </View>
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
});
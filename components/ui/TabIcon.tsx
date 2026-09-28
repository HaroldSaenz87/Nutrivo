import { View, StyleSheet } from 'react-native';
import React from 'react';
import type { LucideIcon } from 'lucide-react-native'; // just the TYPE of a Lucide icon (used for typing only)

// Props = the values the parent passes into this component
type Props = {
  Icon: LucideIcon;       // the icon component itself (e.g. Home). Capital "I" because
                          // React only treats capitalized names as components: <Icon />
  focused: boolean;       // true when this tab is the currently selected one
  bubbleColor: string;    // color of the circle behind the selected icon
  activeColor: string;    // icon color when selected (sits on top of the bubble)
  inactiveColor: string;  // icon color when not selected
};

export default function TabIcon({ Icon, focused, bubbleColor, activeColor, inactiveColor }: Props) {
  return (
    // The circle always exists so every tab takes up the same space (nothing jumps around),
    // but it only gets a background color when focused.
    // `focused && {...}` works because `false` in a style array is ignored by React Native.
    <View style={[styles.bubble, focused && { backgroundColor: bubbleColor }]}>
      <Icon size={20} color={focused ? activeColor : inactiveColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    width: 44,
    height: 44,
    borderRadius: 22,          // half of width/height = perfect circle
    alignItems: 'center',      // centers the icon horizontally inside the circle
    justifyContent: 'center',  // centers the icon vertically inside the circle
  },
});
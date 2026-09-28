import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';                          // the small vibration on tap
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // sizes of notch / home indicator areas
import { Home, NotebookPen, ChartPie, Apple, TrendingUp } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';     // type of what Expo Router hands to a custom tab bar

import TabIcon from '@/components/ui/TabIcon';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/components/ThemeContext';

// A lookup table: route name -> icon.
// The route name is the FILENAME in app/(tabs)/ ("index" is the Home screen).
// To add a tab later: create the screen file, then add one line here.
const ICONS: Record<string, LucideIcon> = {
  index: Home,
  diary: NotebookPen,
  macros: ChartPie,
  nutrition: Apple,
  progress: TrendingUp,
};

// Expo Router calls this component and passes in three things:
//   state       = the list of tabs and which one is selected (state.index)
//   descriptors = each tab's options (like its title)
//   navigation  = functions for switching tabs
export default function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorScheme } = useAppTheme();   // 'light' or 'dark', from your theme toggle
  const theme = Colors[colorScheme];       // the matching color palette
  const insets = useSafeAreaInsets();      // insets.bottom = height of the home indicator area

  return (
    // OUTER STRIP: full width, same color as the page, sits at the bottom of the screen.
    // paddingBottom keeps the pill above the home indicator (at least 12px either way).
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.background, paddingBottom: Math.max(insets.bottom, 12) },
      ]}>

      {/* THE PILL: only as wide as its icons. The wrapper's alignItems: 'center' centers it. */}
      <View style={[styles.bar, { backgroundColor: theme.card, borderColor: theme.border }]}>

        {/* Loop over every tab (route) and draw one button per tab */}
        {state.routes.map((route, index) => {
          const focused = state.index === index;  // is THIS tab the selected one?
          const Icon = ICONS[route.name];         // look up its icon
          if (!Icon) return null;                 // no icon listed = don't draw a button

          // Runs when the button is tapped
          const onPress = () => {
            // Announce the tap first. This is the standard pattern: it lets other code
            // cancel the tab switch if needed (defaultPrevented).
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            // Only switch if it's a different tab and nothing cancelled it
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            // Pressable = a tappable area (like <button>). `key` helps React track list items.
            <Pressable
              key={route.key}
              onPress={onPress}
              onPressIn={() => {
                // Light vibration the moment your finger touches down (iOS only)
                if (process.env.EXPO_OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
              // Accessibility: lets screen readers announce "Home, button, selected"
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={descriptors[route.key].options.title ?? route.name}>

              <TabIcon
                Icon={Icon}
                focused={focused}
                bubbleColor={theme.tint}  // the violet circle
                // Icon color on top of the bubble: white in light mode, dark in dark mode
                // (white on the light-violet dark-mode bubble would be hard to read)
                activeColor={colorScheme === 'dark' ? theme.background : '#FFFFFF'}
                inactiveColor={theme.textSecondary}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',   // centers the pill left-to-right
    paddingTop: 8,          // small gap between the screen content and the pill
  },
  bar: {
    flexDirection: 'row',        // lay icons out side by side (default is stacked)
    alignItems: 'center',        // centers icons top-to-bottom inside the pill
    justifyContent: 'center',
    gap: 8,                      // space between icons; raise or lower to taste
    height: 64,
    paddingHorizontal: 10,       // padding inside the left/right ends of the pill
    borderRadius: 32,            // half the height = fully rounded ends (pill shape)
    borderWidth: 1.5,
    // Shadow so it looks like it's hovering. iOS uses the shadow* props, Android uses elevation.
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});
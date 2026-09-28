// hooks/use-theme-color.ts
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/components/ThemeContext';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // colorScheme is always exactly 'light' or 'dark' here, and follows your in-app toggle
  const { colorScheme } = useAppTheme();

  // If the caller passed a specific color for this theme, use it
  const colorFromProps = props[colorScheme];
  if (colorFromProps) {
    return colorFromProps;
  }

  // Otherwise fall back to your theme palette
  return Colors[colorScheme][colorName];
}
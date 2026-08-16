/**
 * Nutrivo color palette.
 * Light: white background with lavender accents (matches the uploaded mockup).
 * Dark: near-black background with a violet accent.
 */

import { Platform } from 'react-native';

const tintColorLight = '#7C5CFC';
const tintColorDark = '#A78BFA';

export const Colors = {
  light: {
    background: '#FFFFFF',
    card: '#f5f2ff',
    border: 'rgba(124, 92, 252, 0.12)',
    textPrimary: '#2A2438',
    textSecondary: '#8A8399',
    tint: tintColorLight,          // Active tab icon/label color
    tabIconDefault: '#948C9F',
    accentText: '#6D4FE0',
  },
  dark: {
    background: '#120E1C',    // Deep purple-tinted dark background
    card: '#1E172E',          // Rich dark violet card background
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F4F2FA',   // High-contrast off-white
    textSecondary: '#A399B8', // Soft purple-grey
    tint: tintColorDark,          // Vibrant light purple active tab color
    tabIconDefault: '#6E6280',
    accentText: tintColorDark,
  },
};

// Macro colors — same in both themes since they're functional/semantic, not theme-dependent
export const MacroColors = {
  carbs: {
    light: '#7C5CFC',
    dark: '#A78BFA',
  },
  protein: '#14B8A6', // works fine on both light and dark backgrounds as-is
  fat: '#FB923C',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
} as const);
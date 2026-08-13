/**
 * Nutrivo color palette — matches the mockups we designed.
 * Dark mode: deep charcoal background with a violet accent.
 * Light mode: white background with the same violet accent, adjusted for contrast.
 */

import { Platform } from 'react-native';

// Primary accent color — used for active tabs, buttons, progress rings, etc.
const tintColorLight = '#7C5CFC'; // saturated violet, reads well on white
const tintColorDark = '#A78BFA';  // slightly lighter violet, reads well on near-black

export const Colors = {
  light: {
    text: '#2A2438',              // dark plum instead of pure black — softer contrast
    background: '#FFFFFF',
    card: '#FBFAFE',               // slightly off-white for cards, so they lift off the bg
    border: 'rgba(0,0,0,0.07)',
    tint: tintColorLight,
    icon: '#948C9F',                // muted lavender-gray for inactive icons
    tabIconDefault: '#948C9F',
    tabIconSelected: tintColorLight,
    textSecondary: '#8A8399',       // for subtitles, timestamps, helper text
  },
  dark: {
    text: '#F4F2FA',                // off-white, not pure white — easier on the eyes
    background: '#121118',          // near-black with a slight purple tint
    card: '#1B1A24',                // lighter charcoal for cards, so they lift off the bg
    border: 'rgba(255,255,255,0.06)',
    tint: tintColorDark,
    icon: '#8B899A',
    tabIconDefault: '#8B899A',
    tabIconSelected: tintColorDark,
    textSecondary: '#7C7A8A',
  },
};

// Macro colors — used consistently for carbs/protein/fat everywhere in the app
// (donut charts, progress bars, legends). Same in both light and dark mode
// since these are functional/semantic colors, not theme-dependent.
export const MacroColors = {
  carbs: '#A78BFA',
  protein: '#2DD4BF',
  fat: '#FB923C',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
});
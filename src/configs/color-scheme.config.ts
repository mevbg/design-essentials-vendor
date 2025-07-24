import { DEFAULT_COLOR_SCHEME, DEFAULT_COLOR_SCHEME_METHOD } from '../constants';

export const colorSchemes = ['light', 'dark'] as const;
export const colorSchemeMethods = ['media', 'class', 'combined'] as const;

export type ColorScheme = (typeof colorSchemes)[number];
export type ColorSchemeMethod = (typeof colorSchemeMethods)[number] | null;

export type ColorSchemeConfig = {
  default?: ColorScheme;
  method?: ColorSchemeMethod;
};

export const defaultColorSchemeConfig: ColorSchemeConfig = {
  default: DEFAULT_COLOR_SCHEME as ColorScheme,
  method: DEFAULT_COLOR_SCHEME_METHOD as ColorSchemeMethod
};

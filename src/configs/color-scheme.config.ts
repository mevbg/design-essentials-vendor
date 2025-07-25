import { DEFAULT_COLOR_SCHEME, DEFAULT_COLOR_SCHEME_METHOD } from '../constants.js';

export enum ColorSchemeType {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ColorSchemeMethod {
  MEDIA = 'media',
  CLASS = 'class',
  COMBINED = 'combined'
}

export type ColorSchemeConfig = {
  default?: ColorSchemeType;
  method?: ColorSchemeMethod;
};

export const defaultColorSchemeConfig: ColorSchemeConfig = {
  default: DEFAULT_COLOR_SCHEME as ColorSchemeType,
  method: DEFAULT_COLOR_SCHEME_METHOD as ColorSchemeMethod
};

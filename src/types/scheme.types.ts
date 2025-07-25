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

export type FluidScaleSchemeConfig = {
  minViewportW: number;
  maxViewportW: number;
};

export type RootScaleSchemeConfig = {
  minViewportW: number;
  maxViewportW: number;
};

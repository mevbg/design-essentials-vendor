import {
  ColorSchemeConfig,
  ColorSchemeMethod,
  ColorSchemeType,
  FluidScaleSchemeConfig,
  IconographyConfig,
  RootScaleSchemeConfig,
  ScrollbarConfig
} from './types/design.types.js';
import { PlatformType } from './types/platform.types.js';

export const DEFAULT_BASE_FONT_SIZE: number = 10;

export const DEFAULT_PREFIX: string = 'tk'; // "tk" stands for tokens

export const DEFAULT_COLOR_SCHEME: ColorSchemeConfig = {
  default: ColorSchemeType.LIGHT,
  method: ColorSchemeMethod.COMBINED
};

export const DEFAULT_FLUID_SCALE_SCHEME: FluidScaleSchemeConfig = {
  minViewportW: 600,
  maxViewportW: 1200
};

export const DEFAULT_ROOT_SCALE_SCHEME: RootScaleSchemeConfig = {
  minViewportW: 300,
  maxViewportW: 2100
};

export const DEFAULT_ICONOGRAPHY: IconographyConfig = {
  fontFamily: 'Iconography',
  color: 'currentColor',
  list: {}
};

export const DEFAULT_SCROLLBAR: ScrollbarConfig = {
  areaWidth: 16,
  thumbSizeBase: 4,
  thumbSizeOver: 10,
  thumbMinSize: 80,
  scrollbarBackground: 'transparent',
  thumbColor: '#ccc',
  thumbColorHover: '#ccc',
  thumbColorActive: '#999'
};

export const DEFAULT_PLATFORMS = [
  PlatformType.CSS,
  PlatformType.SCSS,
  PlatformType.JS,
  PlatformType.JSON
] as const;

import { PlatformType } from './types/platform.types.js';

export const DEFAULT_BASE_FONT_SIZE: number = 10;

export const DEFAULT_PREFIX: string = 'tk'; // "tk" stands for tokens

export const DEFAULT_COLOR_SCHEME: string = 'light';
export const DEFAULT_COLOR_SCHEME_METHOD: string = 'class';

export const DEFAULT_FLUID_SCALE_MIN_VIEWPORT: number = 600;
export const DEFAULT_FLUID_SCALE_MAX_VIEWPORT: number = 1200;

export const DEFAULT_ROOT_SCALE_MIN_VIEWPORT: number = 300;
export const DEFAULT_ROOT_SCALE_MAX_VIEWPORT: number = 2100;

export const DEFAULT_PLATFORMS = [
  PlatformType.CSS,
  PlatformType.SCSS,
  PlatformType.JS,
  PlatformType.JSON
] as const;

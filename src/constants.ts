export const DEFAULT_BASE_FONT_SIZE: number = 10;

export const DEFAULT_PREFIX: string = 'tk'; // "tk" stands for tokens

export const DEFAULT_COLOR_SCHEME: string = 'light';
export const DEFAULT_COLOR_SCHEME_METHOD: string = 'class';

export const DEFAULT_FLUID_SCALE_MIN_VIEWPORT: number = 600;
export const DEFAULT_FLUID_SCALE_MAX_VIEWPORT: number = 1200;

export const DEFAULT_ROOT_SCALE_MIN_VIEWPORT: number = 300;
export const DEFAULT_ROOT_SCALE_MAX_VIEWPORT: number = 2100;

export const DEFAULT_PLATFORMS = ['css', 'scss', 'js', 'json'] as const;

export const CORE_TOKENS = [
  // Typography
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeight',

  // Color
  'color',

  // Size
  'size',

  // Border
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',

  // Box Shadow
  'boxShadow',

  // Breakpoint
  'breakpoint',

  // Dimensions
  'dimensions',

  // Icon
  'icon',

  // Opacity
  'opacity',

  // Transition
  'transition'
] as const;

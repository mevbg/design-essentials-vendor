import type { FaviconOptions } from 'favicons';
import type { EnforceRequired } from './utils.types.js';

//
// ------------------------------------------------------------
// COLOR SCHEME

// These are the only available native color schemes that can be used.
export enum ColorSchemeType {
  LIGHT = 'light',
  DARK = 'dark'
}

// These are the methods that can be used to define the color scheme behavior.
export enum ColorSchemeMethod {
  // The color scheme is defined based on the "prefers-color-scheme" media query.
  // Using this method means only @media-related code will be generated in the CSS output.
  MEDIA = 'media',

  // The color scheme is defined based on a class name (light/dark) applied to the root element.
  // Using this method means only html.class-related code will be generated in the CSS output.
  CLASS = 'class',

  // The color scheme is defined based on the media query and class name where the class method has priority over the media query.
  // Using this method means both @media-related and html.class-related code will be generated in the CSS output.
  COMBINED = 'combined'
}

// This is the object that contains the key data
// necessary for defining the color scheme.
export type ColorSchemeConfig = {
  // This property determines the default color scheme to be used initially
  // when no other logic is applied.
  default?: ColorSchemeType;

  // This property determines the method to be used
  // for defining the color scheme behavior.
  method?: ColorSchemeMethod;
};

//
// ------------------------------------------------------------
// FLUID SCALER

// The Fluid Scaler is the one that takes care of the gradual scaling of typography
// and other given elements, by applying dynamic calc()-based formula as a value,
// when in between the minViewportW and maxViewportW breakpoints.
export type FluidScalerConfig = {
  // This is the minimum viewport width above which the fluid scaler is applied.
  // Below that breakpoint, the min given value is fixed.
  minViewportW: number;

  // This is the maximum viewport width below which the fluid scaler is applied.
  // Above that breakpoint, the max given value is fixed.
  maxViewportW: number;
};

//
// ------------------------------------------------------------
// ROOT SCALER

// The Root Scaler is the one that takes care of the entire layout scaling,
// below the minViewportW and (if in presentation mode) above the maxViewportW.
// It sets the font-size of the root element to be relative to the viewport width,
// which leads to a total scaling of everything based on rem/em units.
export type RootScalerConfig = {
  // This is the minimum viewport width below which
  // the root scaler is applied.
  minViewportW: number;

  // This is the maximum viewport width above which
  // the root scaler is applied. (if in presentation mode)
  maxViewportW: number;
};

//
// ------------------------------------------------------------
// FONTS

export type FontsConfig = {
  path: string;
};

//
// ------------------------------------------------------------
// ICONS

export type IconsConfig = {
  fontFamily?: string;
  color?: string;
  list: Record<string, string>;
};

//
// ------------------------------------------------------------
// SCROLLBAR

export type ScrollbarConfig = {
  areaWidth?: number;
  thumbSizeBase?: number;
  thumbSizeOver?: number;
  thumbMinSize?: number;
  scrollbarBackground?: string;
  thumbColor?: string;
  thumbColorHover?: string;
  thumbColorActive?: string;
};

//
// ------------------------------------------------------------
// FAVICONS

// For more information on the favicons configuration,
// see the following link: https://www.npmjs.com/package/favicons
export type FaviconsConfig = {
  id: string;
  sourcePath: string;
  outputPath?: string;
} & EnforceRequired<
  Omit<FaviconOptions, 'path'>,
  'appName' | 'appShortName' | 'appDescription' | 'version'
>;

//
// ------------------------------------------------------------
// DESIGN CONFIG

// This is the object that contains the key data
// necessary for defining typography system,
// color scheme, typography & layout scaling etc.
// Its content is required to be passed to the generator
// as part of the GeneratorConfig object.
export type DesignConfig = {
  colorScheme?: ColorSchemeConfig;
  fluidScaler?: FluidScalerConfig;
  rootScaler?: RootScalerConfig;
  baseFontSize?: number;
  fonts?: FontsConfig;
  icons?: IconsConfig;
  scrollbar?: ScrollbarConfig;
  favicons?: FaviconsConfig;
};

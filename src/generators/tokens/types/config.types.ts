import type { GeneratorCommonParams } from '../../../types/generator.types.js';
import type { PlatformType } from './platform.types.js';

//
// ---------------------------------------------------
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
// ---------------------------------------------------
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
// ---------------------------------------------------
// TOKENS

// This is the object that contains the key data
// necessary for defining the tokens.
export type TokensConfig = {
  sourcePath: string;
  platforms: PlatformType[];
  colorScheme: ColorSchemeConfig;
  fluidScaler: FluidScalerConfig;
} & GeneratorCommonParams;

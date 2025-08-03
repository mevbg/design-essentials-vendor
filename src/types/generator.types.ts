import {
  ColorSchemeConfig,
  FluidScaleSchemeConfig,
  RootScaleSchemeConfig
} from '../types/scheme.types.js';
import { PlatformType } from './platform.types.js';

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
  fluidScaleScheme?: FluidScaleSchemeConfig;
  rootScaleScheme?: RootScaleSchemeConfig;
  baseFontSize?: number;
  icons?: Record<string, string>;
  fontsPath?: string;
  scrollbar?: {
    areaWidth: number;
    thumbSizeBase: number;
    thumbSizeOver: number;
    thumbMinSize: number;
  };
};

//
// ------------------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design tokens.
export type GeneratorConfig = {
  buildPath: string;
  tokens: {
    sourcePath: string;
    prefix?: string;
    platforms?: PlatformType[];
  };
} & DesignConfig;

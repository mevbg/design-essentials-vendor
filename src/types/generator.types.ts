import {
  ColorSchemeConfig,
  FluidScaleSchemeConfig,
  RootScaleSchemeConfig
} from '../types/scheme.types.js';
import { PlatformType } from './platform.types.js';

//
// ------------------------------------------------------------
// DESIGN DATA

// This is the object that contains the key data
// necessary for defining typography system,
// color scheme, typography & layout scaling etc.
// It is required to be passed to the generator
// as part of the GeneratorConfig object.
export type DesignData = {
  baseFontSize: number;
  colorScheme: ColorSchemeConfig;
  fluidScaleScheme: FluidScaleSchemeConfig;
  rootScaleScheme: RootScaleSchemeConfig;
};

//
// ------------------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design tokens.
export type GeneratorConfig = {
  sourcePath: string;
  buildPath: string;
  prefix?: string;
  platforms?: PlatformType[];
  designData: DesignData;
};

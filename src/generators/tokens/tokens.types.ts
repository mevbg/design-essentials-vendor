/* =================================================== */
/* TOKENS → TYPES */
/* =================================================== */

import type { ColorSchemeParams } from './types/color-scheme.types.js';
import type { FluidScalerParams } from './types/fluid-scaler.types.js';
import type { PlatformType } from './types/platform.types.js';

//
// ---------------------------------------------------
// GENERATOR PARAMS

// This is the object that contains the key data
// necessary for defining the tokens.
export type TokensGeneratorParams = {
  sourcePath?: string;
  platforms?: PlatformType[];
  prefix?: string;
  baseFontSize?: number;
  colorScheme?: ColorSchemeParams;
  fluidScaler?: FluidScalerParams;
  buildPath?: string;
};

//
// ---------------------------------------------------
// EXPORT TYPES

export * from './types/color-scheme.types.js';
export * from './types/fluid-scaler.types.js';
export * from './types/format.types.js';
export * from './types/platform.types.js';
export * from './types/tokens.types.js';

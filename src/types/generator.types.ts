import { ColorSchemeConfig } from '../configs/color-scheme.config.js';
import { type FluidScaleSchemeConfig } from '../configs/fluid-scale-scheme.config.js';
import { type RootScaleSchemeConfig } from '../configs/root-scale-scheme.config.js';
import { PlatformName } from './platform.types.js';

export type GeneratorOptions = {
  baseFontSize: number;
  colorScheme: ColorSchemeConfig;
  fluidScaleScheme: FluidScaleSchemeConfig;
  rootScaleScheme: RootScaleSchemeConfig;
};

export type GeneratorConfig = {
  sourcePath: string;
  buildPath: string;
  prefix?: string;
  platforms?: PlatformName[];
  options: GeneratorOptions;
};

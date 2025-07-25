import {
  ColorSchemeConfig,
  FluidScaleSchemeConfig,
  RootScaleSchemeConfig
} from '../types/scheme.types.js';
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

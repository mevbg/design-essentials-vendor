import { ColorSchemeConfig } from '../configs/color-scheme.config';
import { type FluidScaleSchemeConfig } from '../configs/fluid-scale-scheme.config';
import { type RootScaleSchemeConfig } from '../configs/root-scale-scheme.config';
import { PlatformName } from './platform.types';

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

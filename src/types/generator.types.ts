import {
  ColorSchemeConfig,
  FluidScaleSchemeConfig,
  RootScaleSchemeConfig
} from '../types/scheme.types.js';
import { PlatformType } from './platform.types.js';

export type DesignData = {
  baseFontSize: number;
  colorScheme: ColorSchemeConfig;
  fluidScaleScheme: FluidScaleSchemeConfig;
  rootScaleScheme: RootScaleSchemeConfig;
};

export type GeneratorConfig = {
  sourcePath: string;
  buildPath: string;
  prefix?: string;
  platforms?: PlatformType[];
  designData: DesignData;
};

import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { ColorSchemeConfig } from '../configs/color-scheme.config';
import { type FluidScaleSchemeConfig } from '../configs/fluid-scale-scheme.config';
import { type RootScaleSchemeConfig } from '../configs/root-scale-scheme.config';

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
  options: GeneratorOptions;
};

export type TokenTypeHandlerParams = {
  options?: FormatFnArguments['options'];
  tokens: TransformedToken[];
  config?: {
    noFlagComment?: boolean;
    prefix?: string;
  };
};

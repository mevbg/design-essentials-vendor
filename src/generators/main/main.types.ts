import type { GeneratorCommonParams } from '../../types/generator.types.js';
import {
  FaviconsConfig,
  FontFacesConfig,
  IconsConfig,
  RootScalerConfig,
  ScrollbarConfig,
  TokensConfig
} from '../../types/index.js';
import { EnforceOptional } from '../../types/utils.types.js';

//
// ---------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design essentials.
export type MainGeneratorConfig = {
  services: {
    tokens?: Omit<TokensConfig, keyof GeneratorCommonParams>;
    rootScaler?: Omit<RootScalerConfig, 'baseFontSize' | 'prefix'>;
    fontFaces?: FontFacesConfig;
    icons?: IconsConfig;
    scrollbar?: ScrollbarConfig;
    favicons?: FaviconsConfig;
  };
} & EnforceOptional<GeneratorCommonParams, 'prefix' | 'baseFontSize'>;

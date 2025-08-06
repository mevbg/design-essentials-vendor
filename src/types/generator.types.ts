import { ScrollbarConfig } from '../services/scrollbar/scrollbar.types.js';
import {
  FaviconsConfig,
  FontFacesConfig,
  IconsConfig,
  RootScalerConfig,
  TokensConfig
} from './index.js';
import type { ServiceCommonParams } from './services.types.js';
import { EnforceOptional } from './utils.types.js';

//
// ---------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design essentials.
export type GeneratorConfig = {
  services: {
    tokens?: Omit<TokensConfig, keyof ServiceCommonParams>;
    rootScaler?: Omit<RootScalerConfig, 'baseFontSize' | 'prefix'>;
    fontFaces?: FontFacesConfig;
    icons?: IconsConfig;
    scrollbar?: ScrollbarConfig;
    favicons?: FaviconsConfig;
  };
} & EnforceOptional<ServiceCommonParams, 'prefix' | 'baseFontSize'>;

/* =================================================== */
/* MASTER → TYPES */
/* =================================================== */

import {
  FaviconsGeneratorParams,
  FontFacesGeneratorParams,
  IconsGeneratorParams,
  RootScalerGeneratorParams,
  ScrollbarGeneratorParams,
  TokensGeneratorParams
} from '../../types/index.js';

//
// ---------------------------------------------------
// GENERATOR PARAMS

export type MasterGeneratorParams = {
  buildPath?: string;
  prefix?: string;
  baseFontSize?: number;
  generators: {
    tokens?: TokensGeneratorParams;
    rootScaler?: RootScalerGeneratorParams;
    fontFaces?: FontFacesGeneratorParams;
    icons?: IconsGeneratorParams;
    scrollbar?: ScrollbarGeneratorParams;
    favicons?: FaviconsGeneratorParams;
  };
};

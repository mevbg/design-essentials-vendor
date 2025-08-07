/* =================================================== */
/* MASTER → TYPES */
/* =================================================== */

import {
  FaviconsGeneratorParams,
  FontFacesGeneratorParams,
  IconsGeneratorParams,
  ScrollbarGeneratorParams,
  TokensGeneratorParams,
  ViewportScalerGeneratorParams
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
    viewportScaler?: ViewportScalerGeneratorParams;
    fontFaces?: FontFacesGeneratorParams;
    icons?: IconsGeneratorParams;
    scrollbar?: ScrollbarGeneratorParams;
    favicons?: FaviconsGeneratorParams;
  };
};

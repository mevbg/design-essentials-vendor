/* =================================================== */
/* MASTER → TYPES */
/* =================================================== */

import {
  FaviconsGeneratorParams,
  FontFacesGeneratorParams,
  GeneratorCommonParams,
  IconsGeneratorParams,
  RootScalerGeneratorParams,
  ScrollbarGeneratorParams,
  TokensGeneratorParams
} from '../../types/index.js';

//
// ---------------------------------------------------
// GENERATOR PARAMS

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design essentials.
export type MasterGeneratorParams = {
  generators: {
    tokens?: TokensGeneratorParams;
    rootScaler?: RootScalerGeneratorParams;
    fontFaces?: FontFacesGeneratorParams;
    icons?: IconsGeneratorParams;
    scrollbar?: ScrollbarGeneratorParams;
    favicons?: FaviconsGeneratorParams;
  };
} & GeneratorCommonParams;

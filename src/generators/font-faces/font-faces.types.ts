/* =================================================== */
/* FONT FACES → TYPES */
/* =================================================== */

//
// ---------------------------------------------------
// GENERATOR PARAMS

export type FontFacesGeneratorParams = {
  path: string;
  fonts: Record<string, Record<string, number>>;
  buildPath?: string;
};

//
// ---------------------------------------------------
// FONT FACE

export type FontFace = {
  'font-family': string;
  'font-style': string;
  'font-weight': number;
  src: string;
};

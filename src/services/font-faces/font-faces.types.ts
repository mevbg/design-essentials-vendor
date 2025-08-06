/* =================================================== */
/* FONT FACES → TYPES */
/* =================================================== */

//
// ---------------------------------------------------
// CONFIG

export type FontFacesConfig = {
  path: string;
  fonts: Record<string, Record<string, number>>;
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

/* =================================================== */
/* FONT FACES → TYPES */
/* =================================================== */

//
// ---------------------------------------------------
// CONFIG

export type FontFacesConfig = {
  path: string;
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

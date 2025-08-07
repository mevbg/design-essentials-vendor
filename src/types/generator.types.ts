/* =================================================== */
/* TYPES → GENERATOR */
/* =================================================== */

import type StyleDictionary from 'style-dictionary';

//
// ---------------------------------------------------
// GENERATOR FUNCTION

// TODO
export type GeneratorFn<T, Response = StyleDictionary> = (params: T) => Promise<Response>;

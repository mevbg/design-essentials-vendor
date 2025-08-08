/* =================================================== */
/* TYPES → GENERATOR */
/* =================================================== */

import type StyleDictionary from 'style-dictionary';

//
// ---------------------------------------------------
// GENERATOR FUNCTION

export type GeneratorFn<T, Response = StyleDictionary> = (params: T) => Promise<Response>;

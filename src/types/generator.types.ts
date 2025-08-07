/* =================================================== */
/* TYPES → GENERATOR */
/* =================================================== */

import type StyleDictionary from 'style-dictionary';

//
// ---------------------------------------------------
// GENERATOR COMMON PARAMS

// These are the common generator parameters
// that are shared across generators.
export type GeneratorCommonParams = {
  buildPath?: string;
  prefix?: string;
  baseFontSize?: number;
};

//
// ---------------------------------------------------
// GENERATOR FUNCTION

// TODO
export type GeneratorFn<T, Response = StyleDictionary> = (params: T) => Promise<Response>;

//
// ---------------------------------------------------
// GENERATOR CONFIG PARSER FUNCTION

// TODO
export type ProxyGeneratorFn<T, Response = StyleDictionary> = (
  userConfig: T,
  commonParams: GeneratorCommonParams
) => Promise<Response> | undefined;

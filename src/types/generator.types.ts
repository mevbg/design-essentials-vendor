import type StyleDictionary from 'style-dictionary';

//
// ---------------------------------------------------
// SERVICE COMMON PARAMS

// These are the common service parameters
// that are shared across services.
export type GeneratorCommonParams = {
  buildPath: string;
  prefix: string;
  baseFontSize: number;
};

//
// ---------------------------------------------------
// SERVICE PARAMS

// TODO
export type GeneratorParams<T> = GeneratorCommonParams & T;

//
// ---------------------------------------------------
// SERVICE FUNCTION

// TODO
export type GeneratorFn<T, Response = StyleDictionary> = (
  params: GeneratorParams<T>
) => Promise<Response>;

//
// ---------------------------------------------------
// SERVICE CONFIG RESOLVER FUNCTION

// TODO
export type GeneratorConfigParserFn<T, Response = StyleDictionary> = (
  userConfig: T,
  commonParams: GeneratorCommonParams
) =>
  | {
      config: T;
      generator: GeneratorFn<T, Response>;
    }
  | undefined;

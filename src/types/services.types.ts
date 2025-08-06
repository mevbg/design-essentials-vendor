import type StyleDictionary from 'style-dictionary';

//
// ---------------------------------------------------
// SERVICE COMMON PARAMS

// These are the common service parameters
// that are shared across services.
export type ServiceCommonParams = {
  buildPath: string;
  prefix: string;
  baseFontSize: number;
};

//
// ---------------------------------------------------
// SERVICE PARAMS

// TODO
export type ServiceParams<T> = ServiceCommonParams & T & { name: string; tokensPath?: string };

//
// ---------------------------------------------------
// SERVICE FUNCTION

// TODO
export type ServiceFunction<T, Response = StyleDictionary> = (
  params: ServiceParams<T>
) => Promise<Response>;

//
// ---------------------------------------------------
// SERVICE CONFIG RESOLVER FUNCTION

// TODO
export type ServiceConfigParserFn<T, Response = StyleDictionary> = (
  userConfig: T,
  commonParams: ServiceCommonParams
) =>
  | {
      config: T;
      generator: ServiceFunction<T, Response>;
    }
  | undefined;

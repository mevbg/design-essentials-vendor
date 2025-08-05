import type {
  FaviconsConfig,
  FontsConfig,
  IconsConfig,
  RootScalerConfig,
  ScrollbarConfig,
  TokensConfig
} from './index.js';

//
// ------------------------------------------------------------
// SERVICE COMMON PARAMS

// These are the common service parameters
// that are shared across services.
export type ServiceCommonParams = {
  buildPath: string;
  prefix: string;
  baseFontSize: number;
};

//
// ------------------------------------------------------------
// SERVICES CONFIG

// This is the object that contains the key data
// necessary for defining typography system,
// color scheme, typography & layout scaling etc.
// Its content is required to be passed to the generator
// as part of the GeneratorConfig object.
export type ServicesConfig = {
  tokens?: TokensConfig;
  rootScaler?: RootScalerConfig;
  fonts?: FontsConfig;
  icons?: IconsConfig;
  scrollbar?: ScrollbarConfig;
  favicons?: FaviconsConfig;
};

//
// ------------------------------------------------------------
// SERVICE PARAMS

// This is the object that contains the key data
// necessary for defining the service parameters.
export type ServiceParams<T> = ServiceCommonParams & T;

//
// ------------------------------------------------------------
// SERVICE FUNCTION

// This is the object that contains the key data
// necessary for defining the service parameters.
export type ServiceFunction<T> = (params: ServiceParams<T>) => Promise<void>;

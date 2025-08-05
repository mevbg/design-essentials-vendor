import type { ServiceCommonParams, ServicesConfig } from './services.types.js';
import { EnforceOptional } from './utils.types.js';

//
// ------------------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design essentials.
export type GeneratorConfig = {
  services: ServicesConfig;
} & EnforceOptional<ServiceCommonParams, 'prefix' | 'baseFontSize'>;

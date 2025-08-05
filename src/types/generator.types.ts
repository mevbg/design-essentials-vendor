import type { ServicesConfig } from './services.types.js';

//
// ------------------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design essentials.
export type GeneratorConfig = {
  buildPath: string;
  prefix?: string;
  baseFontSize?: number;
  services: ServicesConfig;
};

import type { DesignConfig } from './design.types.js';
import { PlatformType } from './platform.types.js';

//
// ------------------------------------------------------------
// GENERATOR CONFIG

// This is the main entry configuration object that
// this generator accepts and requires in order to generate
// a proper output of all design tokens.
export type GeneratorConfig = {
  buildPath: string;
  tokens: {
    sourcePath: string;
    prefix?: string;
    platforms?: PlatformType[];
  };
} & DesignConfig;

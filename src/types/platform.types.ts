import { DEFAULT_PLATFORMS } from '../constants.js';
import { GeneratorOptions } from './generator.types.js';

export type PlatformName = (typeof DEFAULT_PLATFORMS)[number];

export type PlatformConfigsBuilderParams = {
  buildPath: string;
  options: GeneratorOptions;
  prefix?: string;
};

export type PlatformConfigProviderResponse = {
  config: {
    options: GeneratorOptions;
    prefix?: string;
  };
  coreFiles?: boolean;
  files?: string[];
};

export type PlatformConfigProvider = (
  params: PlatformConfigsBuilderParams
) => PlatformConfigProviderResponse;

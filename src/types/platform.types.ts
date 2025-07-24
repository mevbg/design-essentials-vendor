import { PlatformConfig } from 'style-dictionary/types';
import { DEFAULT_PLATFORMS } from '../constants';
import { GeneratorOptions } from './generator.types';

export type PlatformName = (typeof DEFAULT_PLATFORMS)[number];

export type PlatformConfigBuilderParams = {
  buildPath: string;
  options: GeneratorOptions;
  prefix?: string;
};

export type PlatformConfigBuilder = (params: PlatformConfigBuilderParams) => PlatformConfig;

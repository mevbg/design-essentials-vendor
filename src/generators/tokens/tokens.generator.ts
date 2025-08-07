/* =================================================== */
/* TOKENS → GENERATOR */
/* =================================================== */

import path from 'path';
import StyleDictionary from 'style-dictionary';
import { Format } from 'style-dictionary/types';
import { tokensGeneratorDefaultParams } from '../../defaults.js';
import { GeneratorFn } from '../../types/index.js';
import * as formats from './platforms/formats.js';
import { getPlatformConfigs } from './platforms/index.js';
import type { TokensDesignData, TokensGeneratorParams } from './tokens.types.js';

//
// ---------------------------------------------------
// GENERATOR FUNCTION

// This function generates the design tokens
export const tokensGenerator: GeneratorFn<TokensGeneratorParams> = async (params) => {
  const { buildPath, prefix, baseFontSize, sourcePath, platforms, fluidScaler, colorScheme } = {
    ...tokensGeneratorDefaultParams,
    ...params
  } as Required<TokensGeneratorParams>;

  const designData: TokensDesignData = {
    baseFontSize,
    colorScheme,
    fluidScaler
  };

  // All custom formats are defined in separated files
  // based on the platform type (platforms/**/formats.ts)
  // and are collected and exported by the formats.ts file
  // so to be imported all at once in here,
  // where they get registered in the StyleDictionary instance,
  // by being gathered in a flat array and iterated over.
  Object.values(formats)
    .flatMap((formatterGroup) => Object.values(formatterGroup))
    .forEach((format: Format) => {
      StyleDictionary.registerFormat(format);
    });

  // Resolve the source path
  const source = [path.resolve(sourcePath)];

  // Get the platform configs
  const platformConfigs = await getPlatformConfigs({
    platforms,
    buildPath,
    designData,
    prefix
  });

  // Define the StyleDictionary instance
  // with the resolved source path and the platform configs
  const dictionary = new StyleDictionary({
    source,
    platforms: platformConfigs
  });

  // Generate the design tokens and return the StyleDictionary instance
  return dictionary.buildAllPlatforms();
};

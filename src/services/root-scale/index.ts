// import path from 'path';
import StyleDictionary from 'style-dictionary';
// import { Format } from 'style-dictionary/types';
// import {
//   DEFAULT_ICONS_CONFIG,
//   DEFAULT_PLATFORMS,
//   DEFAULT_PREFIX,
//   DEFAULT_SCROLLBAR_CONFIG
// } from '../../configs.js';
// import * as formats from '../../formats.js';
// import { getPlatformConfigs } from '../../platforms.js';
import type { RootScalerConfig, ServiceParams } from '../../types/services.types.js';

// This function generates the CSS essentials, the design tokens
// and returns the StyleDictionary instance
export const rootScalerService = async ({
  buildPath,
  prefix,
  baseFontSize,
  ...config
}: ServiceParams<RootScalerConfig>): Promise<StyleDictionary> => {
  console.log('rootScalerService', { buildPath, prefix, baseFontSize, config });
  // const { sourcePath, prefix = DEFAULT_PREFIX, platforms = [...DEFAULT_PLATFORMS] } = tokens;
  // const designConfig: DesignConfig = {
  //   baseFontSize,
  //   colorScheme,
  //   rootScaler,
  //   fluidScaler,
  //   fonts:
  //     fonts || process.env.FONTS_PATH
  //       ? {
  //           path: fonts?.path || process.env.FONTS_PATH || ''
  //         }
  //       : undefined,
  //   icons: icons && {
  //     ...DEFAULT_ICONS_CONFIG,
  //     ...icons
  //   },
  //   scrollbar: scrollbar && {
  //     ...DEFAULT_SCROLLBAR_CONFIG,
  //     ...scrollbar
  //   }
  // };

  // // All custom formats are defined in separated files
  // // based on the platform type (platforms/**/formats.ts)
  // // and are collected and exported by the formats.ts file
  // // so to be imported all at once in here,
  // // where they get registered in the StyleDictionary instance,
  // // by being gathered in a flat array and iterated over.
  // Object.values(formats)
  //   .flatMap((formatterGroup) => Object.values(formatterGroup))
  //   .forEach((format: Format) => {
  //     StyleDictionary.registerFormat(format);
  //   });

  // // Resolve the source path
  // const source = [path.resolve(sourcePath)];

  // // Get the platform configs
  // const platformConfigs = await getPlatformConfigs({
  //   platforms,
  //   buildPath,
  //   designConfig,
  //   prefix
  // });

  // // Define the StyleDictionary instance
  // // with the resolved source path and the platform configs
  // const dictionary = new StyleDictionary({
  //   source,
  //   platforms: platformConfigs
  // });

  // Generate the design tokens and return the StyleDictionary instance
  const dictionary = new StyleDictionary();
  return dictionary.buildAllPlatforms();
};

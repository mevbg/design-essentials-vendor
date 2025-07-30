import path from 'path';
import StyleDictionary from 'style-dictionary';
import { Format } from 'style-dictionary/types';
import {
  defaultColorSchemeConfig as colorScheme,
  defaultFluidScaleSchemeConfig as fluidScaleScheme,
  defaultRootScaleSchemeConfig as rootScaleScheme
} from './configs.js';
import { DEFAULT_BASE_FONT_SIZE, DEFAULT_PLATFORMS, DEFAULT_PREFIX } from './constants.js';
import * as formats from './formats.js';
import { getPlatformConfigs } from './platforms.js';
import type { GeneratorConfig } from './types/index.js';

export async function generateDesignTokens({
  sourcePath,
  buildPath,
  prefix = DEFAULT_PREFIX,
  platforms: platformsList = [...DEFAULT_PLATFORMS],
  options = {
    baseFontSize: DEFAULT_BASE_FONT_SIZE,
    colorScheme,
    rootScaleScheme,
    fluidScaleScheme
  }
}: GeneratorConfig): Promise<StyleDictionary> {
  // Register custom formats
  Object.values(formats)
    .flatMap((formatterGroup) => Object.values(formatterGroup))
    .forEach((format: Format) => {
      StyleDictionary.registerFormat(format);
    });

  // Resolve the source path
  const source = [path.resolve(sourcePath)];

  // Get the platform configs
  const platforms = await getPlatformConfigs(platformsList, { buildPath, options, prefix });

  // Define the StyleDictionary instance
  const dictionary = new StyleDictionary({
    source,
    platforms
  });

  // Generate the design tokens and return the StyleDictionary instance
  return dictionary.buildAllPlatforms();
}

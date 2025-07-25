import path from 'path';
import StyleDictionary from 'style-dictionary';
import {
  defaultColorSchemeConfig as colorScheme,
  defaultFluidScaleSchemeConfig as fluidScaleScheme,
  defaultRootScaleSchemeConfig as rootScaleScheme
} from './configs.js';
import { DEFAULT_BASE_FONT_SIZE, DEFAULT_PLATFORMS, DEFAULT_PREFIX } from './constants.js';
import * as formats from './formats.js';
import { getPlatformConfigs } from './platforms.js';
import type { FormatBuilder, GeneratorConfig } from './types/index.js';

export async function generateDesignTokens({
  sourcePath,
  buildPath,
  prefix = DEFAULT_PREFIX,
  platforms = [...DEFAULT_PLATFORMS],
  options = {
    baseFontSize: DEFAULT_BASE_FONT_SIZE,
    colorScheme,
    rootScaleScheme,
    fluidScaleScheme
  }
}: GeneratorConfig): Promise<StyleDictionary> {
  // Register custom formats
  Object.values(formats).forEach((formatBuilder: FormatBuilder) => {
    if (typeof formatBuilder === 'function') {
      StyleDictionary.registerFormat(formatBuilder());
    }
  });

  return new StyleDictionary({
    source: [path.resolve(sourcePath)],

    platforms: await getPlatformConfigs(platforms, { buildPath, options, prefix })
  }).buildAllPlatforms();
}

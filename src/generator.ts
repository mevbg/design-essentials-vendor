import path from 'path';
import StyleDictionary from 'style-dictionary';
import { defaultColorSchemeConfig as colorScheme } from './configs/color-scheme.config';
import { defaultFluidScaleSchemeConfig as fluidScaleScheme } from './configs/fluid-scale-scheme.config';
import { defaultRootScaleSchemeConfig as rootScaleScheme } from './configs/root-scale-scheme.config';
import { DEFAULT_BASE_FONT_SIZE, DEFAULT_PLATFORMS, DEFAULT_PREFIX } from './constants';
import * as formats from './formats';
import { getPlatformConfigs } from './platforms';
import type { FormatBuilder, GeneratorConfig } from './types/index';

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

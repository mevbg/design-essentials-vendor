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

// This is the main exposed function that initializes the design tokens generation process.
// It takes all configuration parameters:
// - sourcePath: Path to the design tokens definitions
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - platforms: Array of platform names (CSS, SCSS, JS, JSON) for which output is expected to be generated
// - options: Configuration data for color scheme, scaling, etc.
export async function generateDesignTokens({
  sourcePath,
  buildPath,
  prefix = DEFAULT_PREFIX,
  platforms = [...DEFAULT_PLATFORMS],
  designData = {
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
  const platformConfigs = await getPlatformConfigs({
    platforms,
    buildPath,
    designData,
    prefix
  });

  // Define the StyleDictionary instance
  const dictionary = new StyleDictionary({
    source,
    platforms: platformConfigs
  });

  // Generate the design tokens and return the StyleDictionary instance
  return dictionary.buildAllPlatforms();
}

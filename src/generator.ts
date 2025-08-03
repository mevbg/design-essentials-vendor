import path from 'path';
import StyleDictionary from 'style-dictionary';
import { Format } from 'style-dictionary/types';
import {
  DEFAULT_BASE_FONT_SIZE,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_COLOR_SCHEME_METHOD,
  DEFAULT_FLUID_SCALE_MAX_VIEWPORT,
  DEFAULT_FLUID_SCALE_MIN_VIEWPORT,
  DEFAULT_PLATFORMS,
  DEFAULT_PREFIX,
  DEFAULT_ROOT_SCALE_MAX_VIEWPORT,
  DEFAULT_ROOT_SCALE_MIN_VIEWPORT
} from './constants.js';
import * as formats from './formats.js';
import { getPlatformConfigs } from './platforms.js';
import type {
  ColorSchemeMethod,
  ColorSchemeType,
  DesignConfig,
  GeneratorConfig
} from './types/index.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - baseFontSize: Base font size for the design system
// - tokens: configuration for the design tokens
//    - sourcePath: Path to the design tokens definitions
//    - prefix: Prefix that will be used when creating CSS custom properties
//    - platforms: Array of platform names (CSS, SCSS, JS, JSON) for which output is expected to be generated
// - colorScheme: Configuration data for the color scheme
// - rootScaleScheme: Configuration data for root scale scheme
// - fluidScaleScheme: Configuration data for fluid scale scheme
export async function generateDesignEssentials({
  buildPath,
  baseFontSize = DEFAULT_BASE_FONT_SIZE,
  tokens,
  colorScheme = {
    default: DEFAULT_COLOR_SCHEME as ColorSchemeType,
    method: DEFAULT_COLOR_SCHEME_METHOD as ColorSchemeMethod
  },
  rootScaleScheme = {
    minViewportW: DEFAULT_ROOT_SCALE_MIN_VIEWPORT,
    maxViewportW: DEFAULT_ROOT_SCALE_MAX_VIEWPORT
  },
  fluidScaleScheme = {
    minViewportW: DEFAULT_FLUID_SCALE_MIN_VIEWPORT,
    maxViewportW: DEFAULT_FLUID_SCALE_MAX_VIEWPORT
  },
  fontsPath
}: GeneratorConfig): Promise<StyleDictionary> {
  const { sourcePath, prefix = DEFAULT_PREFIX, platforms = [...DEFAULT_PLATFORMS] } = tokens;
  const designConfig: DesignConfig = {
    baseFontSize,
    colorScheme,
    rootScaleScheme,
    fluidScaleScheme,
    fontsPath: process.env.FONTS_PATH || fontsPath
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
    designConfig,
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
}

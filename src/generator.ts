import path from 'path';
import { generateFavicons, generateTokens } from './services/index.js';
import type { GeneratorConfig } from './types/index.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - baseFontSize: Base font size for the design system
// - tokens: configuration for the design tokens
//    - sourcePath: Path to the design tokens definitions
//    - prefix: Prefix that will be used when creating CSS custom properties
//    - platforms: Array of platform names (CSS, SCSS, JS, JSON) for which output is expected to be generated
// - colorScheme: Configuration data for the color scheme
// - rootScaler: Configuration data for root scaler
// - fluidScaler: Configuration data for fluid scaler
// - fonts: Configuration data for embedded fonts (if such)
// - icons: Configuration data for icons (if such)
// - scrollbar: Configuration data for scrollbar (if such)
// - favicons: Configuration data for favicons (if such)
export async function generateDesignEssentials({
  favicons: faviconsConfig,
  ...generalConfig
}: GeneratorConfig): Promise<void> {
  await Promise.all([
    // Generate the CSS essentials, the design tokens
    // and return the StyleDictionary instance
    generateTokens(generalConfig),

    // generateFontFacesStyles(generalConfig),
    // generateScrollbarStyles(generalConfig),

    // Generate favicons (if config is provided)
    ...(faviconsConfig
      ? [
          generateFavicons({
            ...faviconsConfig,
            outputPath: faviconsConfig.outputPath || path.join(generalConfig.buildPath, 'favicons')
          })
        ]
      : [])
  ]);
}

import path from 'path';
import { fileURLToPath } from 'url';
import { type GeneratorConfig } from '../src/types/generator.types.js';
import {
  BASE_FONT_SIZE,
  COLOR_SCHEME_METHOD,
  DEFAULT_COLOR_SCHEME,
  FLUID_SCALE_MAX_VIEWPORT,
  FLUID_SCALE_MIN_VIEWPORT,
  PLATFORMS,
  PREFIX,
  ROOT_SCALE_MAX_VIEWPORT,
  ROOT_SCALE_MIN_VIEWPORT
} from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDevClientEssentials: () => Promise<void> = async () => {
  const { generateDesignEssentials } = await import(`../src/generator?update=${Date.now()}`);

  try {
    await generateDesignEssentials({
      buildPath: path.resolve(__dirname, 'dist'),
      fontsPath: 'client/fonts',
      baseFontSize: BASE_FONT_SIZE,
      tokens: {
        sourcePath: path.resolve(__dirname, './design/tokens/**/index.ts'),
        prefix: PREFIX,
        platforms: PLATFORMS
      },
      colorScheme: {
        default: DEFAULT_COLOR_SCHEME,
        method: COLOR_SCHEME_METHOD
      },
      fluidScaleScheme: {
        minViewportW: FLUID_SCALE_MIN_VIEWPORT,
        maxViewportW: FLUID_SCALE_MAX_VIEWPORT
      },
      rootScaleScheme: {
        minViewportW: ROOT_SCALE_MIN_VIEWPORT,
        maxViewportW: ROOT_SCALE_MAX_VIEWPORT
      }
    } as GeneratorConfig);
    console.info('Design essentials generated successfully!');
  } catch (err) {
    console.error('Failed to generate design essentials:', err);
    throw err;
  }
};

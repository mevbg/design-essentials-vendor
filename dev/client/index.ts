import path from 'path';
import { fileURLToPath } from 'url';
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
} from './constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDevClientTokens: () => Promise<void> = async () => {
  const { generateDesignTokens } = await import(`../../src/generator?update=${Date.now()}`);

  try {
    await generateDesignTokens({
      sourcePath: path.resolve(__dirname, './design/tokens/**/index.ts'),
      buildPath: path.resolve(__dirname, '../dist'),
      prefix: PREFIX,
      platforms: PLATFORMS,
      options: {
        baseFontSize: BASE_FONT_SIZE,
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
      }
    });
    console.info('Design tokens generated successfully!');
  } catch (err) {
    console.error('Failed to generate design tokens:', err);
    throw err;
  }
};

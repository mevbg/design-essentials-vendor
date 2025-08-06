import path from 'path';
import { fileURLToPath } from 'url';
import { TokensGeneratorParams, PlatformType, ColorSchemeMethod, ColorSchemeType  } from '../../../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tokens: TokensGeneratorParams = { 
  sourcePath: path.resolve(__dirname, '../tokens/**/index.ts'),
  platforms: [PlatformType.CSS, PlatformType.SCSS, PlatformType.JS, PlatformType.JSON],
  fluidScaler: {
    minViewportW: 600,
    maxViewportW: 1200
  },
  colorScheme: {  
    default: ColorSchemeType.LIGHT,
    method: ColorSchemeMethod.COMBINED
  }
};
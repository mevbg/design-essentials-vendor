import path from 'path';
import { fileURLToPath } from 'url';
import type { TokensConfig } from '../../../src/types/services.types.js';
import { PlatformType } from '../../../src/types/platform.types';
import { ColorSchemeMethod, ColorSchemeType } from '../../../src/types/design.types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tokens: TokensConfig = { 
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
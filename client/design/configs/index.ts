import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export * from './favicons.config.js';
// export * from './fonts.config.js';
// export * from './icons.config.js';
// export * from './root-scaler.config.js';
// export * from './scrollbar.config.js';
export * from './tokens.config.js';

export const buildPath: string = path.resolve(__dirname, '../dist');

export const prefix: string = 'dev';

export { BASE_FONT_SIZE as baseFontSize } from '../constants/typography.constants.js';

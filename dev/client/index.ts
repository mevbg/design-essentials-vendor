import path from 'path';
import { fileURLToPath } from 'url';
import { PREFIX as prefix } from './constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDevClientTokens: () => Promise<void> = async () => {
  const { generateDesignTokens } = await import(`../../src/generator?update=${Date.now()}`);

  try {
    await generateDesignTokens({
      sourcePath: path.resolve(__dirname, './design/tokens/**/index.ts'),
      buildPath: path.resolve(__dirname, '../dist'),
      prefix,
      options: {
        baseFontSize: 10,
        colorScheme: {
          default: 'light',
          method: 'combined'
        },
        fluidScaleScheme: {
          minViewportW: 600,
          maxViewportW: 1200
        },
        rootScaleScheme: {
          minViewportW: 300,
          maxViewportW: 2100
        }
      }
    });
    console.info('Design tokens generated successfully!');
  } catch (err) {
    console.error('Failed to generate design tokens:', err);
    throw err;
  }
};

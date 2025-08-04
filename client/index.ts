import path from 'path';
import { fileURLToPath } from 'url';
import { type GeneratorConfig } from '../src/types/generator.types.js';
import * as configs from './design/configs/index.js';

const { baseFontSize, platforms, prefix, ...restConfigs } = configs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDevClientEssentials: () => Promise<void> = async () => {
  const { generateDesignEssentials } = await import(`../src/generator?update=${Date.now()}`);

  try {
    await generateDesignEssentials({
      buildPath: path.resolve(__dirname, './design/dist'),
      baseFontSize,
      tokens: {
        sourcePath: path.resolve(__dirname, './design/tokens/**/index.ts'),
        prefix,
        platforms
      },
      ...restConfigs
    } as GeneratorConfig);
    console.info('Design essentials generated successfully!');
  } catch (err) {
    console.error('Failed to generate design essentials:', err);
    throw err;
  }
};

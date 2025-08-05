import type { GeneratorConfig } from '../src/types/generator.types.js';
import * as configs from './design/configs/index.js';

const { buildPath, prefix, baseFontSize, ...services } = configs;

export const generateDevClientEssentials: () => Promise<void> = async () => {
  const { generateDesignEssentials } = await import(`../src/generator?update=${Date.now()}`);

  try {
    await generateDesignEssentials({
      buildPath,
      prefix,
      baseFontSize,
      services
    } as GeneratorConfig);
    console.info('Design essentials generated successfully!');
  } catch (err) {
    console.error('Failed to generate design essentials:', err);
    throw err;
  }
};

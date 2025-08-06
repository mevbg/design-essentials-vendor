import type { MainGeneratorConfig } from '../src/types/generator.types.js';
import * as configs from './design/configs/index.js';

const { buildPath, prefix, baseFontSize, ...services } = configs;

export const generateDevClientEssentials: () => Promise<void> = async () => {
  const { generateDesignEssentials } = await import(`../src/index?update=${Date.now()}`);

  try {
    await generateDesignEssentials({
      buildPath,
      prefix,
      baseFontSize,
      services
    } as MainGeneratorConfig);
    console.info('Design essentials generated successfully!');
  } catch (err) {
    console.error('Failed to generate design essentials:', err);
    throw err;
  }
};

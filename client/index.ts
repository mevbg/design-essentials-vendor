import type { MainGeneratorParams } from '../src/generators/main/main.types.js';
import * as configs from './design/configs/index.js';

const { buildPath, prefix, baseFontSize, ...generators } = configs;

export const generateDevClientEssentials: () => Promise<void> = async () => {
  const { generateDesignEssentials } = await import(`../src/index?update=${Date.now()}`);

  try {
    await generateDesignEssentials({
      buildPath,
      prefix,
      baseFontSize
      // generators
    } as MainGeneratorParams);
    console.info('Design essentials generated successfully!');
  } catch (err) {
    console.info('Failed to generate design essentials:', err.message);
    // throw err;
  }
};

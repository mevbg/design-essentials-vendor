import StyleDictionary from 'style-dictionary';
import path from 'path';
import fs from 'fs';
import createConfig from './config/default.config.js';

export function generateDesignTokens({ tokensSourcePath, tokensBuildPath, prefix, vpMin, vpMax, baseFontSize }) {
  const sourcePath = path.resolve(tokensSourcePath);
  const buildPath = path.resolve(tokensBuildPath) + '/';

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`The token source directory does not exist: ${sourcePath}`);
  }

  const config = createConfig({ sourcePath, buildPath, prefix, vpMin, vpMax, baseFontSize });

  const SD = new StyleDictionary(config);

  return SD.buildAllPlatforms();
}
import path from 'path';
import { PlatformConfigBuilderParams } from '../types/index.js';

export const js = ({ buildPath, prefix, options }: PlatformConfigBuilderParams) => ({
  options: {
    ...options,
    prefix
  },
  transformGroup: 'js',
  buildPath: `${path.resolve(buildPath)}/js`,
  files: [
    {
      destination: 'static.design-tokens.js',
      format: 'mev/js/static'
    },
    {
      destination: 'variable.design-tokens.js',
      format: 'mev/js/variable'
    }
  ]
});

import path from 'path';
import { PlatformConfigBuilderParams } from '../types';

export const json = ({ buildPath, options }: PlatformConfigBuilderParams) => ({
  transformGroup: 'js',
  buildPath: `${path.resolve(buildPath)}/json`,
  options: {
    ...options,
    showFileHeader: false
  },
  files: [
    {
      destination: 'design-tokens.json',
      format: 'json/nested'
    }
  ]
});

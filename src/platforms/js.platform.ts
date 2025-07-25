import path from 'path';
import { JsFormatterType } from '../types/format.types.js';
import { PlatformConfigBuilderParams } from '../types/index.js';

export const js = ({ buildPath, prefix, options }: PlatformConfigBuilderParams) => ({
  options: {
    ...options,
    prefix
  },
  transformGroup: 'js',
  buildPath: `${path.resolve(buildPath)}/js`,
  files: [
    ...Object.values(JsFormatterType).map((format) => ({
      destination: `${format}.design-tokens.js`,
      format: `mev/js/${format}`
    }))
  ]
});

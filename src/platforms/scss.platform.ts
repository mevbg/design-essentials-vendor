import path from 'path';
import { TransformedToken } from 'style-dictionary/types';
import { CORE_TOKENS } from '../constants';
import { PlatformConfigBuilderParams } from '../types';
import { toKebabCase } from '../utils/strings.utils';

export const scss = ({ buildPath, options }: PlatformConfigBuilderParams) => ({
  transformGroup: 'scss',
  buildPath: `${path.resolve(buildPath)}/scss`,
  options: {
    ...options,
    showFileHeader: false
  },
  files: [
    {
      destination: 'all.design-tokens.scss',
      format: 'mev/scss/all'
    },
    ...CORE_TOKENS.map((key) => ({
      destination: `${toKebabCase(key)}.design-tokens.scss`,
      format: `mev/scss/core`,
      filter: (token: TransformedToken) => token.$type === key
    }))
  ]
});

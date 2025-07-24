import path from 'path';
import { TransformedToken } from 'style-dictionary/types';
import { CORE_TOKENS } from '../constants';
import { PlatformConfigBuilderParams } from '../types';
import { toKebabCase } from '../utils/strings.utils';

export const css = ({ buildPath, prefix, options }: PlatformConfigBuilderParams) => ({
  prefix,
  options,
  transformGroup: 'css',
  buildPath: `${path.resolve(buildPath)}/css`,
  files: [
    {
      destination: 'all.design-tokens.css',
      format: 'mev/css/all'
    },
    {
      destination: 'root-font-size.design-tokens.css',
      format: 'mev/css/root-font-size'
    },
    ...CORE_TOKENS.map((key) => ({
      destination: `${toKebabCase(key)}.design-tokens.css`,
      format: `mev/css/core`,
      filter: (token: TransformedToken) => token.$type === key
    }))
  ]
});

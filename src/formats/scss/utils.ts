import { TransformedToken } from 'style-dictionary/types';
import { toKebabCase } from '../../utils/string.utils.js';

export const wrapInSassMap = (name: string, code: string, indent: string = ''): string =>
  `${indent}${indent ? '' : '$'}${name.toLowerCase().split(' ').join('-')}: (\n${code}\n${indent})${indent ? ',' : ';'}`;

export const defineSassMapValues = (tokens: TransformedToken[], indent: string = '  '): string =>
  tokens
    .map(
      ({ name, $type, $value }, index) =>
        `${indent}'${name.replace(toKebabCase($type || '') + '-', '')}': ${$type === 'fontFamily' ? `'${$value}'` : $value}${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

import { CodeBlockContentParams, CodeBlockWrapperParams } from '../../types/index.js';
import { toKebabCase } from '../../utils/strings.utils.js';

export const wrapInSassMap = ({ name = '', code, indent = '' }: CodeBlockWrapperParams): string =>
  `${indent}${indent ? '' : '$'}${name.toLowerCase().split(' ').join('-')}: (\n${code}\n${indent})${indent ? ',' : ';'}`;

export const defineSassMapValues = ({ tokens, indent = '  ' }: CodeBlockContentParams): string =>
  tokens
    .map(
      ({ name, $type, $value }, index) =>
        `${indent}'${name.replace(toKebabCase($type || '') + '-', '')}': ${$type === 'fontFamily' ? `'${$value}'` : $value}${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

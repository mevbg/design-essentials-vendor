import { DefinerParams, WrapperParams } from '../../types/index.js';
import { toKebabCase } from '../../utils/strings.utils.js';

// Wraps a code block in a Sass map
export const wrapper = ({ name = '', code, indent = '' }: WrapperParams): string =>
  `${indent}${indent ? '' : '$'}${name.toLowerCase().split(' ').join('-')}: (\n${code}\n${indent})${indent ? ',' : ';'}`;

// Defines the values of a Sass map
export const definer = ({ tokens, indent = '  ' }: DefinerParams): string =>
  tokens
    .map(
      ({ name, $type, $value }, index) =>
        `${indent}'${name.replace(toKebabCase($type || '') + '-', '')}': ${$type === 'fontFamily' ? `'${$value}'` : $value}${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

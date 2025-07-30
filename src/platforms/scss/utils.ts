import { DefinerParams, WrapperParams } from '../../types/index.js';
import { toKebabCase } from '../../utils/strings.utils.js';

// This is the function that wraps a code block in a Sass map.
// It may be a nested map or a root map, defined as a Sass variable.
export const wrapper = ({ name = '', code, indent = '' }: WrapperParams): string =>
  `${indent}${indent ? '' : '$'}${name.toLowerCase().split(' ').join('-')}: (\n${code}\n${indent})${indent ? ',' : ';'}`;

// This is the function that defines the list of values in a Sass map.
export const definer = ({ tokens, indent = '  ' }: DefinerParams): string =>
  tokens
    .map(
      ({ name, $type, $value }, index) =>
        `${indent}'${name.replace(toKebabCase($type || '') + '-', '')}': ${$type === 'fontFamily' ? `'${$value}'` : $value}${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

import {
  CodeBlockContentParams,
  CodeBlockWrapperParams,
  JsFormatterType
} from '../../types/index.js';
import {
  capitalize,
  spaceCaseToCamelCase,
  toCamelCase,
  toKebabCase
} from '../../utils/strings.utils.js';

// Wraps a code block in a JS object
export const wrapper = ({ name = '', code, indent = '' }: CodeBlockWrapperParams): string =>
  (!indent ? `export const ${spaceCaseToCamelCase(name)} =` : `${indent}${name}:`) +
  ` {\n${code}\n${indent}}${!indent ? ';' : ''}`;

// Defines the items of a JS object
export const definer = ({ type, tokens, options, indent = '  ' }: CodeBlockContentParams): string =>
  tokens
    .map(({ name, path, $type = '', $value }, index) =>
      type === JsFormatterType.STATIC
        ? `${indent}'${toCamelCase(name.replace(capitalize($type), ''))}': '${$value}'${index < tokens.length - 1 ? ',' : ''}`
        : `${indent}'${toKebabCase(toCamelCase(name.replace(capitalize($type), '')))}': 'var(--${options?.prefix}-${toKebabCase(path.join('-')).replace('$', '')})'${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

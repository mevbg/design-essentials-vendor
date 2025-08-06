import {
  capitalize,
  spaceCaseToCamelCase,
  toCamelCase,
  toKebabCase
} from '../../../../utils/strings.utils.js';
import { DefinerParams, JsCustomFormatterType, WrapperParams } from '../../types/index.js';

// This function wraps a code block in a JS object.
// It could be a nested object or a root object, defined as a const.
export const wrapper = ({ name = '', code, indent = '' }: WrapperParams): string =>
  (!indent ? `export const ${spaceCaseToCamelCase(name)} =` : `${indent}${name}:`) +
  ` {\n${code}\n${indent}}${!indent ? ';' : ''}`;

// This function defines the list of properties in a JS object.
// The values may contain static or variable kind of data, depending on the formatter type.
export const definer = ({ type, tokens, options, indent = '  ' }: DefinerParams): string =>
  tokens
    .map(({ name, path, $type = '', $value }, index) =>
      type === JsCustomFormatterType.STATIC
        ? `${indent}'${toCamelCase(name.replace(capitalize($type), ''))}': '${$value}'${index < tokens.length - 1 ? ',' : ''}`
        : `${indent}'${toKebabCase(toCamelCase(name.replace(capitalize($type), '')))}': 'var(--${options?.prefix}-${toKebabCase(path.join('-')).replace('$', '')})'${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');

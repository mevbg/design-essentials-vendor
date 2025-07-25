import { CodeBlockContentParams, CodeBlockWrapperParams } from '../../types/index.js';
import {
  capitalize,
  spaceCaseToCamelCase,
  toCamelCase,
  toKebabCase
} from '../../utils/strings.utils.js';

export const wrapInJsConst = ({ name = '', code }: CodeBlockWrapperParams): string =>
  `export const ${spaceCaseToCamelCase(name)} = {\n${code}\n};`;

export const wrapInJsObject = ({ name = '', code, indent = '' }: CodeBlockWrapperParams): string =>
  `${indent}${name}: {\n${code}\n${indent}}`;

export const defineJsObjectItemsWithValues = ({
  tokens,
  indent = '  '
}: CodeBlockContentParams): string =>
  tokens
    .map(({ name, $type = '', $value }, index) => {
      return `${indent}'${toCamelCase(name.replace(capitalize($type), ''))}': '${$value}'${index < tokens.length - 1 ? ',' : ''}`;
    })
    .join('\n');

export const defineJsObjectItemsWithVariables = ({
  tokens,
  options,
  indent = '  '
}: CodeBlockContentParams): string => {
  return tokens
    .map(
      ({ name, path, $type = '' }, index) =>
        `${indent}'${toKebabCase(toCamelCase(name.replace(capitalize($type), '')))}': 'var(--${options?.prefix}-${toKebabCase(path.join('-')).replace('$', '')})'${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');
};

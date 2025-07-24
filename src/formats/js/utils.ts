import { TransformedToken } from 'style-dictionary/types';
import {
  capitalize,
  spaceCaseToCamelCase,
  toCamelCase,
  toKebabCase
} from '../../utils/strings.utils';

export const wrapInJsConst = (name: string, code: string): string =>
  `export const ${spaceCaseToCamelCase(name)} = {\n${code}\n};`;

export const wrapInJsObject = (name: string, code: string, indent: string = ''): string =>
  `${indent}${name}: {\n${code}\n${indent}}`;

export const defineJsObjectItemsWithValues = (
  tokens: TransformedToken[],
  indent: string = '  '
): string =>
  tokens
    .map(({ name, $type = '', $value }, index) => {
      return `${indent}'${toCamelCase(name.replace(capitalize($type), ''))}': '${$value}'${index < tokens.length - 1 ? ',' : ''}`;
    })
    .join('\n');

export const defineJsObjectItemsWithVariables = (
  tokens: TransformedToken[],
  prefix: string,
  indent: string = '  '
): string => {
  return tokens
    .map(
      ({ name, path, $type = '' }, index) =>
        `${indent}'${toKebabCase(toCamelCase(name.replace(capitalize($type), '')))}': 'var(--${prefix}-${toKebabCase(path.join('-')).replace('$', '')})'${index < tokens.length - 1 ? ',' : ''}`
    )
    .join('\n');
};

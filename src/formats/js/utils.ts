import { TransformedToken } from 'style-dictionary/types';
import { capitalize, spaceCaseToCamelCase, toCamelCase, toKebabCase } from '../../utils';

export const wrapInConst = (name: string, code: string): string =>
  `export const ${spaceCaseToCamelCase(name)} = {\n${code}\n};`;

export const wrapInObject = (name: string, code: string, indent: string = ''): string =>
  `${indent}${name}: {\n${code}\n${indent}}`;

export const defineObjectItemsWithValues = (
  tokens: TransformedToken[],
  indent: string = '  '
): string =>
  tokens
    .map(({ name, $type = '', $value }, index) => {
      return `${indent}'${toCamelCase(name.replace(capitalize($type), ''))}': '${$value}'${index < tokens.length - 1 ? ',' : ''}`;
    })
    .join('\n');

export const defineObjectItemsWithVariables = (
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

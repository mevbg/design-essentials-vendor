import { TransformedToken } from 'style-dictionary/types';

export const wrapInCssRoot = (code: string, indent: string = ''): string =>
  `${indent}:root {\n${code}\n${indent}}`;

export const wrapInCssSelector = (selector: string, code: string, indent: string = ''): string =>
  `${indent}${selector} {\n${code}\n${indent}}`;

export const defineCssCustomProperties = (
  tokens: TransformedToken[],
  indent: string = '  '
): string => tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

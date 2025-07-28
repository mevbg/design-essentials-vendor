import { CodeBlockContentParams, CodeBlockWrapperParams } from '../../types/index.js';

export const wrapInCssSelector = ({
  name = ':root',
  code,
  indent = ''
}: CodeBlockWrapperParams): string => `${indent}${name} {\n${code}\n${indent}}`;

export const defineCssCustomProperties = ({
  tokens,
  indent = '  '
}: CodeBlockContentParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

import { CodeBlockContentParams, CodeBlockWrapperParams } from '../../types/index.js';

export const wrapInCssRoot = ({ code, indent = '' }: CodeBlockWrapperParams): string =>
  `${indent}:root {\n${code}\n${indent}}`;

export const wrapInCssSelector = (selector: string, code: string, indent: string = ''): string =>
  `${indent}${selector} {\n${code}\n${indent}}`;

export const defineCssCustomProperties = ({
  tokens,
  indent = '  '
}: CodeBlockContentParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

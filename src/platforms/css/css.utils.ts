import { CodeBlockContentParams, CodeBlockWrapperParams } from '../../types/index.js';

// Wraps a code block in a CSS selector
export const wrapper = ({ name = ':root', code, indent = '' }: CodeBlockWrapperParams): string =>
  `${indent}${name} {\n${code}\n${indent}}`;

// Defines the custom properties of a CSS selector
export const definer = ({ tokens, indent = '  ' }: CodeBlockContentParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

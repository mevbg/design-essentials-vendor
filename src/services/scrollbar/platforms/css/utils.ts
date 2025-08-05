import { DefinerParams, WrapperParams } from '../../../../types/index.js';

// This function wraps a code block in a given CSS selector.
export const wrapper = ({ name = ':root', code, indent = '' }: WrapperParams): string =>
  `${indent}${name} {\n${code}\n${indent}}`;

// This function defines the list of custom properties.
export const definer = ({ tokens, indent = '  ' }: DefinerParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

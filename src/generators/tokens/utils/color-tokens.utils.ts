/* =================================================== */
/* TOKENS → UTILS → COLOR TOKENS */
/* =================================================== */

import type { TransformedToken } from 'style-dictionary/types';
import { capitalize } from '../../../utils/strings.utils.js';

const nameReplacers = {
  pascal: (name: string, scheme: string) => name.replace('ColorScheme' + capitalize(scheme), ''),
  kebab: (name: string, scheme: string) => name.replace(`-scheme-${scheme}`, '')
};

type Syntax = keyof typeof nameReplacers;

// Returns the tokens for a given color scheme
const getColorSchemeTokens = (
  tokens: TransformedToken[],
  scheme: string,
  syntax: Syntax
): TransformedToken[] =>
  tokens
    .filter(({ attributes }) => attributes?.item === scheme)
    .map(({ name, ...rest }) => ({
      name: nameReplacers[syntax](name, scheme),
      ...rest
    }));

// Returns the color scheme tokens for a given syntax
export const getColorScheme = (
  tokens: TransformedToken[],
  syntax: Syntax,
  defaultScheme?: string
): Record<string, TransformedToken[]> => {
  const schemeTokens = tokens.filter(({ attributes }) => attributes?.type === 'scheme');

  // Create base color scheme object
  const baseColorScheme = {
    light: getColorSchemeTokens(schemeTokens, 'light', syntax),
    dark: getColorSchemeTokens(schemeTokens, 'dark', syntax)
  };

  // If default scheme is specified and it's different from 'light', reorder the keys
  if (defaultScheme && defaultScheme !== 'light') {
    const reorderedColorScheme: Record<string, TransformedToken[]> = {};

    // Put the default scheme first
    reorderedColorScheme[defaultScheme] =
      baseColorScheme[defaultScheme as keyof typeof baseColorScheme];

    // Add the remaining schemes
    Object.keys(baseColorScheme).forEach((scheme) => {
      if (scheme !== defaultScheme) {
        reorderedColorScheme[scheme] = baseColorScheme[scheme as keyof typeof baseColorScheme];
      }
    });

    return reorderedColorScheme;
  }

  return baseColorScheme;
};

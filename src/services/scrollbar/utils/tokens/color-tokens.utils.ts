import { TransformedToken } from 'style-dictionary/types';
import { capitalize } from '../../../../utils/strings.utils.js';

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
  syntax: Syntax
): Record<string, TransformedToken[]> => {
  const schemeTokens = tokens.filter(({ attributes }) => attributes?.type === 'scheme');

  return {
    light: getColorSchemeTokens(schemeTokens, 'light', syntax),
    dark: getColorSchemeTokens(schemeTokens, 'dark', syntax)
  };
};

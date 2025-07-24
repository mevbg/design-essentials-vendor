import { TransformedToken } from 'style-dictionary';
import { capitalize } from './strings.utils';

const nameReplacers = {
  pascal: (name: string, scheme: string) => name.replace('ColorScheme' + capitalize(scheme), ''),
  kebab: (name: string, scheme: string) => name.replace(`-scheme-${scheme}`, '')
};

type Syntax = keyof typeof nameReplacers;

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

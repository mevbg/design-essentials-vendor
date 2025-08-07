/* =================================================== */
/* TOKENS → UTILS → UTOPIA TOKENS */
/* =================================================== */

import type { TransformedToken } from 'style-dictionary/types';
import type { UtopiaSchemeParams } from '../tokens.types.js';

//
// ---------------------------------------------------
// HELPER FUNCTIONS

// Generates and returns the responsive value
// of a given Utopia token (one with min and max values)
const getUtopiaTokenResponsiveValue = (
  token: TransformedToken,
  baseFontSize: number,
  { minViewportW, maxViewportW }: UtopiaSchemeParams
): string => {
  const slope =
    ((parseFloat(token.$value.max) - parseFloat(token.$value.min)) /
      (maxViewportW - minViewportW)) *
    100;
  const yIntercept = parseFloat(token.$value.min) - (slope * minViewportW) / 100;
  const yInterceptRem = yIntercept / baseFontSize;

  return `calc(${yInterceptRem.toFixed(5)}rem + ${slope.toFixed(5)}vw)`;
};

// Sets the value of a given Utopia token to the provided value
// and returns a new token with the new value (either fixed min/max or responsive)
const setUtopiaTokenValue = (token: TransformedToken, $value: string): TransformedToken => ({
  ...token,
  $value
});

// Transforms the values of a given Utopia tokens array to their fixed min values
// and returns a new array of tokens with the new values
export const mapUtopiaTokenValuesToMin = (tokens: TransformedToken[]): TransformedToken[] =>
  tokens.map((token: TransformedToken) => setUtopiaTokenValue(token, token.$value.min));

// Transforms the values of a given Utopia tokens array to their fixed max values
// and returns a new array of tokens with the new values
export const mapUtopiaTokenValuesToMax = (tokens: TransformedToken[]): TransformedToken[] =>
  tokens.map((token: TransformedToken) => setUtopiaTokenValue(token, token.$value.max));

// Transforms the values of a given Utopia tokens array to their responsive values
// and returns a new array of tokens with the new values
export const mapUtopiaTokenValuesToResponsive = (
  tokens: TransformedToken[],
  baseFontSize: number,
  utopiaScheme: UtopiaSchemeParams
): TransformedToken[] =>
  tokens.map((token: TransformedToken) =>
    setUtopiaTokenValue(token, getUtopiaTokenResponsiveValue(token, baseFontSize, utopiaScheme))
  );

// Separates tokens into Utopia and basic tokens
// and returns an object with the two arrays
export const separateUtopiaAndBasicTokens = (
  tokens: TransformedToken[]
): {
  utopiaTokens: TransformedToken[];
  basicTokens: TransformedToken[];
} => {
  const utopiaTokens: TransformedToken[] = [];
  const basicTokens: TransformedToken[] = [];

  tokens.forEach((token: TransformedToken) => {
    const value = token.$value;

    if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
      utopiaTokens.push(token);
    } else {
      basicTokens.push(token);
    }
  });

  return {
    utopiaTokens,
    basicTokens
  };
};

// Checks if a given token is Utopia (has min and max values)
// and returns true if it is
export const isUtopiaToken = (token: TransformedToken): boolean =>
  token.$value.min !== undefined &&
  token.$value.max !== undefined &&
  token.$value.min !== token.$value.max;

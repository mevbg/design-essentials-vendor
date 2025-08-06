import type { TransformedToken } from 'style-dictionary/types';
import type { FluidScalerParams } from '../types/index.js';

// Generates and returns the responsive value
// of a given fluid token (one with min and max values)
const getFluidTokenResponsiveValue = (
  token: TransformedToken,
  baseFontSize: number,
  { minViewportW, maxViewportW }: FluidScalerParams
): string => {
  const slope =
    ((parseFloat(token.$value.max) - parseFloat(token.$value.min)) /
      (maxViewportW - minViewportW)) *
    100;
  const yIntercept = parseFloat(token.$value.min) - (slope * minViewportW) / 100;
  const yInterceptRem = yIntercept / baseFontSize;

  return `calc(${yInterceptRem.toFixed(5)}rem + ${slope.toFixed(5)}vw)`;
};

// Sets the value of a given fluid token to the provided value
// and returns a new token with the new value (either fixed min/max or responsive)
const setFluidTokenValue = (token: TransformedToken, $value: string): TransformedToken => ({
  ...token,
  $value
});

// Transforms the values of a given fluid tokens array to their fixed min values
// and returns a new array of tokens with the new values
export const mapFluidTokenValuesToMin = (tokens: TransformedToken[]): TransformedToken[] =>
  tokens.map((token: TransformedToken) => setFluidTokenValue(token, token.$value.min));

// Transforms the values of a given fluid tokens array to their fixed max values
// and returns a new array of tokens with the new values
export const mapFluidTokenValuesToMax = (tokens: TransformedToken[]): TransformedToken[] =>
  tokens.map((token: TransformedToken) => setFluidTokenValue(token, token.$value.max));

// Transforms the values of a given fluid tokens array to their responsive values
// and returns a new array of tokens with the new values
export const mapFluidTokenValuesToResponsive = (
  tokens: TransformedToken[],
  baseFontSize: number,
  fluidScaler: FluidScalerParams
): TransformedToken[] =>
  tokens.map((token: TransformedToken) =>
    setFluidTokenValue(token, getFluidTokenResponsiveValue(token, baseFontSize, fluidScaler))
  );

// Separates tokens into fluid and fixed tokens
// and returns an object with the two arrays
export const separateFluidAndBasicTokens = (
  tokens: TransformedToken[]
): {
  fluidTokens: TransformedToken[];
  basicTokens: TransformedToken[];
} => {
  const fluidTokens: TransformedToken[] = [];
  const basicTokens: TransformedToken[] = [];

  tokens.forEach((token: TransformedToken) => {
    const value = token.$value;

    if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
      fluidTokens.push(token);
    } else {
      basicTokens.push(token);
    }
  });

  return {
    fluidTokens,
    basicTokens
  };
};

// Checks if a given token is fluid (has min and max values)
// and returns true if it is
export const tokenIsFluid = (token: TransformedToken): boolean =>
  token.$value.min !== undefined &&
  token.$value.max !== undefined &&
  token.$value.min !== token.$value.max;

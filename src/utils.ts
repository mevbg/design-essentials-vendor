import { TransformedToken } from 'style-dictionary/types';
import { type FluidScaleSchemeConfig } from './configs/fluid-scale-scheme.config';

export const fileHeader = (name: string) =>
  `/* =================================================== */\n/* ${name.toUpperCase()} */\n/* =================================================== */\n`;

export const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const spaceCaseToCamelCase = (str: string) =>
  str
    .split(' ')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

export const toSpaceCase = (str: string) => str.replace(/([A-Z])/g, ' $1');

export const toCamelCase = (str: string) => {
  // If string contains dashes, treat as kebab-case
  if (str.includes('-')) {
    return str
      .split('-')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If string contains underscores, treat as snake_case
  if (str.includes('_')) {
    return str
      .split('_')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If string has capital letters, split by capitals (PascalCase or mixed case)
  if (/[A-Z]/.test(str)) {
    return str
      .replace(/([A-Z])/g, ' $1') // Add space before capitals
      .trim() // Remove leading space if any
      .split(' ')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If it's already all lowercase, just return it
  return str.toLowerCase();
};

export const defineSection = (name: string, code: string, noFlagComment?: boolean): string => {
  return noFlagComment ? `${code}\n` : `\n${`/* ${name} Tokens */`.toUpperCase()}\n\n${code}\n`;
};

export const tokenHasFluidValue = (token: TransformedToken): boolean => {
  return (
    token.$value.min !== undefined &&
    token.$value.max !== undefined &&
    token.$value.min !== token.$value.max
  );
};

export const separateFluidTokens = (tokens: TransformedToken[]) => {
  const fluidTokens: TransformedToken[] = [];
  const regularTokens: TransformedToken[] = [];

  tokens.forEach((token) => {
    const value = token.$value;

    if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
      fluidTokens.push(token);
    } else {
      regularTokens.push(token);
    }
  });

  return {
    fluidTokens,
    regularTokens
  };
};

export const mapFluidTokensToMinTokens = (tokens: TransformedToken[]) =>
  tokens.map((token) => ({
    ...token,
    $value: token.$value.min
  }));

export const mapFluidTokensToMaxTokens = (tokens: TransformedToken[]) =>
  tokens.map((token) => ({
    ...token,
    $value: token.$value.max
  }));

export const mapFluidTokensToCalcTokens = (
  tokens: TransformedToken[],
  baseFontSize: number,
  { minViewportW, maxViewportW }: FluidScaleSchemeConfig
) =>
  tokens.map((token) => {
    const slope =
      ((parseFloat(token.$value.max) - parseFloat(token.$value.min)) /
        (maxViewportW - minViewportW)) *
      100;
    const yIntercept = parseFloat(token.$value.min) - (slope * minViewportW) / 100;
    const yInterceptRem = yIntercept / baseFontSize;

    return {
      ...token,
      $value: `calc(${yInterceptRem.toFixed(5)}rem + ${slope.toFixed(5)}vw)`
    };
  });

export const tab = (c: number = 1) => '  '.repeat(c);

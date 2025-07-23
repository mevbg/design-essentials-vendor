import { TransformedToken } from 'style-dictionary';
import { TokenTypeHandlerParams } from '../../../types';
import { defineSection, tab } from '../../../utils';
import { defineCssCustomProperties, wrapInRoot, wrapInSelector } from '../utils';

const getSchemeTokens = (tokens: TransformedToken[], scheme: string): TransformedToken[] =>
  tokens
    .filter(({ attributes }) => attributes?.item === scheme)
    .map(({ name, ...rest }) => ({
      name: name.replace(`-scheme-${scheme}`, ''),
      ...rest
    }));

const colorHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const schemeTokens = tokens.filter(({ attributes }) => attributes?.type === 'scheme');
  const colorScheme: Record<string, TransformedToken[]> = {
    light: getSchemeTokens(schemeTokens, 'light'),
    dark: getSchemeTokens(schemeTokens, 'dark')
  };

  // no method case
  if (!options?.colorScheme?.method) {
    output.push(
      wrapInRoot(defineCssCustomProperties(colorScheme[options?.colorScheme?.default])) + '\n'
    );
  }

  // media and combined methods
  if (['media', 'combined'].includes(options?.colorScheme?.method)) {
    output.push(
      wrapInRoot(defineCssCustomProperties(colorScheme[options?.colorScheme?.default])) + '\n'
    );

    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(`@media (prefers-color-scheme: ${scheme}) {`);
      output.push(wrapInRoot(defineCssCustomProperties(tokens, tab(2)), tab()));
      output.push('}\n');
    });
  }

  // class and combined methods
  if (['class', 'combined'].includes(options?.colorScheme?.method)) {
    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(wrapInSelector(`html.${scheme}`, defineCssCustomProperties(tokens)) + '\n');
    });
  }

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInRoot(defineCssCustomProperties(nonSchemeTokens)));
  }

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default colorHandler;

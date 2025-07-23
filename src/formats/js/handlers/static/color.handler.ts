import { TransformedToken } from 'style-dictionary';
import { TokenTypeHandlerParams } from '../../../../types';
import { capitalize, defineSection, tab } from '../../../../utils';
import { defineObjectItemsWithValues, wrapInConst, wrapInObject } from '../../utils';

const getSchemeTokens = (tokens: TransformedToken[], scheme: string): TransformedToken[] =>
  tokens
    .filter(({ attributes }) => attributes?.item === scheme)
    .map(({ name, ...rest }) => ({
      name: name.replace(`-scheme-${scheme}`, ''),
      ...rest
    }));

const colorHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const schemeTokens = tokens.filter(({ attributes }) => attributes?.type === 'scheme');
  const colorScheme: Record<string, TransformedToken[]> = {
    light: getSchemeTokens(schemeTokens, 'light'),
    dark: getSchemeTokens(schemeTokens, 'dark')
  };
  output.push(
    wrapInConst(
      'colorScheme',
      Object.entries(colorScheme)
        .map(
          ([scheme, tokens], index) =>
            wrapInObject(
              scheme,
              defineObjectItemsWithValues(
                tokens.map(({ name, ...rest }) => ({
                  name: name.replace('ColorScheme' + capitalize(scheme), ''),
                  ...rest
                })),
                tab(2)
              ),
              tab()
            ) + (index < Object.entries(colorScheme).length - 1 ? ',' : '')
        )
        .join('\n')
    ) + '\n'
  );

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInConst(name, defineObjectItemsWithValues(nonSchemeTokens)));
  }

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default colorHandler;

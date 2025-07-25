import { TokenTypeHandlerParams } from '../../../types/index.js';
import { tab, wrapInFileChapter } from '../../../utils/formats.utils.js';
import { getColorScheme } from '../../../utils/tokens.utils.js';
import { defineSassMapValues, wrapInSassMap } from '../utils.js';

const colorHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const colorScheme = getColorScheme(tokens, 'kebab');
  output.push(
    wrapInSassMap(
      'color-scheme',
      Object.entries(colorScheme)
        .map(([scheme, tokens]) =>
          wrapInSassMap(scheme, defineSassMapValues(tokens, tab(2)), tab())
        )
        .join('\n')
    ) + '\n'
  );

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInSassMap(name, defineSassMapValues(nonSchemeTokens)));
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

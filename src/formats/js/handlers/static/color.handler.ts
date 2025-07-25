import { TokenTypeHandlerParams } from '../../../../types/index.js';
import { tab, wrapInFileChapter } from '../../../../utils/format.utils.js';
import { getColorScheme } from '../../../../utils/token.utils.js';
import { defineJsObjectItemsWithValues, wrapInJsConst, wrapInJsObject } from '../../utils.js';

const colorHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const colorScheme = getColorScheme(tokens, 'pascal');
  output.push(
    wrapInJsConst(
      'Color Scheme',
      Object.entries(colorScheme)
        .map(
          ([scheme, tokens], index) =>
            wrapInJsObject(scheme, defineJsObjectItemsWithValues(tokens, tab(2)), tab()) +
            (index < Object.entries(colorScheme).length - 1 ? ',' : '')
        )
        .join('\n')
    ) + '\n'
  );

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInJsConst(name, defineJsObjectItemsWithValues(nonSchemeTokens)));
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

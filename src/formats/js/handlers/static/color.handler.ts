import { TokenTypeHandlerParams } from '../../../../types';
import { tab, wrapInFileChapter } from '../../../../utils/formats.utils';
import { getColorScheme } from '../../../../utils/tokens.utils';
import { defineJsObjectItemsWithValues, wrapInJsConst, wrapInJsObject } from '../../utils';

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

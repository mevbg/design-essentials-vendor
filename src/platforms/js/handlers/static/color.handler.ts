import { TokenTypeHandlerParams } from '../../../../types/index.js';
import { tab, wrapInFileChapter } from '../../../../utils/formats.utils.js';
import { getColorScheme } from '../../../../utils/tokens/color-tokens.utils.js';
import { defineJsObjectItemsWithValues, wrapInJsConst, wrapInJsObject } from '../../js.utils.js';

const colorHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const colorScheme = getColorScheme(tokens, 'pascal');
  output.push(
    wrapInJsConst({
      name: 'Color Scheme',
      code: Object.entries(colorScheme)
        .map(
          ([scheme, tokens], index) =>
            wrapInJsObject({
              name: scheme,
              code: defineJsObjectItemsWithValues({ tokens, indent: tab(2) }),
              indent: tab()
            }) + (index < Object.entries(colorScheme).length - 1 ? ',' : '')
        )
        .join('\n')
    }) + '\n'
  );

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(
      wrapInJsConst({
        name,
        code: defineJsObjectItemsWithValues({ tokens: nonSchemeTokens })
      })
    );
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

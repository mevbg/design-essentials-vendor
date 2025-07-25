import { defineSassMapValues, wrapInSassMap } from '../../formats/scss/utils.js';
import { TokenTypeHandlerParams } from '../../types/index.js';
import { tab, wrapInFileChapter } from '../../utils/format.utils.js';
import { getColorScheme } from '../../utils/token.utils.js';

const colorHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const colorScheme = getColorScheme(tokens, 'kebab');
  output.push(
    wrapInSassMap({
      name: 'color-scheme',
      code: Object.entries(colorScheme)
        .map(([scheme, tokens]) =>
          wrapInSassMap({
            name: scheme,
            code: defineSassMapValues({ tokens, indent: tab(2) }),
            indent: tab()
          })
        )
        .join('\n')
    }) + '\n'
  );

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInSassMap({ name, code: defineSassMapValues({ tokens: nonSchemeTokens }) }));
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

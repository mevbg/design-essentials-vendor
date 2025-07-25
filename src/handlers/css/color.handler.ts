import {
  defineCssCustomProperties,
  wrapInCssRoot,
  wrapInCssSelector
} from '../../formats/css/utils.js';
import { TokenTypeHandlerParams } from '../../types/index.js';
import { tab, wrapInFileChapter } from '../../utils/format.utils.js';
import { getColorScheme } from '../../utils/token.utils.js';

const colorHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Scheme color tokens
  const colorScheme = getColorScheme(tokens, 'kebab');
  // no method case
  if (!options?.colorScheme?.method) {
    output.push(
      wrapInCssRoot({
        code: defineCssCustomProperties({ tokens: colorScheme[options?.colorScheme?.default] })
      }) + '\n'
    );
  }
  // media and combined methods
  if (['media', 'combined'].includes(options?.colorScheme?.method)) {
    output.push(
      wrapInCssRoot({
        code: defineCssCustomProperties({ tokens: colorScheme[options?.colorScheme?.default] })
      }) + '\n'
    );

    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(`@media (prefers-color-scheme: ${scheme}) {`);
      output.push(
        wrapInCssRoot({
          code: defineCssCustomProperties({ tokens, indent: tab(2) }),
          indent: tab()
        })
      );
      output.push('}\n');
    });
  }
  // class and combined methods
  if (['class', 'combined'].includes(options?.colorScheme?.method)) {
    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(
        wrapInCssSelector(`html.${scheme}`, defineCssCustomProperties({ tokens }), tab()) + '\n'
      );
    });
  }

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInCssRoot({ code: defineCssCustomProperties({ tokens: nonSchemeTokens }) }));
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

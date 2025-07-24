import { FormatHandler, TokenTypeHandlerParams } from '../../../types';
import { tab, wrapInFileChapter } from '../../../utils/formats.utils';
import { getColorScheme } from '../../../utils/tokens.utils';
import { defineCssCustomProperties, wrapInCssRoot, wrapInCssSelector } from '../utils';

const colorHandler: FormatHandler = (
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
      wrapInCssRoot(defineCssCustomProperties(colorScheme[options?.colorScheme?.default])) + '\n'
    );
  }
  // media and combined methods
  if (['media', 'combined'].includes(options?.colorScheme?.method)) {
    output.push(
      wrapInCssRoot(defineCssCustomProperties(colorScheme[options?.colorScheme?.default])) + '\n'
    );

    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(`@media (prefers-color-scheme: ${scheme}) {`);
      output.push(wrapInCssRoot(defineCssCustomProperties(tokens, tab(2)), tab()));
      output.push('}\n');
    });
  }
  // class and combined methods
  if (['class', 'combined'].includes(options?.colorScheme?.method)) {
    Object.entries(colorScheme).forEach(([scheme, tokens]) => {
      output.push(wrapInCssSelector(`html.${scheme}`, defineCssCustomProperties(tokens)) + '\n');
    });
  }

  // Non-scheme color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  if (nonSchemeTokens.length) {
    output.push(wrapInCssRoot(defineCssCustomProperties(nonSchemeTokens)));
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../../formats/js/utils.js';
import { TokenTypeHandlerParams } from '../../../types/index.js';
import { wrapInFileChapter } from '../../../utils/format.utils.js';
import { capitalize } from '../../../utils/string.utils.js';

const colorHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');

  const schemeTokens = tokens
    .filter(
      ({ attributes }) =>
        attributes?.type === 'scheme' && attributes?.item === options?.colorScheme.default
    )
    .map((token) => {
      token.path.splice(1, 2);

      return {
        ...token,
        name: token.name.replace(`Scheme${capitalize(options?.colorScheme.default)}`, ''),
        path: token.path
      };
    });

  if (nonSchemeTokens.length) {
    output.push(
      wrapInJsConst({
        name,
        code: defineJsObjectItemsWithVariables({
          tokens: [...nonSchemeTokens, ...schemeTokens],
          options
        })
      })
    );
  }

  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

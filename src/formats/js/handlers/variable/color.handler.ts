import { TokenTypeHandlerParams } from '../../../../types';
import { wrapInFileChapter } from '../../../../utils/formats.utils';
import { capitalize } from '../../../../utils/strings.utils';
import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../utils';

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
      wrapInJsConst(
        name,
        defineJsObjectItemsWithVariables([...nonSchemeTokens, ...schemeTokens], options?.prefix)
      )
    );
  }

  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default colorHandler;

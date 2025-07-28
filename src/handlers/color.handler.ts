import {
  CustomFormatterCategory,
  GeneralHandlerParams,
  JsFormatterType
} from '../types/format.types.js';
import { tab, wrapInFileChapter } from '../utils/formats.utils.js';
import { capitalize } from '../utils/strings.utils.js';
import { getColorScheme } from '../utils/tokens/color-tokens.utils.js';

// Renders color tokens based on a given context
export const colorHandler = ({
  name,
  category,
  type,
  wrapper,
  definer,
  formatArgs,
  tokens,
  config
}: GeneralHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Get the options from the format arguments
  const { options } = formatArgs;

  // Parse color scheme tokens
  if (category !== CustomFormatterCategory.JS || type !== JsFormatterType.VARIABLE) {
    const colorScheme = getColorScheme(
      tokens,
      category === CustomFormatterCategory.JS ? 'pascal' : 'kebab'
    );

    const parsers = {
      css: () => {
        // no method case
        if (!options?.colorScheme?.method) {
          output.push(
            wrapper({
              code: definer({
                tokens: colorScheme[options?.colorScheme?.default]
              })
            }) + '\n'
          );
        }
        // media and combined methods
        if (['media', 'combined'].includes(options?.colorScheme?.method)) {
          output.push(
            wrapper({
              code: definer({
                tokens: colorScheme[options?.colorScheme?.default]
              })
            }) + '\n'
          );
          Object.entries(colorScheme).forEach(([scheme, tokens]) => {
            output.push(`@media (prefers-color-scheme: ${scheme}) {`);
            output.push(
              wrapper({
                code: definer({ tokens, indent: tab(2) }),
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
              wrapper({
                name: `html.${scheme}`,
                code: definer({ tokens })
              }) + '\n'
            );
          });
        }
      },
      scss: () => {
        output.push(
          wrapper({
            name: 'color-scheme',
            code: Object.entries(colorScheme)
              .map(([scheme, tokens]) =>
                wrapper({
                  name: scheme,
                  code: definer({ tokens, indent: tab(2) }),
                  indent: tab()
                })
              )
              .join('\n')
          }) + '\n'
        );
      },
      js: () => {
        output.push(
          wrapper({
            name: 'Color Scheme',
            code: Object.entries(colorScheme)
              .map(
                ([scheme, tokens], index) =>
                  wrapper({
                    name: scheme,
                    code: definer({ type, tokens, indent: tab(2) }),
                    indent: tab()
                  }) + (index < Object.entries(colorScheme).length - 1 ? ',' : '')
              )
              .join('\n')
          }) + '\n'
        );
      }
    };

    if (category) {
      parsers[category]();
    }
  }

  // Single color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  const jsVariableTokens =
    category === CustomFormatterCategory.JS && type === JsFormatterType.VARIABLE
      ? tokens
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
          })
      : [];
  const singleTokens = [...nonSchemeTokens, ...jsVariableTokens];
  if (singleTokens.length) {
    output.push(
      wrapper({
        name: category !== CustomFormatterCategory.CSS ? name : undefined,
        code: definer({
          type,
          tokens: singleTokens,
          options
        })
      })
    );
  }

  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

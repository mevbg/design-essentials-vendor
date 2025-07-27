import { wrapInCssSelector } from './platforms/css/css.utils.js';
import { wrapInJsObject } from './platforms/js/js.utils.js';
import { CommonHandlerParams } from './types/format.types.js';
import { tab, wrapInFileChapter } from './utils/formats.utils.js';
import { capitalize } from './utils/strings.utils.js';
import { getColorScheme } from './utils/tokens/color-tokens.utils.js';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndBasicTokens
} from './utils/tokens/fluid-tokens.utils.js';

// Renders basic tokens based on a given context
export const basicHandler = ({ name, params, wrapper, definer }: CommonHandlerParams): string => {
  return wrapInFileChapter(
    name,
    wrapper({ name, code: definer(params) }),
    params.config?.noChapterTitle
  );
};

// Renders fluid tokens based on a given context
export const fluidHandler = ({
  format,
  name,
  params,
  wrapper,
  definer,
  fluidSeparation: separation
}: CommonHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  const { tokens, ...restParams } = params;

  // Separate fluid and basic tokens
  const { fluidTokens, basicTokens } = separateFluidAndBasicTokens(tokens);
  const { fluidScaleScheme, baseFontSize } = params.options || {};
  const { minViewportW, maxViewportW } = fluidScaleScheme;

  if (separation) {
    const tokens = {
      Min: {
        tokens: mapFluidTokenValuesToMin(fluidTokens),
        media: `(max-width: ${minViewportW - 1}px)`
      },
      Fluid: {
        tokens: mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme),
        media: `(min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px)`
      },
      Max: {
        tokens: mapFluidTokenValuesToMax(fluidTokens),
        media: `(min-width: ${maxViewportW + 1}px)`
      }
    };

    const variants = Object.entries(tokens).map(([key, value]) => ({
      suffix: key,
      tokens: value.tokens,
      media: value.media
    }));

    variants.forEach(({ suffix, tokens, media }, index) => {
      const separator = format === 'js' ? ' ' : '-';
      const extraNewline = index < variants.length - 1 || basicTokens.length;

      if (format === 'css' && media) {
        output.push(`@media all and ${media} {`);
      }
      output.push(
        wrapper({
          name: name + separator + (format === 'js' ? suffix : suffix.toLowerCase()),
          code: definer({ tokens, indent: format === 'css' ? tab(2) : undefined }),
          indent: format === 'css' ? tab(1) : undefined
        }) + (extraNewline && format !== 'css' ? '\n' : '')
      );
      if (format === 'css' && media) {
        output.push(`}${extraNewline ? '\n' : ''}`);
      }
    });
  }

  // Print out basic tokens (if no separation, print out all the tokens as basic)
  const restTokens = separation ? basicTokens : tokens;
  if (restTokens.length) {
    output.push(
      wrapper({
        name,
        code: definer({ tokens: restTokens, ...restParams })
      })
    );
  }

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), params.config?.noChapterTitle);
};

// Renders color tokens based on a given context
export const colorHandler = ({
  format,
  name,
  type,
  params: { tokens, options, config },
  wrapper,
  definer
}: CommonHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  // Parse color scheme tokens
  if (format !== 'js' || type !== 'variable') {
    const colorScheme = getColorScheme(tokens, format === 'js' ? 'pascal' : 'kebab');

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
              wrapInCssSelector({
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
                  wrapInJsObject({
                    name: scheme,
                    code: definer({ tokens, indent: tab(2) }),
                    indent: tab()
                  }) + (index < Object.entries(colorScheme).length - 1 ? ',' : '')
              )
              .join('\n')
          }) + '\n'
        );
      }
    };

    if (format) {
      parsers[format]();
    }
  }

  // Single color tokens
  const nonSchemeTokens = tokens.filter(({ attributes }) => attributes?.type !== 'scheme');
  const jsVariableTokens =
    format === 'js' && type === 'variable'
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
        name,
        code: definer({
          tokens: singleTokens,
          options
        })
      })
    );
  }

  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

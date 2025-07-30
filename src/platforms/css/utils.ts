import { Format, FormatFnArguments } from 'style-dictionary/types';
import {
  CustomFormatterCategory,
  DefinerParams,
  HandlerConfig,
  WrapperParams
} from '../../types/index.js';
import { fileHeader, getFileOutput, getFormatterName, tab } from '../../utils/formats.utils.js';

const rootFontSizeTitle = 'Root Font Size';

// This is the function that outputs the root font size tokens.
// It is used to output the root font size tokens
// in a separate file as well as in the all tokens file.
export const outputRootFontSize = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: HandlerConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: rootFontSizeTitle,
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        const {
          rootScaleScheme: { minViewportW, maxViewportW },
          baseFontSize
        } = formatArgs.options.designData || {};

        const prefix = formatArgs.options.prefix ? `${formatArgs.options.prefix}-` : '';

        const variants = [
          // from 0 up to min breakpoint
          {
            media: `(max-width: ${minViewportW - 1}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${minViewportW});`
              }
            ]
          },
          // from min breakpoint up to max breakpoint
          {
            media: `(min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`
              }
            ]
          },
          // scalable from max breakpoint up to ∞
          {
            media: `(min-width: ${maxViewportW + 1}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`
              },
              {
                name: 'html.presentation-mode',
                code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${maxViewportW});`
              }
            ]
          }
        ];

        variants.forEach(({ media, wrappers }, index) => {
          output.push(`@media all and ${media} {`);
          wrappers.forEach(({ name, code }, index) => {
            output.push(
              wrapper({ name, code, indent: tab() }) + (index < wrappers.length - 1 ? '\n' : '')
            );
          });
          output.push(`}${index < variants.length - 1 ? '\n' : ''}`);
        });
      }
    })
  );
};

// This is the function that returns the formatter for the root font size tokens.
// It is used to generate the separate file with these tokens.
export const getRootFontSizeFormatter: () => Format = () => ({
  name: getFormatterName(CustomFormatterCategory.CSS, 'root-font-size'),
  format: async function (formatArgs: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader(rootFontSizeTitle));

    // Handle the root font size
    await outputRootFontSize(output, formatArgs, { noChapterTitle: true });

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// This is the function that wraps a code block in a given CSS selector.
export const wrapper = ({ name = ':root', code, indent = '' }: WrapperParams): string =>
  `${indent}${name} {\n${code}\n${indent}}`;

// This is the function that defines the list of custom properties.
export const definer = ({ tokens, indent = '  ' }: DefinerParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

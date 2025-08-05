import { FormatFnArguments } from 'style-dictionary/types';
import {
  CssCustomPlatformFileType,
  CustomFormatterCategory,
  OutputConfig
} from '../../../types/index.js';
import { getFileOutput, tab } from '../../../utils/formats.utils.js';
import { toCamelCase, toSpaceCase } from '../../../utils/strings.utils.js';

// This function outputs the root font size definition
export const outputRootScaler = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: OutputConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: toSpaceCase(toCamelCase(CssCustomPlatformFileType.ROOT_SCALER)),
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        const {
          rootScaler: { minViewportW, maxViewportW },
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

import { FormatFnArguments } from 'style-dictionary/types';
import { CustomFormatterCategory, HandlerConfig } from '../../../types/index.js';
import { getFileOutput, tab } from '../../../utils/formats.utils.js';

export const rootHandler = (
  name: string,
  formatArgs: FormatFnArguments,
  config: HandlerConfig
): Promise<string> =>
  getFileOutput({
    name,
    category: CustomFormatterCategory.CSS,
    config,
    parser: (output, wrapper) => {
      const {
        rootScaleScheme: { minViewportW, maxViewportW },
        baseFontSize
      } = formatArgs?.options || {};

      const prefix = config?.prefix ? `${config.prefix}-` : '';

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
        wrappers.forEach(({ name, code }) => {
          output.push(wrapper({ name, code, indent: tab() }));
        });
        output.push(`}${index < variants.length - 1 ? '\n' : ''}`);
      });
    }
  });

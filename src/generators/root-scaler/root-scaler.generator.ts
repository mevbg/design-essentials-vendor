/* =================================================== */
/* ROOT SCALER → GENERATOR */
/* =================================================== */

import { GeneratorFn, RootScalerGeneratorParams } from '../../types/index.js';
import { cssSelectorBlock, tab } from '../../utils/formats.utils.js';
import { cssGenerator } from '../../utils/generators.utils.js';
//
// ---------------------------------------------------
// GENERATOR FUNCTION

// This function outputs the root font size definition
export const rootScalerGenerator: GeneratorFn<RootScalerGeneratorParams> = (params) =>
  cssGenerator<RootScalerGeneratorParams>('rootScaler', params, (output, config) => {
    const { minViewportW, maxViewportW, baseFontSize } =
      config as Required<RootScalerGeneratorParams>;
    const prefix = config.prefix ? `${config.prefix}-` : '';

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

    variants.forEach(({ media, wrappers }) => {
      output.push(`@media all and ${media} {`);
      wrappers.forEach(({ name = ':root', code }, index) => {
        output.push(
          cssSelectorBlock({ name, code, indent: tab() }) +
            (index < wrappers.length - 1 ? '\n' : '')
        );
      });
      output.push(`}\n`);
    });

    return `${output.join('\n')}\n`;
  });

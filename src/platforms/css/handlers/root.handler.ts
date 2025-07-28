import { FormatFnArguments } from 'style-dictionary/types';
import { HandlerConfig } from '../../../types/index.js';
import { tab, wrapInFileChapter } from '../../../utils/formats.utils.js';
import { wrapInCssSelector } from '../css.utils.js';

export default (name: string, formatArgs: FormatFnArguments, config: HandlerConfig): string => {
  // Define the output array
  const output: string[] = [];

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
      output.push(wrapInCssSelector({ name, code, indent: tab() }));
    });
    output.push(`}${index < variants.length - 1 ? '\n' : ''}`);
  });

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

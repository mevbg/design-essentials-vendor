import { TokenTypeHandlerParams } from '../../../types/index.js';
import { tab, wrapInFileChapter } from '../../../utils/formats.utils.js';
import { wrapInCssRoot, wrapInCssSelector } from '../css.utils.js';

export default (name: string, { options, config }: TokenTypeHandlerParams): string => {
  // Define the output array
  const output: string[] = [];

  const {
    rootScaleScheme: { minViewportW, maxViewportW },
    baseFontSize
  } = options || {};

  const prefix = config?.prefix ? `${config.prefix}-` : '';

  // from 0 up to min breakpoint
  output.push(`@media all and (max-width: ${minViewportW - 1}px) {`);
  output.push(
    wrapInCssRoot({
      code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${minViewportW});`,
      indent: tab()
    })
  );
  output.push('}\n');

  // from min breakpoint up to max breakpoint
  output.push(`@media all and (min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px) {`);
  output.push(
    wrapInCssRoot({
      code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`,
      indent: tab()
    })
  );
  output.push('}\n');

  // scalable from max breakpoint up to ∞
  output.push(`@media all and (min-width: ${maxViewportW + 1}px) {`);
  output.push(
    wrapInCssRoot({
      code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`,
      indent: tab()
    }) + '\n'
  );
  output.push(
    wrapInCssSelector({
      name: 'html.presentation-mode',
      code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${maxViewportW});`,
      indent: tab()
    })
  );
  output.push('}');

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

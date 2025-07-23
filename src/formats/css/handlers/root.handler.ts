import { TokenTypeHandlerParams } from '../../../types';
import { defineSection, tab } from '../../../utils';
import { wrapInRoot, wrapInSelector } from '../utils';

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
    wrapInRoot(
      `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${minViewportW});`,
      tab()
    )
  );
  output.push('}\n');

  // from min breakpoint up to max breakpoint
  output.push(`@media all and (min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px) {`);
  output.push(
    wrapInRoot(
      `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`,
      tab()
    )
  );
  output.push('}\n');

  // scalable from max breakpoint up to ∞
  output.push(`@media all and (min-width: ${maxViewportW + 1}px) {`);
  output.push(
    wrapInRoot(
      `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`,
      tab()
    ) + '\n'
  );
  output.push(
    wrapInSelector(
      'html.presentation-mode',
      `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${maxViewportW});`,
      tab()
    )
  );
  output.push('}');

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

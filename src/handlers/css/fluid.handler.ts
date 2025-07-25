import { defineCssCustomProperties, wrapInCssRoot } from '../../formats/css/utils.js';
import { TokenTypeHandlerParams } from '../../types/index.js';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndFixedTokens
} from '../../utils/fluid-token.utils.js';
import { tab, wrapInFileChapter } from '../../utils/format.utils.js';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Separate fluid and regular tokens
  const { fluidTokens, fixedTokens } = separateFluidAndFixedTokens(tokens);

  // Print out regular tokens (if any)
  if (fixedTokens.length) {
    output.push(wrapInCssRoot({ code: defineCssCustomProperties({ tokens: fixedTokens }) }) + '\n');
  }

  // Get the fluid scale scheme, the base font size and the viewport sizes
  const { fluidScaleScheme, baseFontSize } = options || {};
  const { minViewportW, maxViewportW } = fluidScaleScheme;

  // min
  output.push(`@media all and (max-width: ${minViewportW - 1}px) {`);
  output.push(
    wrapInCssRoot({
      code: defineCssCustomProperties({
        tokens: mapFluidTokenValuesToMin(fluidTokens),
        indent: tab(2)
      }),
      indent: tab()
    })
  );
  output.push('}\n');

  // calc
  output.push(`@media all and (min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px) {`);
  output.push(
    wrapInCssRoot({
      code: defineCssCustomProperties({
        tokens: mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme),
        indent: tab(2)
      }),
      indent: tab()
    })
  );
  output.push('}\n');

  // max
  output.push(`@media all and (min-width: ${maxViewportW + 1}px) {`);
  output.push(
    wrapInCssRoot({
      code: defineCssCustomProperties({
        tokens: mapFluidTokenValuesToMax(fluidTokens),
        indent: tab(2)
      }),
      indent: tab()
    })
  );
  output.push('}');

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

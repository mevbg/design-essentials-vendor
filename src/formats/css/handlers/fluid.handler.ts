import { TokenTypeHandlerParams } from '../../../types';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndFixedTokens
} from '../../../utils/fluid-tokens.utils';
import { tab, wrapInFileChapter } from '../../../utils/formats.utils';
import { defineCssCustomProperties, wrapInCssRoot } from '../utils';

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
    output.push(wrapInCssRoot(defineCssCustomProperties(fixedTokens)) + '\n');
  }

  // Get the fluid scale scheme, the base font size and the viewport sizes
  const { fluidScaleScheme, baseFontSize } = options || {};
  const { minViewportW, maxViewportW } = fluidScaleScheme;

  // min
  output.push(`@media all and (max-width: ${minViewportW - 1}px) {`);
  output.push(
    wrapInCssRoot(defineCssCustomProperties(mapFluidTokenValuesToMin(fluidTokens), tab(2)), tab())
  );
  output.push('}\n');

  // calc
  output.push(`@media all and (min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px) {`);
  output.push(
    wrapInCssRoot(
      defineCssCustomProperties(
        mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme),
        tab(2)
      ),
      tab()
    )
  );
  output.push('}\n');

  // max
  output.push(`@media all and (min-width: ${maxViewportW + 1}px) {`);
  output.push(
    wrapInCssRoot(defineCssCustomProperties(mapFluidTokenValuesToMax(fluidTokens), tab(2)), tab())
  );
  output.push('}');

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

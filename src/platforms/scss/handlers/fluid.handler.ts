import { TokenTypeHandlerParams } from '../../../types/index.js';
import { wrapInFileChapter } from '../../../utils/formats.utils.js';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndFixedTokens
} from '../../../utils/tokens/fluid-tokens.utils.js';
import { defineSassMapValues, wrapInSassMap } from '../scss.utils.js';

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
    output.push(wrapInSassMap({ name, code: defineSassMapValues({ tokens: fixedTokens }) }) + '\n');
  }

  // Get the fluid scale scheme and base font size
  const { fluidScaleScheme, baseFontSize } = options || {};

  // min
  output.push(
    wrapInSassMap({
      name: name + '-min',
      code: defineSassMapValues({ tokens: mapFluidTokenValuesToMin(fluidTokens) })
    }) + '\n'
  );

  // calc
  output.push(
    wrapInSassMap({
      name: name + '-fluid',
      code: defineSassMapValues({
        tokens: mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme)
      })
    }) + '\n'
  );

  // max
  output.push(
    wrapInSassMap({
      name: name + '-max',
      code: defineSassMapValues({ tokens: mapFluidTokenValuesToMax(fluidTokens) })
    })
  );

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

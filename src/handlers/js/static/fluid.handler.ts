import { defineJsObjectItemsWithValues, wrapInJsConst } from '../../../formats/js/utils.js';
import { TokenTypeHandlerParams } from '../../../types/index.js';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndFixedTokens
} from '../../../utils/fluid-token.utils.js';
import { wrapInFileChapter } from '../../../utils/format.utils.js';

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
    output.push(
      wrapInJsConst({
        name,
        code: defineJsObjectItemsWithValues({ tokens: fixedTokens })
      }) + '\n'
    );
  }

  // Get the fluid scale scheme and base font size
  const { fluidScaleScheme, baseFontSize } = options || {};

  // min
  output.push(
    wrapInJsConst({
      name: name + ' Min',
      code: defineJsObjectItemsWithValues({ tokens: mapFluidTokenValuesToMin(fluidTokens) })
    }) + '\n'
  );

  // calc
  output.push(
    wrapInJsConst({
      name: name + ' Fluid',
      code: defineJsObjectItemsWithValues({
        tokens: mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme)
      })
    }) + '\n'
  );

  // max
  output.push(
    wrapInJsConst({
      name: name + ' Max',
      code: defineJsObjectItemsWithValues({ tokens: mapFluidTokenValuesToMax(fluidTokens) })
    })
  );

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

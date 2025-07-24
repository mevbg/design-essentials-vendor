import { FormatHandler, TokenTypeHandlerParams } from '../../../../types';
import {
  mapFluidTokenValuesToMax,
  mapFluidTokenValuesToMin,
  mapFluidTokenValuesToResponsive,
  separateFluidAndFixedTokens
} from '../../../../utils/fluid-tokens.utils';
import { wrapInFileChapter } from '../../../../utils/formats.utils';
import { defineJsObjectItemsWithValues, wrapInJsConst } from '../../utils';

const fluidHandler: FormatHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Separate fluid and regular tokens
  const { fluidTokens, fixedTokens } = separateFluidAndFixedTokens(tokens);

  // Print out regular tokens (if any)
  if (fixedTokens.length) {
    output.push(wrapInJsConst(name, defineJsObjectItemsWithValues(fixedTokens)) + '\n');
  }

  // Get the fluid scale scheme and base font size
  const { fluidScaleScheme, baseFontSize } = options || {};

  // min
  output.push(
    wrapInJsConst(
      name + ' Min',
      defineJsObjectItemsWithValues(mapFluidTokenValuesToMin(fluidTokens))
    ) + '\n'
  );

  // calc
  output.push(
    wrapInJsConst(
      name + ' Fluid',
      defineJsObjectItemsWithValues(
        mapFluidTokenValuesToResponsive(fluidTokens, baseFontSize, fluidScaleScheme)
      )
    ) + '\n'
  );

  // max
  output.push(
    wrapInJsConst(
      name + ' Max',
      defineJsObjectItemsWithValues(mapFluidTokenValuesToMax(fluidTokens))
    )
  );

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

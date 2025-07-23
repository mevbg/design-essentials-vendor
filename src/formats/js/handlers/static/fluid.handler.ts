import { TokenTypeHandlerParams } from '../../../../types';
import {
  defineSection,
  mapFluidTokensToCalcTokens,
  mapFluidTokensToMaxTokens,
  mapFluidTokensToMinTokens,
  separateFluidTokens
} from '../../../../utils';
import { defineObjectItemsWithValues, wrapInConst } from '../../utils';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Separate fluid and regular tokens
  const { fluidTokens, regularTokens } = separateFluidTokens(tokens);

  // Print out regular tokens (if any)
  if (regularTokens.length) {
    output.push(wrapInConst(name, defineObjectItemsWithValues(regularTokens)) + '\n');
  }

  // Get the fluid scale scheme and base font size
  const { fluidScaleScheme, baseFontSize } = options || {};

  // min
  output.push(
    wrapInConst(
      name + ' Min',
      defineObjectItemsWithValues(mapFluidTokensToMinTokens(fluidTokens))
    ) + '\n'
  );

  // calc
  output.push(
    wrapInConst(
      name + ' Fluid',
      defineObjectItemsWithValues(
        mapFluidTokensToCalcTokens(fluidTokens, baseFontSize, fluidScaleScheme)
      )
    ) + '\n'
  );

  // max
  output.push(
    wrapInConst(name + ' Max', defineObjectItemsWithValues(mapFluidTokensToMaxTokens(fluidTokens)))
  );

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default fluidHandler;

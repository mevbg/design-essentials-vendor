import { TokenTypeHandlerParams } from '../../../types';
import {
  defineSection,
  mapFluidTokensToCalcTokens,
  mapFluidTokensToMaxTokens,
  mapFluidTokensToMinTokens,
  separateFluidTokens
} from '../../../utils';
import { defineMapValues, wrapInMap } from '../utils';

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
    output.push(wrapInMap(name, defineMapValues(regularTokens)) + '\n');
  }

  // Get the fluid scale scheme and base font size
  const { fluidScaleScheme, baseFontSize } = options || {};

  // min
  output.push(
    wrapInMap(name + '-min', defineMapValues(mapFluidTokensToMinTokens(fluidTokens))) + '\n'
  );

  // calc
  output.push(
    wrapInMap(
      name + '-fluid',
      defineMapValues(mapFluidTokensToCalcTokens(fluidTokens, baseFontSize, fluidScaleScheme))
    ) + '\n'
  );

  // max
  output.push(wrapInMap(name + '-max', defineMapValues(mapFluidTokensToMaxTokens(fluidTokens))));

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default fluidHandler;

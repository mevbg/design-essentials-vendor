import { TokenTypeHandlerParams } from '../../../../types';
import { defineSection } from '../../../../utils';
import { defineObjectItemsWithVariables, wrapInConst } from '../../utils';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Print out all the tokens
  output.push(wrapInConst(name, defineObjectItemsWithVariables(tokens, options?.prefix)));

  // Return the output
  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default fluidHandler;

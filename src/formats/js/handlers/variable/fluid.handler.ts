import { TokenTypeHandlerParams } from '../../../../types/index.js';
import { wrapInFileChapter } from '../../../../utils/formats.utils.js';
import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../utils.js';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Print out all the tokens
  output.push(wrapInJsConst(name, defineJsObjectItemsWithVariables(tokens, options?.prefix)));

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

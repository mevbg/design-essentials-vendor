import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../../formats/js/utils.js';
import { TokenTypeHandlerParams } from '../../../types/index.js';
import { wrapInFileChapter } from '../../../utils/format.utils.js';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];

  // Print out all the tokens
  output.push(
    wrapInJsConst({
      name,
      code: defineJsObjectItemsWithVariables({ tokens, options })
    })
  );

  // Return the output
  return wrapInFileChapter(name, output.join('\n'), config?.noChapterTitle);
};

export default fluidHandler;

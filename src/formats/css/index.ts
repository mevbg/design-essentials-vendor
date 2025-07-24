import { FormatFnArguments } from 'style-dictionary/types';
import { FormatBuilder, TokenTypeHandlerParams } from '../../types';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  fileHeader,
  getCoreTokenHandlers
} from '../../utils/formats.utils';
import basicHandler from './handlers/basic.handler';
import rootHandler from './handlers/root.handler';

const coreTokenHandlers = getCoreTokenHandlers('css');
const rootFontSizeTitle = 'Root Font Size';

const outputRootFontSize = (output: string[], { options, platform }: FormatFnArguments) => {
  output.push(
    rootHandler(rootFontSizeTitle, {
      options,
      config: { prefix: platform?.prefix }
    } as TokenTypeHandlerParams)
  );
};

export const cssRootFontSizeFormatter: FormatBuilder = () => ({
  name: 'mev/css/root-font-size',
  format: function (formatArgs: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader(rootFontSizeTitle));

    // Handle the root font size
    outputRootFontSize(output, formatArgs);

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// Formatter for all tokens
export const cssAllFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/css/all',
  fileHeaderTitle: 'CSS Custom Properties',
  prefix: outputRootFontSize,
  coreTokenHandlers,
  basicHandler
});

// Formatter for tokens with a core handler
export const cssCoreFormatter: FormatBuilder = coreFormatterTemplate({
  name: 'mev/css/core',
  coreTokenHandlers
});

import { FormatFnArguments } from 'style-dictionary/types';
import { CustomFormatter, FormatBuilder, TokenTypeHandlerParams } from '../../types/index.js';
import { PlatformName } from '../../types/platform.types.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  fileHeader,
  getCoreTokenHandlers,
  getFormatterName
} from '../../utils/format.utils.js';
import basicHandler from './handlers/basic.handler.js';
import rootHandler from './handlers/root.handler.js';

const platform: PlatformName = 'css';
const coreTokenHandlers = getCoreTokenHandlers(CustomFormatter.CSS);
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
  name: getFormatterName(platform, 'root-font-size'),
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
  platform,
  name: 'all',
  fileHeaderTitle: 'CSS Custom Properties',
  prefix: outputRootFontSize,
  coreTokenHandlers,
  basicHandler
});

// Formatter for tokens with a core handler
export const cssCoreFormatter: FormatBuilder = coreFormatterTemplate({
  platform,
  name: 'core',
  coreTokenHandlers
});

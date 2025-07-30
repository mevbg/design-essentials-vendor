import { Format, FormatFnArguments } from 'style-dictionary/types';
import { CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  fileHeader,
  getFormatterName,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';
import { rootHandler } from './handlers/root.handler.js';

const rootFontSizeTitle = 'Root Font Size';

const outputRootFontSize = async (output: string[], formatArgs: FormatFnArguments) => {
  output.push(
    await rootHandler(rootFontSizeTitle, formatArgs, { prefix: formatArgs?.platform?.prefix })
  );
};

export const cssFormatters: Format[] = [
  // Root font size formatter
  {
    name: getFormatterName(CustomFormatterCategory.CSS, 'root-font-size'),
    format: async function (formatArgs: FormatFnArguments) {
      // Define the output array
      const output: string[] = [];

      // Add header to the output array
      output.push(fileHeader(rootFontSizeTitle));

      // Handle the root font size
      await outputRootFontSize(output, formatArgs);

      // Join the output array into a string and return it
      return output.join('\n');
    }
  },
  ...[
    // Formatter for all tokens
    {
      name: 'all',
      fileHeaderTitle: 'CSS Custom Properties',
      getFormatter: allFormatterTemplate,
      prefixOutput: outputRootFontSize
    },
    // Formatter for tokens with a core handler
    {
      name: 'core',
      getFormatter: coreFormatterTemplate
    },
    // Formatter for non-core tokens
    {
      name: 'others',
      getFormatter: othersFormatterTemplate
    }
  ].map(({ name, prefixOutput, fileHeaderTitle = '', getFormatter }) =>
    getFormatter({
      name,
      fileHeaderTitle,
      prefixOutput,
      category: CustomFormatterCategory.CSS
    })
  )
];

import { FormatFnArguments } from 'style-dictionary/types';
import { CustomFormatterCategory, FormatBuilder } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  fileHeader,
  getFormatterName
} from '../../utils/formats.utils.js';
import { defineCssCustomProperties, wrapInCssSelector } from './css.utils.js';
import rootHandler from './handlers/root.handler.js';

const rootFontSizeTitle = 'Root Font Size';

const outputRootFontSize = (output: string[], formatArgs: FormatFnArguments) => {
  output.push(rootHandler(rootFontSizeTitle, formatArgs, { prefix: formatArgs?.platform?.prefix }));
};

export const cssFormatters: FormatBuilder[] = [
  // Root font size formatter
  () => ({
    name: getFormatterName(CustomFormatterCategory.CSS, 'root-font-size'),
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
  }),
  ...[
    // Formatter for all tokens
    {
      name: 'all',
      fileHeaderTitle: 'CSS Custom Properties',
      getFormatBuilder: allFormatterTemplate,
      prefixOutput: outputRootFontSize
    },
    // Formatter for tokens with a core handler
    {
      name: 'core',
      getFormatBuilder: coreFormatterTemplate
    }
  ].map(({ name, prefixOutput, fileHeaderTitle = '', getFormatBuilder }) =>
    getFormatBuilder({
      name,
      fileHeaderTitle,
      prefixOutput,
      category: CustomFormatterCategory.CSS,
      wrapper: wrapInCssSelector,
      definer: defineCssCustomProperties
    })
  )
];

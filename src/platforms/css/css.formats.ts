import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';
import { getRootFontSizeFormatter, outputRootFontSize } from './css.utils.js';

export const cssFormatters: Format[] = [
  ...Object.entries({
    all: allFormatterTemplate, // Formatter for all tokens
    core: coreFormatterTemplate, // Formatter for tokens with a core handler
    others: othersFormatterTemplate // Formatter for non-core tokens
  }).map(([name, getFormatter]) =>
    getFormatter({
      name,
      // prefixOutput is only used for the "all" formatter so to include the root font size tokens in the output
      prefixOutput: name === 'all' ? outputRootFontSize : undefined,
      category: CustomFormatterCategory.CSS
    })
  ),

  // An individual formatter for the root font size tokens
  // so to have them in a separate file as well
  getRootFontSizeFormatter()
];

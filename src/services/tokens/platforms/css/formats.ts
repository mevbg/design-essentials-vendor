import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';

// This is the list of formatters for the CSS platform.
export const cssFormatters: Format[] = [
  ...Object.entries({
    // Formatter for all tokens
    all: allFormatterTemplate,

    // Formatter for tokens with a core handler
    core: coreFormatterTemplate,

    // Formatter for non-core tokens
    others: othersFormatterTemplate
  }).map(([name, getFormatter]) =>
    getFormatter({
      name,
      category: CustomFormatterCategory.CSS
    })
  )
];

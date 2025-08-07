/* =================================================== */
/* TOKENS → PLATFORMS → SCSS → FORMATS */
/* =================================================== */

import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory, FormatterTemplateFn } from '../../tokens.types.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';

// This is the list of formatters for the SCSS platform.
export const scssFormatters: Format[] = Object.entries({
  all: allFormatterTemplate, // Formatter for all tokens
  core: coreFormatterTemplate, // Formatter for core tokens
  others: othersFormatterTemplate // Formatter for non-core tokens
}).map(([name, getFormatter]: [string, FormatterTemplateFn]) =>
  getFormatter({
    name,
    category: CustomFormatterCategory.SCSS
  })
);

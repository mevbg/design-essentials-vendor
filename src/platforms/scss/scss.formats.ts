import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';

export const scssFormatters: Format[] = Object.entries({
  all: allFormatterTemplate, // Formatter for all tokens
  core: coreFormatterTemplate, // Formatter for core tokens
  others: othersFormatterTemplate // Formatter for non-core tokens
}).map(([name, getFormatter]) =>
  getFormatter({
    name,
    category: CustomFormatterCategory.SCSS
  })
);

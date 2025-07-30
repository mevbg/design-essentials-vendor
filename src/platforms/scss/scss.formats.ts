import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';

export const scssFormatters: Format[] = [
  // Formatter for all tokens
  {
    name: 'all',
    getFormatter: allFormatterTemplate
  },
  // Formatter for core tokens
  {
    name: 'core',
    getFormatter: coreFormatterTemplate
  },
  // Formatter for non-core tokens
  {
    name: 'others',
    getFormatter: othersFormatterTemplate
  }
].map(({ name, getFormatter }) =>
  getFormatter({
    name,
    category: CustomFormatterCategory.SCSS
  })
);

import { CustomFormatterCategory, FormatBuilder } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';

export const scssFormatters: FormatBuilder[] = [
  // Formatter for all tokens
  {
    name: 'all',
    fileHeaderTitle: 'SCSS Tokens',
    getFormatBuilder: allFormatterTemplate
  },
  // Formatter for core tokens
  {
    name: 'core',
    getFormatBuilder: coreFormatterTemplate
  },
  // Formatter for non-core tokens
  {
    name: 'others',
    getFormatBuilder: othersFormatterTemplate
  }
].map(({ name, fileHeaderTitle = '', getFormatBuilder }) =>
  getFormatBuilder({
    name,
    fileHeaderTitle,
    category: CustomFormatterCategory.SCSS
  })
);

import { CustomFormatterCategory, FormatBuilder } from '../../types/index.js';
import { allFormatterTemplate, coreFormatterTemplate } from '../../utils/formats.utils.js';
import { defineSassMapValues, wrapInSassMap } from './scss.utils.js';

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
  }
].map(({ name, fileHeaderTitle = '', getFormatBuilder }) =>
  getFormatBuilder({
    name,
    fileHeaderTitle,
    category: CustomFormatterCategory.SCSS,
    wrapper: wrapInSassMap,
    definer: defineSassMapValues
  })
);

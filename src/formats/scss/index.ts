import { CustomFormatter, FormatBuilder } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  getCoreTokenHandlers
} from '../../utils/formats.utils.js';
import basicHandler from './handlers/basic.handler.js';

const coreTokenHandlers = getCoreTokenHandlers(CustomFormatter.SCSS);

// Formatter for all tokens
export const scssAllFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/scss/all',
  fileHeaderTitle: 'SCSS Tokens',
  coreTokenHandlers,
  basicHandler
});

// Formatter for tokens with a core handler
export const scssCoreFormatter: FormatBuilder = coreFormatterTemplate({
  name: 'mev/scss/core',
  coreTokenHandlers
});

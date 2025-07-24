import { FormatBuilder } from '../../types';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  getCoreTokenHandlers
} from '../../utils/formats.utils';
import basicHandler from './handlers/basic.handler';

const coreTokenHandlers = getCoreTokenHandlers('scss');

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

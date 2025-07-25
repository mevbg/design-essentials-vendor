import { CustomFormatter, FormatBuilder, PlatformName } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  getCoreTokenHandlers
} from '../../utils/format.utils.js';
import basicHandler from './handlers/basic.handler.js';

const platform: PlatformName = 'scss';
const coreTokenHandlers = getCoreTokenHandlers(CustomFormatter.SCSS);

// Formatter for all tokens
export const scssAllFormatter: FormatBuilder = allFormatterTemplate({
  platform,
  name: 'all',
  fileHeaderTitle: 'SCSS Tokens',
  coreTokenHandlers,
  basicHandler
});

// Formatter for tokens with a core handler
export const scssCoreFormatter: FormatBuilder = coreFormatterTemplate({
  platform,
  name: 'core',
  coreTokenHandlers
});

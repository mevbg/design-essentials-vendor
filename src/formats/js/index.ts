import { FormatBuilder } from '../../types/index.js';
import { allFormatterTemplate, getCoreTokenHandlers } from '../../utils/formats.utils.js';
import basicStaticHandler from './handlers/static/basic.handler.js';
import basicVariableHandler from './handlers/variable/basic.handler.js';

export const staticFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/js/static',
  fileHeaderTitle: 'JS Tokens (static values)',
  coreTokenHandlers: getCoreTokenHandlers('js', 'static'),
  basicHandler: basicStaticHandler
});

export const variableFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/js/variable',
  fileHeaderTitle: 'JS Tokens (variable values)',
  coreTokenHandlers: getCoreTokenHandlers('js', 'variable'),
  basicHandler: basicVariableHandler
});

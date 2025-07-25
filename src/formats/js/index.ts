import { CustomFormatter, FormatBuilder, JsFormatterType } from '../../types/index.js';
import { allFormatterTemplate, getCoreTokenHandlers } from '../../utils/formats.utils.js';
import basicStaticHandler from './handlers/static/basic.handler.js';
import basicVariableHandler from './handlers/variable/basic.handler.js';

export const staticFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/js/static',
  fileHeaderTitle: 'JS Tokens (static values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.STATIC),
  basicHandler: basicStaticHandler
});

export const variableFormatter: FormatBuilder = allFormatterTemplate({
  name: 'mev/js/variable',
  fileHeaderTitle: 'JS Tokens (variable values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.VARIABLE),
  basicHandler: basicVariableHandler
});

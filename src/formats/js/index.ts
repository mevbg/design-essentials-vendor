import {
  CustomFormatter,
  FormatBuilder,
  JsFormatterType,
  PlatformName
} from '../../types/index.js';
import { allFormatterTemplate, getCoreTokenHandlers } from '../../utils/format.utils.js';
import basicStaticHandler from './handlers/static/basic.handler.js';
import basicVariableHandler from './handlers/variable/basic.handler.js';

const platform: PlatformName = 'js';

export const staticFormatter: FormatBuilder = allFormatterTemplate({
  platform,
  name: 'static',
  fileHeaderTitle: 'JS Tokens (static values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.STATIC),
  basicHandler: basicStaticHandler
});

export const variableFormatter: FormatBuilder = allFormatterTemplate({
  platform,
  name: 'variable',
  fileHeaderTitle: 'JS Tokens (variable values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.VARIABLE),
  basicHandler: basicVariableHandler
});

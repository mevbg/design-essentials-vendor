import {
  CustomFormatter,
  FormatBuilder,
  JsFormatterType,
  PlatformName
} from '../../types/index.js';
import { allFormatterTemplate, getCoreTokenHandlers } from '../../utils/formats.utils.js';
import jsConfig from './js.config.js';

const platform: PlatformName = 'js';

export const staticFormatter: FormatBuilder = allFormatterTemplate({
  platform,
  name: 'static',
  fileHeaderTitle: 'JS Tokens (static values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.STATIC),
  ...jsConfig.static
});

export const variableFormatter: FormatBuilder = allFormatterTemplate({
  platform,
  name: 'variable',
  fileHeaderTitle: 'JS Tokens (variable values)',
  coreTokenHandlers: getCoreTokenHandlers(CustomFormatter.JS, JsFormatterType.VARIABLE),
  ...jsConfig.variable
});

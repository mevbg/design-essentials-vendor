import { CustomFormatterCategory, FormatBuilder, JsFormatterType } from '../../types/index.js';
import { allFormatterTemplate } from '../../utils/formats.utils.js';

export const jsFormatters: FormatBuilder[] = [
  {
    name: JsFormatterType.STATIC,
    type: JsFormatterType.STATIC,
    fileHeaderTitle: 'JS Tokens (static values)'
  },
  {
    name: JsFormatterType.VARIABLE,
    type: JsFormatterType.VARIABLE,
    fileHeaderTitle: 'JS Tokens (variable values)'
  }
].map(({ name, type, fileHeaderTitle }) =>
  allFormatterTemplate({
    name,
    type,
    fileHeaderTitle,
    category: CustomFormatterCategory.JS
  })
);

import { CustomFormatterCategory, FormatBuilder, JsFormatterType } from '../../types/index.js';
import { allFormatterTemplate } from '../../utils/formats.utils.js';

export const jsFormatters: FormatBuilder[] = [JsFormatterType.STATIC, JsFormatterType.VARIABLE].map(
  (item) =>
    allFormatterTemplate({
      name: item,
      type: item,
      fileHeaderTitle: `JS Tokens (${item} values)`,
      category: CustomFormatterCategory.JS
    })
);

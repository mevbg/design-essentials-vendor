import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory, JsFormatterType } from '../../types/index.js';
import { allFormatterTemplate } from '../../utils/formats.utils.js';

export const jsFormatters: Format[] = [JsFormatterType.STATIC, JsFormatterType.VARIABLE].map(
  (item) =>
    allFormatterTemplate({
      name: item,
      type: item,
      fileHeaderTitle: `JS Tokens (${item} values)`,
      category: CustomFormatterCategory.JS
    })
);

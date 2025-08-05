import { Format } from 'style-dictionary/types';
import { CustomFormatterCategory, JsCustomFormatterType } from '../../types/index.js';
import { allFormatterTemplate } from '../../utils/formats.utils.js';

// This is the list of formatters for the JS platform.
export const jsFormatters: Format[] = [
  JsCustomFormatterType.STATIC,
  JsCustomFormatterType.VARIABLE
].map((item) =>
  allFormatterTemplate({
    name: item,
    type: item,
    category: CustomFormatterCategory.JS
  })
);

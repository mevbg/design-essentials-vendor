import { Format } from 'style-dictionary/types';
import { CssCustomPlatformFileType, CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  customFormatterTemplate,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';
import {
  outputFontFaces,
  outputIconography,
  outputRootFontSize,
  outputScrollbar
} from './parsers/index.js';

// This is the list of formatters for the CSS platform.
export const cssFormatters: Format[] = [
  ...Object.entries({
    // Formatter for all tokens
    all: allFormatterTemplate,

    // Formatter for tokens with a core handler
    core: coreFormatterTemplate,

    // Formatter for non-core tokens
    others: othersFormatterTemplate
  }).map(([name, getFormatter]) =>
    getFormatter({
      name,
      category: CustomFormatterCategory.CSS
    })
  ),

  ...Object.entries({
    // An individual formatter for the root font size definition
    // so to have it in a separate file
    [CssCustomPlatformFileType.ROOT_FONT_SIZE]: outputRootFontSize,

    // An individual formatter for the font face definitions
    // so to have them in a separate file
    [CssCustomPlatformFileType.FONT_FACES]: outputFontFaces,

    // An individual formatter for the iconography definitions
    // so to have them in a separate file
    [CssCustomPlatformFileType.ICONOGRAPHY]: outputIconography,

    // An individual formatter for the scrollbar styles
    // so to have them in a separate file
    [CssCustomPlatformFileType.SCROLLBAR]: outputScrollbar
  }).map(([name, customOutputHandler]) =>
    customFormatterTemplate({
      name,
      category: CustomFormatterCategory.CSS,
      customOutputHandler
    })
  )
];

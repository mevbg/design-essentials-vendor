import { Format, FormatFnArguments } from 'style-dictionary/types';
import { CssCustomPlatformFileType, CustomFormatterCategory } from '../../types/index.js';
import {
  allFormatterTemplate,
  coreFormatterTemplate,
  fileHeader,
  getFormatterName,
  othersFormatterTemplate
} from '../../utils/formats.utils.js';
import { outputFontFaces, outputRootFontSize } from './utils.js';

// This function returns the formatter for the root font size.
// It is used to generate the separate file with this definition.
const getRootFontSizeFormatter: () => Format = () => ({
  name: getFormatterName(CustomFormatterCategory.CSS, CssCustomPlatformFileType.ROOT_FONT_SIZE),
  format: async function (formatArgs: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader('Root Font Size'));

    // Handle the root font size
    await outputRootFontSize(output, formatArgs, { noChapterTitle: true });

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// This function returns the formatter for the font faces.
// It is used to generate the separate file with this definition.
const getFontFacesFormatter: () => Format = () => ({
  name: getFormatterName(CustomFormatterCategory.CSS, CssCustomPlatformFileType.FONT_FACES),
  format: async function (formatArgs: FormatFnArguments) {
    if (!formatArgs.options.designConfig.fontsPath) return;

    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader('Font Faces'));

    // Handle the font faces
    await outputFontFaces(output, formatArgs, { noChapterTitle: true });

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// This is the list of formatters for the CSS platform.
export const cssFormatters: Format[] = [
  ...Object.entries({
    all: allFormatterTemplate, // Formatter for all tokens
    core: coreFormatterTemplate, // Formatter for tokens with a core handler
    others: othersFormatterTemplate // Formatter for non-core tokens
  }).map(([name, getFormatter]) =>
    getFormatter({
      name,
      category: CustomFormatterCategory.CSS
    })
  ),

  // An individual formatter for the root font size tokens
  // so to have them in a separate file as well
  getRootFontSizeFormatter(),

  // An individual formatter for the font faces
  // so to have them in a separate file as well
  getFontFacesFormatter()
];

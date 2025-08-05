/* =================================================== */
/* FONT FACES → PARSER */
/* =================================================== */

import fs from 'fs';
import path from 'path';
import { FormatFnArguments } from 'style-dictionary/types';
import { FontFace, FontFacesConfig, ServiceParams } from '../../types/index.js';
import { cssSelectorBlock, tab } from '../../utils/formats.utils.js';

// This function scans the given fonts directory for any available typefaces
// and returns an array of typefaces with their weights and files
function getTypefaces(dir: string): { name: string; weights: Record<string, string[]> }[] {
  const fonts: { name: string; weights: Record<string, string[]> }[] = [];

  try {
    // Read all directories in fonts folder
    const fontFolders = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    fontFolders.forEach((folderName) => {
      const folderPath = path.join(dir, folderName);
      const fontFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith('.woff2'))
        .sort();

      // Group files by weight/style
      const weights: Record<string, string[]> = {};

      fontFiles.forEach((file) => {
        // Extract weight/style from filename
        const fileName = path.parse(file).name; // Remove .woff2 extension
        const baseName = fileName.replace(folderName + '-', ''); // Remove font name prefix

        // Handle different naming patterns
        let weight;

        if (baseName.includes('Italic')) {
          weight = baseName.replace('Italic', '');
        } else {
          weight = baseName;
        }

        // Create key for this weight/style combination
        const key = weight;

        if (!weights[key]) {
          weights[key] = [];
        }

        weights[key].push(file);
      });

      fonts.push({
        name: folderName,
        weights
      });
    });

    return fonts;
  } catch (error) {
    console.error('Error scanning fonts directory:', error);
    return [];
  }
}

// This function prepares the array
// of all available font faces that should be in the output
function getFontFaces(fontsPath: string, formatArgs: FormatFnArguments): FontFace[] {
  const { fontWeight: fontWeightTokens } = formatArgs.dictionary.tokens;

  // if no fontsPath or font weight tokens are available at all,
  // do nothing and exit
  if (!fontsPath || !fontWeightTokens) {
    return [];
  }

  const fontFaces: FontFace[] = [];
  const typefaces = getTypefaces(fontsPath);
  typefaces.forEach((typeface) => {
    const { name: typefaceName, weights: typefaceWeights } = typeface;
    const typefaceFontWeightTokens = Object.keys(fontWeightTokens)
      .map((typefaceName) => typefaceName.toLowerCase())
      .includes(typefaceName.toLowerCase())
      ? fontWeightTokens[typefaceName.toLowerCase()]
      : null;

    // if no predefined font weight tokens for the given typeface are available
    // and yet multiple typeface weights are detected,
    // do nothing and exit as we cannot determine the correct font weight
    if (!typefaceFontWeightTokens && Object.keys(typefaceWeights).length > 1) {
      return;
    }

    // Collect and filter the available and needed font faces that should be in the output
    Object.entries(typefaceWeights)
      .filter((weight) => weight[1].every((file) => file.includes('.woff2')))
      .forEach(([weightName, files]) => {
        const fontWeight = !typefaceFontWeightTokens
          ? 400
          : typefaceFontWeightTokens[weightName.toLowerCase()]?.$value;

        if (fontWeight) {
          files.forEach((file) => {
            fontFaces.push({
              'font-family': typefaceName,
              'font-style': file.includes('Italic') ? 'italic' : 'normal',
              'font-weight': fontWeight,
              src: `url('../../../${path.join(`${fontsPath}/${typefaceName}`, file)}') format('woff2')`
            });
          });
        }
      });
  });

  return fontFaces || [];
}

// This function outputs the font faces (if such)
export const outputFontFaces = (
  output: string[],
  params: ServiceParams<FontFacesConfig>,
  formatArgs?: FormatFnArguments
) => {
  // conditions:
  // • only woff2 files, one per font weight is expected
  // • every italic file for a given weight is expected to be named like the regular file with 'Italic' suffix

  const fontFaces: FontFace[] = formatArgs ? getFontFaces(params.path, formatArgs) : [];

  fontFaces.forEach((fontFace) => {
    output.push(
      cssSelectorBlock({
        name: `@font-face`,
        code: Object.entries(fontFace)
          .map(([key, value]) => `${tab()}${key}: ${value};`)
          .join('\n')
      }) + '\n'
    );
  });

  return `${output.join('\n')}\n`;
};

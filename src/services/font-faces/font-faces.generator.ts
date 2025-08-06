/* =================================================== */
/* FONT FACES → GENERATOR */
/* =================================================== */

import fs from 'fs';
import path from 'path';
import { FontFace, FontFacesConfig, ServiceParams } from '../../types/index.js';
import { cssSelectorBlock, tab } from '../../utils/formats.utils.js';
import { cssService } from '../../utils/services.utils.js';

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
function getFontFaces({ fonts, path: fontsPath }: ServiceParams<FontFacesConfig>): FontFace[] {
  const fontFaces: FontFace[] = [];
  const typefaces = getTypefaces(fontsPath);
  typefaces.forEach(({ name: typefaceName, weights: typefaceWeights }) => {
    const typefaceFontWeightTokens = Object.keys(fonts)
      .map((typefaceName) => typefaceName.toLowerCase())
      .includes(typefaceName.toLowerCase())
      ? fonts[typefaceName]
      : null;

    // if no predefined font weight tokens for the given typeface are available
    // and yet multiple typeface weights are detected,
    // do nothing and exit as we cannot determine the correct font weight
    if (!typefaceFontWeightTokens && Object.keys(typefaceWeights).length > 1) {
      return;
    }

    // Collect and filter the available and needed font faces that should be in the output
    const sortedWeights = typefaceFontWeightTokens
      ? Object.fromEntries(
          Object.entries(typefaceWeights).sort(
            ([a], [b]) => typefaceFontWeightTokens[a] - typefaceFontWeightTokens[b]
          )
        )
      : typefaceWeights;
    Object.entries(sortedWeights)
      .filter((weight) => weight[1].every((file) => file.includes('.woff2')))
      .forEach(([weightName, files]) => {
        const fontWeight = !typefaceFontWeightTokens ? 400 : typefaceFontWeightTokens[weightName];

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
export const fontFacesGenerator = (params: ServiceParams<FontFacesConfig>) =>
  cssService<FontFacesConfig>('fontFaces', params, (output, params) => {
    // conditions:
    // • only woff2 files, one per font weight is expected
    // • every italic file for a given weight is expected
    //   to be named like the regular file with 'Italic' suffix
    // • Key names of the weights provided in the fonts object are expected
    //   to be the same as the ones fetched from the filenames,
    //   meaning that if the file name is 'Gotham-XLight.woff2'
    //   then the font weight should be named 'XLight

    const fontFaces: FontFace[] = getFontFaces(params);

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
  });

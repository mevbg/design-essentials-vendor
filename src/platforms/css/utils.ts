import fs from 'fs';
import path from 'path';
import { FormatFnArguments } from 'style-dictionary/types';
import {
  CustomFormatterCategory,
  DefinerParams,
  OutputConfig,
  WrapperParams
} from '../../types/index.js';
import { getFileOutput, tab } from '../../utils/formats.utils.js';

type FontFace = {
  'font-family': string;
  'font-style': string;
  'font-weight': number;
  src: string;
};

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
function getFontFaces(formatArgs: FormatFnArguments): FontFace[] {
  const { fontsPath } = formatArgs.options.designConfig;
  const { fontWeight: fontWeightTokens } = formatArgs.dictionary.tokens;

  // if no fonts path or font weight tokens are available at all,
  // do nothing and exit
  if (!fontsPath || !fontWeightTokens) {
    return [];
  }

  const fontFaces: FontFace[] = [];
  const typefaces = getTypefaces(formatArgs.options.designConfig.fontsPath);
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

// This function outputs the root font size definition.
// It is used to output the root font size definition
// in a separate file as well as in the all tokens file.
export const outputRootFontSize = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: OutputConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: 'Root Font Size',
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        const {
          rootScaleScheme: { minViewportW, maxViewportW },
          baseFontSize
        } = formatArgs.options.designConfig || {};

        const prefix = formatArgs.options.prefix ? `${formatArgs.options.prefix}-` : '';

        const variants = [
          // from 0 up to min breakpoint
          {
            media: `(max-width: ${minViewportW - 1}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${minViewportW});`
              }
            ]
          },
          // from min breakpoint up to max breakpoint
          {
            media: `(min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`
              }
            ]
          },
          // scalable from max breakpoint up to ∞
          {
            media: `(min-width: ${maxViewportW + 1}px)`,
            wrappers: [
              {
                code: `${tab(2)}--${prefix}root-font-size: var(--${prefix}font-size-base-percentage);`
              },
              {
                name: 'html.presentation-mode',
                code: `${tab(2)}--${prefix}root-font-size: calc((${baseFontSize} * 100vw) / ${maxViewportW});`
              }
            ]
          }
        ];

        variants.forEach(({ media, wrappers }, index) => {
          output.push(`@media all and ${media} {`);
          wrappers.forEach(({ name, code }, index) => {
            output.push(
              wrapper({ name, code, indent: tab() }) + (index < wrappers.length - 1 ? '\n' : '')
            );
          });
          output.push(`}${index < variants.length - 1 ? '\n' : ''}`);
        });
      }
    })
  );
};

// This function outputs the font faces (if such).
// It is used to output the font faces in a separate file
// as well as in the all tokens file.
export const outputFontFaces = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: OutputConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: 'Font Faces',
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        // conditions:
        // • only woff2 files, one per font weight is expected
        // • every italic file for a given weight is expected to be named like the regular file with 'Italic' suffix

        const fontFaces: FontFace[] = getFontFaces(formatArgs);

        fontFaces.forEach((fontFace, index) => {
          output.push(
            wrapper({
              name: `@font-face`,
              code: Object.entries(fontFace)
                .map(([key, value]) => `${tab()}${key}: ${value};`)
                .join('\n')
            }) + (index < fontFaces.length - 1 ? '\n' : '')
          );
        });
      }
    })
  );
};

// This function wraps a code block in a given CSS selector.
export const wrapper = ({ name = ':root', code, indent = '' }: WrapperParams): string =>
  `${indent}${name} {\n${code}\n${indent}}`;

// This function defines the list of custom properties.
export const definer = ({ tokens, indent = '  ' }: DefinerParams): string =>
  tokens.map(({ name, $value }) => `${indent}--${name}: ${$value};`).join('\n');

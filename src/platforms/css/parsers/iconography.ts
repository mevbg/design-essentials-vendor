import type { FormatFnArguments } from 'style-dictionary/types';
import {
  CssCustomPlatformFileType,
  CustomFormatterCategory,
  OutputConfig
} from '../../../types/index.js';
import { getFileOutput, tab } from '../../../utils/formats.utils.js';
import { toCamelCase, toSpaceCase } from '../../../utils/strings.utils.js';

// This function outputs the iconography definitions
export const outputIconography = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: OutputConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: toSpaceCase(toCamelCase(CssCustomPlatformFileType.ICONOGRAPHY)),
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        const { iconography } = formatArgs.options.designConfig;
        const attr = 'data-i';

        output.push(
          wrapper({
            name: `[${attr}]`,
            code: Object.entries({
              display: 'inline-block',
              width: '1em',
              height: '1em',
              color: iconography.color,
              'font-family': iconography.fontFamily,
              'font-weight': 'normal',
              'font-style': 'normal',
              'line-height': '1'
            })
              .map(([key, value]) => `${tab()}${key}: ${value};`)
              .join('\n')
          }) + '\n',
          wrapper({
            name: `[${attr}]::after`,
            code: Object.entries({
              display: 'inline-block',
              width: '100%',
              height: '100%',
              'font-size': '1.25em',
              'line-height': '0.6em'
            })
              .map(([key, value]) => `${tab()}${key}: ${value};`)
              .join('\n')
          }) + '\n'
        );

        Object.entries(iconography.list).forEach(([name, code], index) => {
          output.push(
            wrapper({
              name: `[${attr}="${name}"]::after`,
              code: `${tab()}content: "\\${code}";`
            }) + (index < Object.entries(iconography.list).length - 1 ? '\n' : '')
          );
        });
      }
    })
  );
};

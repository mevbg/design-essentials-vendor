/* =================================================== */
/* ICONS → PARSER */
/* =================================================== */

import { IconsConfig, ServiceParams } from '../../types/index.js';
import { cssSelectorBlock, tab } from '../../utils/formats.utils.js';

// This function outputs the icons definitions
export const outputIcons = (output: string[], params: ServiceParams<IconsConfig>) => {
  const { fontFamily, color, list } = params;
  const attr = 'data-i';

  output.push(
    cssSelectorBlock({
      name: `[${attr}]`,
      code: Object.entries({
        display: 'inline-block',
        width: '1em',
        height: '1em',
        color,
        'font-family': fontFamily,
        'font-weight': 'normal',
        'font-style': 'normal',
        'line-height': '1'
      })
        .map(([key, value]) => `${tab()}${key}: ${value};`)
        .join('\n')
    }) + '\n',
    cssSelectorBlock({
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

  Object.entries(list).forEach(([name, code]) => {
    output.push(
      cssSelectorBlock({
        name: `[${attr}="${name}"]::after`,
        code: `${tab()}content: "\\${code}";`
      }) + '\n'
    );
  });

  return `${output.join('\n')}\n`;
};

/* =================================================== */
/* FONT FACES → CONFIG PARSER */
/* =================================================== */

import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { FontFacesConfig } from '../../../types/index.js';
import { fontFacesGenerator } from '../../font-faces/font-faces.generator.js';

export const fontFacesConfigParser: GeneratorConfigParserFn<FontFacesConfig> = (
  userConfig: FontFacesConfig,
  { buildPath }: GeneratorCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath
        },
        generator: fontFacesGenerator
      }
    : undefined;

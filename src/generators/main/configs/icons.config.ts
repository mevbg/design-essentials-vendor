/* =================================================== */
/* ICONS → CONFIG PARSER */
/* =================================================== */

import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { IconsConfig } from '../../../types/index.js';
import { iconsGenerator } from '../../icons/icons.generator.js';

export const iconsConfigParser: GeneratorConfigParserFn<IconsConfig> = (
  userConfig: IconsConfig,
  { buildPath }: GeneratorCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath
        },
        generator: iconsGenerator
      }
    : undefined;

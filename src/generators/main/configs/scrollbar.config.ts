/* =================================================== */
/* SCROLLBAR → CONFIG PARSER */
/* =================================================== */

import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { ScrollbarConfig } from '../../../types/index.js';
import { scrollbarGenerator } from '../../scrollbar/scrollbar.generator.js';

export const scrollbarConfigParser: GeneratorConfigParserFn<ScrollbarConfig> = (
  userConfig: ScrollbarConfig,
  { buildPath }: GeneratorCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath
        },
        generator: scrollbarGenerator
      }
    : undefined;

/* =================================================== */
/* SCROLLBAR → CONFIG PARSER */
/* =================================================== */

import { DEFAULT_SCROLLBAR_CONFIG } from '../../../defaults.js';
import { ScrollbarConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { scrollbarGenerator } from '../../scrollbar/scrollbar.generator.js';

export const scrollbarConfigParser: ServiceConfigParserFn<ScrollbarConfig> = (
  userConfig: ScrollbarConfig,
  { buildPath }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...DEFAULT_SCROLLBAR_CONFIG,
          ...userConfig,
          buildPath
        },
        generator: scrollbarGenerator
      }
    : undefined;

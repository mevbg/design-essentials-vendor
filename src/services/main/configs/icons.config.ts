/* =================================================== */
/* ICONS → CONFIG PARSER */
/* =================================================== */

import { DEFAULT_ICONS_CONFIG } from '../../../defaults.js';
import { IconsConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { iconsGenerator } from '../../icons/icons.generator.js';

export const iconsConfigParser: ServiceConfigParserFn<IconsConfig> = (
  userConfig: IconsConfig,
  { buildPath }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...DEFAULT_ICONS_CONFIG,
          ...userConfig,
          buildPath
        },
        generator: iconsGenerator
      }
    : undefined;
